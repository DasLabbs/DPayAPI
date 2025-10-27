import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import currencyController from "./currency.controller";
import {
    createCurrencySchema,
    getCurrenciesSchema,
    paramCurrencyIdSchema,
    updateCurrencySchema,
} from "./currency.schema";

export const currencyRoute = express.Router();

currencyRoute.get(
    "/",
    validator({ query: getCurrenciesSchema }),
    asyncWrapper(currencyController.getCurrencies),
);

currencyRoute.get(
    "/:id",
    validator({ params: paramCurrencyIdSchema }),
    asyncWrapper(currencyController.getCurrency),
);

currencyRoute.post(
    "/",
    validator({ body: createCurrencySchema }),
    asyncWrapper(currencyController.createCurrency),
);

currencyRoute.put(
    "/:id",
    validator({ body: updateCurrencySchema, params: paramCurrencyIdSchema }),
    asyncWrapper(currencyController.updateCurrency),
);

currencyRoute.delete(
    "/:id",
    validator({ params: paramCurrencyIdSchema }),
    asyncWrapper(currencyController.softDeleteCurrency),
);

export default currencyRoute;
