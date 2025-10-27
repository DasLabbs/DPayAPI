import { Permission, PermissionModel } from "@domain/entity/permission.model";

import { BaseRepo } from "./base.repo";

export class PermissionRepo extends BaseRepo<Permission> {
    constructor() {
        super(PermissionModel);
    }
}

const permissionRepo = new PermissionRepo();
export default permissionRepo;
