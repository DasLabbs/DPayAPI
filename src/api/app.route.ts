import express from "express";

import { currencyRoute } from "./currency/currency.route";
import healthCheckRouter from "./healthCheck/healthCheck.route";
import networkRoute from "./network/network.route";
import orderRoutes from "./order/order.route";
import productRoute from "./product/product.route";
import userRoute from "./user/user.route";
import walletRoutes from "./wallet/wallet.route";

const router = express.Router();

router.use("/health_check", healthCheckRouter);
router.use("/users", userRoute);
router.use("/networks", networkRoute);
router.use("/currencies", currencyRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoutes);
router.use("/wallets", walletRoutes);

export default router;
