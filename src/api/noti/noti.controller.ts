import { OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { PaginationDto } from "@shared/interface";
import { extractContext } from "@shared/lib/context";
import { Request, Response } from "express";

import notificationService from "./noti.service";

export class NotificationController {
    async handleSse(req: Request, res: Response) {
        return notificationService.handleSse(req, res);
    }

    @OkResponse()
    async extendClientHeartbeat(req: Request) {
        const clientId = req.headers["x-client-id"] as string;
        return notificationService.extendClientHeartbeat(clientId);
    }

    @OkResponse()
    async getNotifications(req: Request) {
        const context = extractContext(req);
        const paginationDto = extractRequest<PaginationDto>(req, "query");
        const notifications = notificationService.getNotifications(
            context,
            paginationDto,
        );
        return notifications;
    }

    @OkResponse()
    async markAsRead(req: Request) {
        const context = extractContext(req);
        const { notificationId } = extractRequest<{ notificationId?: string }>(
            req,
            "query",
        );
        return notificationService.markAsRead(context, notificationId);
    }
}

const notificationController = new NotificationController();
export default notificationController;
