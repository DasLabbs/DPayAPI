import { validator } from "@shared/middlewares/validator";
import { verifyToken } from "@shared/middlewares/verifyToken";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import walletController from "./wallet.controller";
import {
    CreateWalletSchema,
    ExportWalletSchema,
    ParamsWalletIdSchema,
} from "./wallet.schema";

export const walletRoutes = Router();

walletRoutes.post(
    "/",
    validator({ body: CreateWalletSchema }),
    verifyToken("access"),
    asyncWrapper(walletController.createWallet),
);

walletRoutes.post(
    "/export/:id",
    validator({ body: ExportWalletSchema, params: ParamsWalletIdSchema }),
    verifyToken("access"),
    asyncWrapper(walletController.exportWallet),
);

walletRoutes.get(
    "/",
    verifyToken("access"),
    asyncWrapper(walletController.getWallets),
);

export default walletRoutes;
