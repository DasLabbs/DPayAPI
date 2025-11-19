import { auth } from "@shared/middlewares/auth";
import { privyAuth } from "@shared/middlewares/privyAuth";
import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import transactionController from "./transaction.controller";
import {
    getTransactionsSchema,
    submitTransactionSchema,
} from "./transaction.schema";

const transactionRouter = Router();
transactionRouter.post(
    "/submit",
    privyAuth,
    auth,
    validator({ body: submitTransactionSchema }),
    asyncWrapper(transactionController.submitTransaction),
);

transactionRouter.get(
    "/",
    privyAuth,
    auth,
    validator({ query: getTransactionsSchema }),
    asyncWrapper(transactionController.getTransactions),
);

export default transactionRouter;
