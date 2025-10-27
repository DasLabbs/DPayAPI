import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { extractContext } from "@shared/lib/context";
import { Request } from "express";

import { UserSignInDto, UserSignUpDto } from "./user.dto";
import userService from "./user.service";

export class UserController {
    @CreatedResponse()
    async signUp(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<UserSignUpDto>(req, "body");
        return await userService.signUp(context, dto);
    }

    @OkResponse()
    async signIn(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<UserSignInDto>(req, "body");
        return await userService.signIn(context, dto);
    }
}

const userController = new UserController();
export default userController;
