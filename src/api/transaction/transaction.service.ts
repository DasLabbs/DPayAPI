import networkService from "@api/network/network.service";
import qrService from "@api/qr/qr.service";
import { Network, Transaction, TransactionStatus } from "@domain/entity";
import { FUND_TRANSFERRED_TOPIC, TRANSFER_EVENT_ABI } from "@shared/constant";
import { decodeEvent } from "@shared/helper/eventParser";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";
import { ethers, TransactionReceipt } from "ethers";

import { CreateTransactionDto, GetTransactionsDto } from "./transaction.dto";

export class TransactionService extends BaseService {
    private parseTransactionEvent(txReceipt: TransactionReceipt) {
        const { logs } = txReceipt;
        const transferLog = logs.filter((log) =>
            log.topics.includes(FUND_TRANSFERRED_TOPIC),
        );
        if (transferLog.length === 0)
            throw new BadRequestError("Transfer log not found");

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
        const provider = await networkService.getProvider(context, network);
        let retryTime = 0;

        while (retryTime < 10) {
            try {
                const txReceipt = await provider.waitForTransaction(
                    txHash,
                    1,
                    300000,
                );

                if (!txReceipt) {
                    retryTime++;
                    continue;
                }

                const transferEvent = this.parseTransactionEvent(txReceipt);
                const txStatus: TransactionStatus =
                    txReceipt.status === 1 ? "confirmed" : "failed";

                return {
                    hash: txReceipt.hash,
                    from: txReceipt.from,
                    to: txReceipt.to!,
                    token: transferEvent.token,
                    amount: transferEvent.value,
                    status: txStatus,
                    network: network._id,
                    gasUsed: Number(txReceipt.gasUsed),
                    gasPrice: Number(txReceipt.gasPrice),
                    totalFee: Number(txReceipt.fee),
                };
            } catch (error) {
                console.log("Error while getting transaction receipt:", error);
                retryTime++;
            }
        }

        throw new BadRequestError("Transaction failed or dropped");
    }

    async submitTransaction(
        context: RequestContext,
        dto: CreateTransactionDto,
    ) {
        const { chainId, txHash } = dto;
        const user = context.jwtPayload;
        const network = await this.repos.network.findOne(context, { chainId });
        if (!network) throw new BadRequestError("Network not found");

        const tx = (await this.repos.transaction.create(context, {
            hash: txHash,
            network: network._id,
            status: "pending",
            userId: user?.userId,
        })) as Transaction;

        const transaction = await this.getConfirmedTransaction(
            context,
            txHash,
            network,
        );

        const currency = await this.repos.currency.findOne(context, {
            address: transaction.token,
        });

        if (!currency) throw new BadRequestError("Currency not found");
        const parsedQr = await qrService.parseQRPayload(dto.qrPayload);
        const formattedAmount = ethers.formatUnits(
            transaction.amount,
            currency.decimals,
        );

        // USDT, USDC include USD in the symbol - only support USD first
        if (
            !currency.symbol
                .toUpperCase()
                .includes(parsedQr.currency.toUpperCase())
        )
            throw new BadRequestError("Currency mismatch");

        if (formattedAmount !== parsedQr.amount)
            throw new BadRequestError("Amount mismatch");

        return this.repos.transaction.update(
            context,
            tx._id.toString(),
            transaction,
        );
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
