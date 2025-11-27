import { privyAuth } from "@shared/middlewares/privyAuth";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import userController from "./user.controller";

const userRoute = express.Router();
userRoute.post("/sign-in", privyAuth, asyncWrapper(userController.signIn));
userRoute.get(
    "/point-leaderboard",
    privyAuth,
    asyncWrapper(userController.pointLeaderboard),
);
export default userRoute;
