import { OkResponse } from "@shared/decorators/response";
import { extractContext } from "@shared/lib/context";
import { Request } from "express";

import userService from "./user.service";

export class UserController {
    @OkResponse()
    async signIn(req: Request) {
        const context = extractContext(req);
        return userService.signIn(context);
    }
}

const userController = new UserController();
export default userController;
