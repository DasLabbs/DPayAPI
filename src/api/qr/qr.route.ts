import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import qrController from "./qr.controller";
import { generateQRSchema } from "./qr.schema";

const qrRouter = Router();

qrRouter.post(
    "/",
    validator({ body: generateQRSchema }),
    asyncWrapper(qrController.generateQR),
);

export default qrRouter;
