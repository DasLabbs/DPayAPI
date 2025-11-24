import { UserModel } from "@domain/entity";
import { User } from "@privy-io/node";
import { UnauthorizedError } from "@shared/lib/http/httpError";
import lodash from "lodash";
import { NextFunction, Request, Response } from "express";

export const auth = async (req: Request, _: Response, next: NextFunction) => {
    const userPrivy = lodash.get(req, "privyUser") as unknown as User;
    if (!userPrivy) return next(new UnauthorizedError());
    const user = await UserModel.findOne({
        privyUserId: userPrivy.id,
    });

    if (!user) {
        return next(new UnauthorizedError());
    }

    lodash.set(req, "user", {
        userId: user._id,
        privyUserId: user.privyUserId,
        roleId: user.roleId,
    });
    next();
};
