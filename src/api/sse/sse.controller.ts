import { OkResponse } from "@shared/decorators/response";
import { Request, Response } from "express";

import sseService from "./sse.service";

export class SseController {
    async handleSse(req: Request, res: Response) {
        return sseService.handleSse(req, res);
    }

    @OkResponse()
    async extendClientHeartbeat(req: Request) {
        const clientId = req.headers["x-client-id"] as string;
        return sseService.extendClientHeartbeat(clientId);
    }
}

const sseController = new SseController();
export default sseController;
