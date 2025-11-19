import { positiveNumber } from "@shared/schema";
import Joi from "joi";

export const generateQRSchema = Joi.object({
    amount: positiveNumber.required(),
    currency: Joi.string().required(),
});
