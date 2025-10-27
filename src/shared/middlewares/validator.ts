import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";

import { BadRequestError } from "../lib/http/httpError";

interface IValidateSchema {
    body?: Schema;
    query?: Schema;
    params?: Schema;
}

export const validator = (params?: IValidateSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        req.body = validate(req.body, next, params?.body);
        req.query = validate(req.query, next, params?.query);
        req.params = validate(req.params, next, params?.params);
        next();
    };
};

const validate = (req: unknown, next: NextFunction, schema?: Schema) => {
    if (schema) {
        const { error, value } = schema.validate(req, {
            abortEarly: false,
            convert: true,
        });
        if (error) next(new BadRequestError(error.message));
        return value;
    }
    return req;
};
