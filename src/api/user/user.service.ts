import { User } from "@domain/entity";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";

export class UserService extends BaseService {
    async signIn(context: RequestContext) {
        const privyUser = context.privyUser;
        const user = await this.repos.user.findOne(context, {
            privyUserId: privyUser?.id,
        });
        if (!user) {
            const role = await this.repos.role.findOne(context, {
                name: "user",
            });
            if (!role) throw new BadRequestError("Role not found");

            const newUser: User = (await this.repos.user.create(context, {
                privyUserId: privyUser!.id,
                username: "Main Account",
                roleId: role._id,
            })) as User;

            return {
                userId: newUser._id.toString(),
                privyUserId: newUser.privyUserId,
                username: newUser.username,
                ...privyUser,
            };
        }

        return {
            userId: user._id.toString(),
            privyUserId: user.privyUserId,
            username: user.username,
            ...privyUser,
        };
    }
}

const userService = new UserService();
export default userService;
