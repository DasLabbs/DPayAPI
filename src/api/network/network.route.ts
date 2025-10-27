import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import networkController from "./network.controller";
import {
    createNetworkSchema,
    getNetworksSchema,
    paramNetworkIdSchema,
    updateNetworkSchema,
} from "./network.schema";

const networkRoute = express.Router();

networkRoute.get(
    "/",
    validator({ query: getNetworksSchema }),
    asyncWrapper(networkController.getNetworks),
);
networkRoute.get(
    "/:id",
    validator({ params: paramNetworkIdSchema }),
    asyncWrapper(networkController.getNetwork),
);
networkRoute.post(
    "/",
    validator({ body: createNetworkSchema }),
    asyncWrapper(networkController.createNetwork),
);
networkRoute.put(
    "/:id",
    validator({ body: updateNetworkSchema, params: paramNetworkIdSchema }),
    asyncWrapper(networkController.updateNetwork),
);
networkRoute.delete(
    "/:id",
    validator({ params: paramNetworkIdSchema }),
    asyncWrapper(networkController.softDeleteNetwork),
);

export default networkRoute;
