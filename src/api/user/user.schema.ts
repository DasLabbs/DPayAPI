import Joi from "joi";

export const userSignUpSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    isInitWallet: Joi.boolean().default(false),
});

export const userSignInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
