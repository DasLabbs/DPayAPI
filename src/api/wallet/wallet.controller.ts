import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { extractContext } from "@shared/lib/context";
import { JwtPayload } from "@shared/lib/jwt";
import { toObjectId } from "@shared/utils/string";
import { Request } from "express";

import { CreateWalletDto } from "./wallet.dto";
import walletService from "./wallet.service";

export class WalletController {
    @CreatedResponse()
    async createWallet(req: Request) {
        const context = extractContext(req);
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        const dto = extractRequest<CreateWalletDto>(req, "body");
        return walletService.createWallet(context, {
            ...dto,
            userId: toObjectId(jwtPayload.userId),
        });
    }

    @OkResponse()
    async getWallets(req: Request) {
        const context = extractContext(req);
        const jwtPayload = extractRequest<JwtPayload>(req, "user");
        return walletService.getWallets(context, {
            userId: toObjectId(jwtPayload.userId),
        });
    }
}

const walletController = new WalletController();
export default walletController;
