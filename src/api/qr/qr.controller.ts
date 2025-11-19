import { OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { extractContext } from "@shared/lib/context";
import { Request } from "express";

import { GenerateQRDto } from "./qr.dto";
import qrService from "./qr.service";

export class QRController {
    @OkResponse()
    async generateQR(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<GenerateQRDto>(req, "body");
        return qrService.generateQR(context, dto);
    }
}

const qrController = new QRController();
export default qrController;
