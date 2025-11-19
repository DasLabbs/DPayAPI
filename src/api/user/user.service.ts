import { User } from "@domain/entity";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";

import { UserSignInDto, UserSignUpDto } from "./user.dto";

export class UserService extends BaseService {
    async signUp(context: RequestContext, dto: UserSignUpDto) {
        const { address } = dto;
        const exists = await this.repos.user.findOne(context, { address });
        if (exists) throw new BadRequestError("Account already exists");
        const role = await this.repos.role.findOne(context, {
            name: "user",
        });
        if (!role) throw new BadRequestError("Role not found");

        const user: User = (await this.repos.user.create(context, {
            address,
            roleId: role._id,
        })) as User;

        return {
            userId: user._id.toString(),
        };
    }

    async signIn(context: RequestContext, dto: UserSignInDto) {
        const { address } = dto;

        const user = await this.repos.user.findOne(context, { address });
        if (!user) throw new BadRequestError("User not found");

        return {
            userId: user._id.toString(),
        };
    }
}

const userService = new UserService();
export default userService;
