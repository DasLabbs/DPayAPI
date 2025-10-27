import config from "@config/index";
import { NodeEnv } from "@shared/constant";
import * as lodash from "lodash";
import { v4 as uuidV4 } from "uuid";
import { NextFunction, Request, Response } from "express";

export const requestTracker = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    req.headers["x-request-id"] = req.headers["x-request-id"] ?? uuidV4();
    const loggerFields = ["body", "params", "query"];
    if (config.nodeEnv === NodeEnv.DEV) {
        for (const field of loggerFields) {
            const reqField = lodash.get(req, field);
            if (reqField && Object.keys(reqField).length > 0) {
                console.debug({ field, value: reqField });
            }
        }
    }
    next();
};
