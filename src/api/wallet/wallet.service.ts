import { PrivateKeyPart, Wallet } from "@domain/entity";
import { verifyPassword } from "@shared/helper/encrypt";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";

import privateKeyPartsService from "./privateKeyParts/privateKeyParts.service";
import { CreateWalletDto, ExportWalletDto, GetWalletsDto } from "./wallet.dto";
import walletManager from "./walletManager";

export class WalletService extends BaseService {
    private generateWallet(context: RequestContext, dto: CreateWalletDto) {
        const { address, privateKey } = walletManager.createWallet(
            context,
            dto.chainId,
        );
        return { address, privateKey };
    }

    private importWallet(context: RequestContext, dto: CreateWalletDto) {
        const { privateKey } = dto;
        const address = walletManager.getAddress(
            context,
            dto.chainId,
            privateKey!,
        );
        return { address, privateKey: privateKey! };
    }

    async createWallet(context: RequestContext, dto: CreateWalletDto) {
        const { userId, chainId } = dto;

        const type = dto.privateKey ? "imported" : "generated";
        const { address, privateKey } =
            type === "imported"
                ? this.importWallet(context, dto)
                : this.generateWallet(context, dto);

        const network = await this.repos.network.findOne(context, {
            chainId,
        });
        if (!network) throw new BadRequestError("Network not found");

        const privateKeyParts =
            await privateKeyPartsService.generatePrivateKeyParts(context, {
                privateKey,
                userId,
            });

        const wallet = (await this.repos.wallet.create(context, {
            userId,
            address,
            type,
            privateKeyPart: privateKeyParts.map((part) => part._id),
            network: network._id,
        })) as Wallet;

        await this.repos.user.update(context, userId.toString(), {
            $push: { wallets: wallet._id },
        });

        return wallet;
    }

    async exportWallet(context: RequestContext, dto: ExportWalletDto) {
        const { walletId, userId, password } = dto;
        const user = await this.repos.user.model
            .findOne({
                _id: userId,
            })
            .populate({
                path: "wallets",
                populate: {
                    path: "privateKeyPart",
                    model: "PrivateKeyPart",
                },
            })
            .lean()
            .catch((error) => this.handleError(context, error));

        if (!user) throw new BadRequestError("User not found");
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) throw new BadRequestError("Invalid password");

        const wallet = (user.wallets as Wallet[]).find(
            (wallet) => wallet._id.toString() === walletId.toString(),
        );
        if (!wallet) throw new BadRequestError("Wallet not found");

        const privateKey = await privateKeyPartsService.combinePrivateKeyParts({
            parts: (wallet.privateKeyPart as PrivateKeyPart[]).map(
                (part) => part.privateKey,
            ),
        });

        return {
            privateKey,
        };
    }

    async getWallets(context: RequestContext, dto: GetWalletsDto) {
        const { userId } = dto;
        const wallets = await this.repos.wallet.find(context, {
            userId,
        });
        return wallets.map((wallet) => ({
            id: wallet._id.toHexString(),
            address: wallet.address,
            type: wallet.type,
        }));
    }
}

const walletService = new WalletService();
export default walletService;
