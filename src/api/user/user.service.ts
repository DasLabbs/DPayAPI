import { Role, User } from "@domain/entity";
import { hashPassword, verifyPassword } from "@shared/helper/encrypt";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";
import jwt from "@shared/lib/jwt";

import { UserSignInDto, UserSignUpDto } from "./user.dto";

export class UserService extends BaseService {
    async signUp(
        context: RequestContext,
        dto: UserSignUpDto,
    ): Promise<{
        userId: string;
        tokens: { accessToken: string; refreshToken: string };
    }> {
        const { username, password } = dto;

        const exists = await this.repos.user.findOne(context, { username });
        if (exists) throw new BadRequestError("Username already exists");

        const passwordHash = await hashPassword(password);

        const role = await this.repos.role.findOne(context, {
            name: "user",
        });
        if (!role) throw new BadRequestError("Role not found");

        const user: User = (await this.repos.user.create(context, {
            username,
            password: passwordHash,
            roleId: role._id,
        })) as User;

        return {
            userId: user._id.toString(),
            tokens: jwt.generateTokens({
                userId: user._id.toString(),
                roleId: role._id.toString(),
            }),
        };
    }
    async signIn(context: RequestContext, dto: UserSignInDto) {
        const { username, password } = dto;

        const user = await this.repos.user.findOne(context, { username });
        if (!user) throw new BadRequestError("User not found");

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) throw new BadRequestError("Invalid password");

        return {
            userId: user._id.toString(),
            tokens: jwt.generateTokens({
                userId: user._id.toString(),
                roleId: (user.roleId as Role)._id.toString(),
            }),
        };
    }
}

const userService = new UserService();
export default userService;
