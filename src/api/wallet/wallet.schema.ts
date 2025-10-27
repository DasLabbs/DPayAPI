import { objectId, positiveNumber } from "@shared/schema";
import Joi from "joi";

export const CreateWalletSchema = Joi.object({
    chainId: positiveNumber.required(),
    privateKey: Joi.string().optional(),
});

export const ExportWalletSchema = Joi.object({
    password: Joi.string().required(),
});

export const ParamsWalletIdSchema = Joi.object({
    id: objectId.required(),
});
