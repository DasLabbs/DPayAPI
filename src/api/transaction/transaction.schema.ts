import { limit, orderBy, page, positiveNumber, sort } from "@shared/schema";
import Joi from "joi";

export const submitTransactionSchema = Joi.object({
    chainId: positiveNumber.required(),
    txHash: Joi.string().required(),
    qrPayload: Joi.string().required(),
});

export const getTransactionsSchema = Joi.object({
    page,
    limit,
    sort,
    orderBy,
});
