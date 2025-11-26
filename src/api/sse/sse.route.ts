import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import sseController from "./sse.controller";

const sseRouter = Router();
sseRouter.get("/", asyncWrapper(sseController.handleSse));
sseRouter.post(
    "/extend-heartbeat",
    asyncWrapper(sseController.extendClientHeartbeat),
);

export default sseRouter;
