import { User, UserModel } from "@domain/entity/user.model";
import { RequestContext } from "@shared/lib/context";
import { FilterQuery } from "mongoose";

import { BaseRepo } from "./base.repo";

export class UserRepo extends BaseRepo<User> {
    constructor() {
        super(UserModel);
    }

    async findOne(
        context: RequestContext,
        query: FilterQuery<User>,
    ): Promise<User | null> {
        const user = await this.model
            .findOne(query)
            .populate("roleId")
            .populate("wallets")
            .catch((error) => this.handleError(context, error, null));
        return user as User | null;
    }
}

const userRepo = new UserRepo();

export default userRepo;
