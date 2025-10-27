import { UnauthorizedError } from "@shared/lib/http/httpError";
import jwt from "@shared/lib/jwt";
import * as lodash from "lodash";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
    type: "access" | "refresh" | "access-optional" | "refresh-optional",
) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const [tokenType, isOptional] = type.split("-");
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            if (isOptional) {
                lodash.set(req, "user", null);
                return next();
            }
            return next(new UnauthorizedError("Unauthorized"));
        }

        const jwtPayload = jwt.verifyToken(
            token,
            tokenType as "access" | "refresh",
        );
        if (!jwtPayload) {
            if (isOptional) {
                lodash.set(req, "user", null);
                return next();
            }
            next(new UnauthorizedError("Unauthorized"));
        }

        lodash.set(req, "user", jwtPayload);
        next();
    };
};
