import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import orderController from "./order.controller";
import {
    createOrderSchema,
    getOrdersSchema,
    paramsOrderIdSchema,
} from "./order.schema";

export const orderRoutes = Router();

orderRoutes.get(
    "/",
    validator({ query: getOrdersSchema }),
    asyncWrapper(orderController.getOrders),
);
orderRoutes.get(
    "/:id",
    validator({ params: paramsOrderIdSchema }),
    asyncWrapper(orderController.getOrder),
);
orderRoutes.post(
    "/",
    validator({ body: createOrderSchema }),
    asyncWrapper(orderController.createOrder),
);

export default orderRoutes;
