import { Role } from "@domain/entity";
import permissionRepo from "@domain/repo/permission.repo";
import roleRepo from "@domain/repo/role.repo";
import { RequestContext } from "@shared/lib/context";

export const createRoles = async (context: RequestContext) => {
    const roles = ["admin", "user", "operator"];

    const permissions = await permissionRepo.find(context);
    if (!permissions) return null;

    const exists = await roleRepo.findOne(context);
    if (exists) return null;

    const createdRoles = await roleRepo.create(
        context,
        roles.map((role) => ({
            name: role,
            permissions: permissions.map((permission) => permission._id),
        })),
    );

    return createdRoles as Role[];
};
