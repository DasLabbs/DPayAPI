import { Role, RoleModel } from "@domain/entity/role.model";
import { RequestContext } from "@shared/lib/context";
import { FilterQuery } from "mongoose";

import { BaseRepo } from "./base.repo";

export class RoleRepo extends BaseRepo<Role> {
    constructor() {
        super(RoleModel);
    }

    async findOne(
        context: RequestContext,
        query: FilterQuery<Role> = {},
    ): Promise<Role | null> {
        const role = await this.model
            .findOne(query)
            .populate("permissions")
            .lean()
            .catch((error) => this.handleError(context, error, null));
        return role as Role | null;
    }
}

const roleRepo = new RoleRepo();
export default roleRepo;
