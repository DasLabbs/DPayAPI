import {
    address,
    limit,
    objectId,
    page,
    positiveNumber,
    sort,
} from "@shared/schema";
import Joi from "joi";

export const createCurrencySchema = Joi.object({
    address: address.required(),
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    decimals: positiveNumber.required(),
    networkId: objectId.required(),
});

export const updateCurrencySchema = Joi.object({
    address: address.optional(),
    name: Joi.string().optional(),
    symbol: Joi.string().optional(),
    decimals: positiveNumber.optional(),
    networkId: objectId.optional(),
});

export const getCurrenciesSchema = Joi.object({
    page,
    limit,
    sort,
    orderBy: Joi.string().default("createdAt"),
});

export const paramCurrencyIdSchema = Joi.object({
    id: objectId.required(),
});

export const paramCurrencyAddressSchema = Joi.object({
    address: address.required(),
});
