import { UserModel } from "@domain/entity";
import { LinkedAccountEmbeddedWallet } from "@privy-io/node";
import { UnauthorizedError } from "@shared/lib/http/httpError";
import lodash from "lodash";
import { NextFunction, Request, Response } from "express";

export const auth = async (req: Request, _: Response, next: NextFunction) => {
    const userPrivy = lodash.get(req, "privyUser") as
        | { linked_accounts: LinkedAccountEmbeddedWallet[] }
        | undefined;

    if (!userPrivy) return next(new UnauthorizedError());
    const user = await UserModel.findOne({
        address: userPrivy.linked_accounts[0].address,
    });

    if (!user) {
        return next(new UnauthorizedError());
    }

    lodash.set(req, "user", {
        userId: user._id,
        address: user.address,
        roleId: user.roleId,
    });
    next();
};
