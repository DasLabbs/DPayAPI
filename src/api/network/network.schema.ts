import { limit, objectId, page, sort } from "@shared/schema";
import Joi from "joi";

export const createNetworkSchema = Joi.object({
    name: Joi.string().required(),
    chainId: Joi.number().required(),
    rpcUrls: Joi.array().items(Joi.string()).required(),
    explorerUrl: Joi.string().required(),
    isTestnet: Joi.boolean().required(),
    isEvmCompatible: Joi.boolean().required(),
});

export const updateNetworkSchema = Joi.object({
    name: Joi.string().optional(),
    chainId: Joi.number().optional(),
    rpcUrls: Joi.array().items(Joi.string()).optional(),
    explorerUrl: Joi.string().optional(),
    isTestnet: Joi.boolean().optional(),
    isEvmCompatible: Joi.boolean().optional(),
});

export const getNetworksSchema = Joi.object({
    page,
    limit,
    sort,
    orderBy: Joi.string().default("createdAt"),
});

export const paramNetworkIdSchema = Joi.object({
    id: objectId.required(),
});
