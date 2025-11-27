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

        if (user)
            return {
                userId: user._id.toString(),
                privyUserId: user.privyUserId,
                username: user.username,
                ...privyUser,
            };

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

    async pointLeaderboard(context: RequestContext) {
        const users = await this.repos.user.find(context, {});
        const sortedUsers = users
            .sort((a, b) => b.point - a.point)
            .map((user, i) => {
                return {
                    ...user,
                    rank: i + 1,
                };
            });

        const currentUser = sortedUsers.find(
            (user) => user.privyUserId === context.privyUser?.id,
        );

        return {
            leaderboard: sortedUsers.slice(0, 10),
            currentUser,
        };
    }
}

const userService = new UserService();
export default userService;
