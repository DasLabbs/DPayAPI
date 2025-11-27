import { privyAuth } from "@shared/middlewares/privyAuth";
import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import notificationController from "./noti.controller";
import { getNotificationsSchema, markAsReadSchema } from "./noti.schema";

const notificationRouter = Router();
notificationRouter.get("/", asyncWrapper(notificationController.handleSse));
notificationRouter.post(
    "/extend-heartbeat",
    asyncWrapper(notificationController.extendClientHeartbeat),
);
notificationRouter.get(
    "/",
    validator({
        query: getNotificationsSchema,
    }),
    privyAuth,
    asyncWrapper(notificationController.getNotifications),
);
notificationRouter.post(
    "/mark-as-read",
    validator({
        query: markAsReadSchema,
    }),
    privyAuth,
    asyncWrapper(notificationController.markAsRead),
);

export default notificationRouter;
