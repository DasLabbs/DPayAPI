import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import productController from "./product.controller";
import {
    createProductSchema,
    getProductsSchema,
    paramProductIdSchema,
    updateProductSchema,
} from "./product.schema";

export const productRoute = express.Router();

productRoute.get(
    "/",
    validator({ query: getProductsSchema }),
    asyncWrapper(productController.getProducts),
);

productRoute.get(
    "/:id",
    validator({ params: paramProductIdSchema }),
    asyncWrapper(productController.getProduct),
);

productRoute.post(
    "/",
    validator({ body: createProductSchema }),
    asyncWrapper(productController.createProduct),
);

productRoute.put(
    "/:id",
    validator({ params: paramProductIdSchema, body: updateProductSchema }),
    asyncWrapper(productController.updateProduct),
);

productRoute.patch(
    "/:id/activate",
    validator({ params: paramProductIdSchema }),
    asyncWrapper(productController.activateProduct),
);

productRoute.patch(
    "/:id/deactivate",
    validator({ params: paramProductIdSchema }),
    asyncWrapper(productController.deactivateProduct),
);

productRoute.delete(
    "/:id",
    validator({ params: paramProductIdSchema }),
    asyncWrapper(productController.softDeleteProduct),
);

export default productRoute;
