import networkService from "@api/network/network.service";
import qrService from "@api/qr/qr.service";
import sseService from "@api/sse/sse.service";
import { Network, Transaction, TransactionStatus } from "@domain/entity";
import { FUND_TRANSFERRED_TOPIC, TRANSFER_EVENT_ABI } from "@shared/constant";
import { decodeEvent } from "@shared/helper/eventParser";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";
import { delay } from "@shared/utils/delay";
import { ethers, TransactionReceipt } from "ethers";

import { CreateTransactionDto, GetTransactionsDto } from "./transaction.dto";
import transactionStripe from "./transaction.stripe";
import { OnchainTransaction } from "./transaction.type";

export class TransactionService extends BaseService {
    private parseTransactionEvent(txReceipt: TransactionReceipt) {
        const { logs } = txReceipt;
        const transferLog = logs.filter((log) =>
            log.topics.includes(FUND_TRANSFERRED_TOPIC),
        );
        if (transferLog.length === 0) return null;

        const decodedEvent = decodeEvent<{
            token: string;
            from: string;
            value: bigint;
        }>(transferLog[0], TRANSFER_EVENT_ABI);

        return decodedEvent;
    }

    private async getConfirmedTransaction(
        context: RequestContext,
        txHash: string,
        network: Network,
    ) {
        const provider = networkService.getProvider(context, network);
        for (let retry = 0; retry < 10; retry++) {
            const txReceipt = await provider.waitForTransaction(
                txHash,
                1,
                300000,
            );

            if (!txReceipt) {
                await delay(2000);
                continue;
            }
            const transferEvent = this.parseTransactionEvent(txReceipt);
            if (!transferEvent) {
                await delay(2000);
                continue;
            }

            return {
                hash: txReceipt.hash,
                from: txReceipt.from,
                to: txReceipt.to!,
                token: transferEvent.token,
                amount: transferEvent.value,
                status: (txReceipt.status === 1
                    ? "confirmed"
                    : "failed") as TransactionStatus,
                network: network._id,
                gasUsed: Number(txReceipt.gasUsed),
                gasPrice: Number(txReceipt.gasPrice),
                totalFee: Number(txReceipt.fee),
            };
        }

        return null;
    }

    private async handleOnchainTransaction(
        context: RequestContext,
        dto: CreateTransactionDto,
    ) {
        const { chainId, txHash } = dto;
        const user = context.jwtPayload;
        const network = await this.repos.network.findOne(context, { chainId });
        if (!network) throw new BadRequestError("Network not found");

        const transaction = (await this.repos.transaction.create(context, {
            hash: txHash,
            network: network._id,
            status: "pending",
            userId: user?.userId,
        })) as Transaction;

        const confirmedTransaction = await this.getConfirmedTransaction(
            context,
            txHash,
            network,
        );
        if (!confirmedTransaction)
            throw new BadRequestError("Transaction not found");

        return {
            transactionId: transaction._id.toString(),
            onchainTransaction: confirmedTransaction,
        };
    }

    private async verifyTransaction(
        context: RequestContext,
        qrPayload: string,
        transactionId: string,
        onchainTransaction: OnchainTransaction,
    ) {
        const currency = await this.repos.currency.findOne(context, {
            address: onchainTransaction.token,
        });
        if (!currency) throw new BadRequestError("Currency not supported");

        const parsedQr = await qrService.parseQRPayload(qrPayload);
        const formattedAmount = Number.parseFloat(
            ethers.formatUnits(onchainTransaction.amount, currency.decimals),
        );

        // USDT, USDC include USD in the symbol - only support USD first
        if (
            !currency.symbol
                .toUpperCase()
                .includes(parsedQr.currency.toUpperCase())
        )
            throw new BadRequestError("Currency mismatch");

        if (formattedAmount !== Number.parseFloat(parsedQr.amount))
            throw new BadRequestError("Amount mismatch");

        const transaction = await this.repos.transaction.update(
            context,
            transactionId,
            {
                ...onchainTransaction,
                formattedAmount,
            },
        );
        if (!transaction)
            throw new BadRequestError("Transaction verification failed");

        return {
            ...transaction,
            currency: parsedQr.currency,
            formattedAmount,
        };
    }

    async submitTransaction(
        context: RequestContext,
        dto: CreateTransactionDto,
    ) {
        const { transactionId, onchainTransaction } =
            await this.handleOnchainTransaction(context, dto);

        sseService.emitEvent(context.privyUser!.id, {
            type: "transaction-receipt",
            data: {
                hash: onchainTransaction.hash,
                status: onchainTransaction.status,
            },
        });

        const transaction = await this.verifyTransaction(
            context,
            dto.qrPayload,
            transactionId,
            onchainTransaction,
        );

        const stripePayment = await transactionStripe.handlePayment({
            amount: transaction.formattedAmount,
            currency: transaction.currency.toLowerCase(),
        });
        sseService.emitEvent(context.privyUser!.id, {
            type: "stripe-payment",
            data: {
                paymentIntent: stripePayment.id,
                hash: transaction.hash,
                status: stripePayment.status,
            },
        });

        return {
            transactionId,
            stripePayment: stripePayment.id,
        };
    }

    async getTransactions(context: RequestContext, dto: GetTransactionsDto) {
        const transactions = await this.repos.transaction.paginate(
            context,
            { userId: dto.userId },
            dto,
        );

        return transactions;
    }
}

const transactionService = new TransactionService();
export default transactionService;
