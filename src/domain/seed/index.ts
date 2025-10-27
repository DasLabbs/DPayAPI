import permissionRepo from "@domain/repo/permission.repo";
import { delay } from "@shared/utils/delay";

import { createCurrencies } from "./currency";
import { createNetworks } from "./network";
import { createPermissions } from "./permission";
import { createProducts } from "./product";
import { createRoles } from "./role";

export const seed = async () => {
    const context = {};

    await delay(3000);
    const isFirstRun = (await permissionRepo.findOne(context)) === null;
    if (!isFirstRun) return;

    await createPermissions(context);
    await createRoles(context);
    await createNetworks(context);
    await createCurrencies(context);
    await createProducts(context);
};

seed();
