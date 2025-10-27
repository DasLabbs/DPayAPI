import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import userController from "./user.controller";
import { userSignInSchema, userSignUpSchema } from "./user.schema";

const userRoute = express.Router();

userRoute.post(
    "/sign-up",
    validator({ body: userSignUpSchema }),
    asyncWrapper(userController.signUp),
);
userRoute.post(
    "/sign-in",
    validator({ body: userSignInSchema }),
    asyncWrapper(userController.signIn),
);

export default userRoute;
