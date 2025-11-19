import { UnauthorizedError } from "@shared/lib/http/httpError";
import privy from "@shared/lib/privy";
import lodash from "lodash";
import { NextFunction, Request, Response } from "express";

export const privyAuth = async (
    req: Request,
    _: Response,
    next: NextFunction,
) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
        return next(new UnauthorizedError());
    }

    const accessPayload = await privy.verifyAccessToken(accessToken);
    if (!accessPayload) {
        return next(new UnauthorizedError());
    }

    const user = await privy.getUser(accessPayload.user_id);
    lodash.set(req, "privyUser", user);
    next();
};
