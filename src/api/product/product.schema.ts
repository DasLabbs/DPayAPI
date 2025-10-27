import {
    limit,
    objectId,
    orderBy,
    page,
    positiveNumber,
    sort,
} from "@shared/schema";
import Joi from "joi";

export const createProductSchema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: positiveNumber.required(),
});

export const updateProductSchema = Joi.object({
    image: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: positiveNumber.optional(),
});

export const getProductsSchema = Joi.object({
    page,
    limit,
    sort,
    orderBy,
});

export const paramProductIdSchema = Joi.object({
    id: objectId.required(),
});
