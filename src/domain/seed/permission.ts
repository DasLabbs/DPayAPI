import { Permission } from "@domain/entity";
import permissionRepo from "@domain/repo/permission.repo";
import { RequestContext } from "@shared/lib/context";

export const createPermissions = async (
    context: RequestContext,
): Promise<Permission[] | null> => {
    const models = [
        "user",
        "wallet",
        "network",
        "currency",
        "product",
        "order",
        "transaction",
        "kyc",
        "kycLog",
        "privateKeyPart",
    ];
    const actions = [
        "create",
        "getSingle",
        "getList",
        "update",
        "softDelete",
        "hardDelete",
    ];

    const permissions = models.flatMap((model) =>
        actions.map((action) => `${model}:${action}`),
    );

    const exists = await permissionRepo.findOne(context);
    if (exists) return null;

    const createdPermissions = await permissionRepo.create(
        context,
        permissions.map((permission) => ({
            name: permission,
        })),
    );

    return createdPermissions as Permission[];
};
