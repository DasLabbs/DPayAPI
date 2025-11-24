import { ethers } from "ethers";
import Joi from "joi";
import { Types } from "mongoose";

export const page = Joi.number().min(1).default(1);
export const limit = Joi.number().min(1).max(30).default(30);
export const sort = Joi.string().valid("DESC", "ASC").default("DESC");
export const orderBy = Joi.string().default("updatedAt");

export const positiveNumber = Joi.number().greater(0).default(1);
export const negativeNumber = Joi.number().less(0).default(-1);
export const address = Joi.string().custom((value, helpers) => {
    if (ethers.isAddress(value)) {
        return ethers.getAddress(value);
    }
    return helpers.message({
        "custom.message": "Invalid address",
    });
});
export const objectId = Joi.string().custom((value: string, helpers) => {
    if (Types.ObjectId.isValid(value)) {
        return new Types.ObjectId(value);
    }
    return helpers.message({
        "custom.message": "Invalid object id",
    });
});
