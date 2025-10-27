import {
    limit,
    objectId,
    orderBy,
    page,
    positiveNumber,
    sort,
} from "@shared/schema";
import Joi from "joi";

export const paramsOrderIdSchema = Joi.object({
    id: objectId.required(),
});

export const getOrdersSchema = Joi.object({
    page,
    limit,
    sort,
    orderBy,
});

export const createOrderSchema = Joi.object({
    productId: objectId.required(),
    quantity: positiveNumber.required(),
});
