import { User } from "@privy-io/node";
import lodash from "lodash";
import { Request } from "express";

import { JwtPayload } from "../jwt";

export type RequestContext = {
    requestId?: string;
    jwtPayload?: JwtPayload;
    privyUser?: User;
};

export const extractContext = (req: Request): RequestContext => {
    return {
        requestId: req.headers["x-request-id"] as string,
        jwtPayload: lodash.get(req, "user"),
        privyUser: lodash.get(req, "privyUser"),
    };
};
