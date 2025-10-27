import lodash from "lodash";
import { Request } from "express";

import { JwtPayload } from "../jwt";

export type RequestContext = {
    requestId?: string;
    jwtPayload?: JwtPayload;
};

export const extractContext = (req: Request): RequestContext => {
    return {
        requestId: req.headers["x-request-id"] as string,
        jwtPayload: lodash.get(req, "user"),
    };
};
