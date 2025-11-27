import { ObjectLiteral } from "@shared/ types";
import { PaginationDto } from "@shared/interface";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { Request, Response } from "express";

export class NotificationService extends BaseService {
    private clients: Record<string, Response> = {};
    private clientLastActivity: Record<string, number> = {};
    private readonly heartbeatInterval: NodeJS.Timeout;

    constructor() {
        super();
        this.heartbeatInterval = setInterval(() => {
            this.clearExpiredClients();
        }, 10000);
    }

    private clearExpiredClients() {
        const now = Date.now();
        Object.keys(this.clients).forEach((clientId) => {
            const lastActivity = this.clientLastActivity[clientId] ?? 0;
            if (now - lastActivity > 30000) {
                this.removeClient(clientId);
            }
        });
    }

    public handleSse(req: Request, res: Response) {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Headers": "Cache-Control",
            "X-Accel-Buffering": "no", // Disable nginx buffering
        });

        const clientId = req.headers["x-client-id"] as string;
        if (!clientId) {
            return res.status(400).json({ error: "Client ID is required" });
        }

        this.clients[clientId] = res;
        this.clientLastActivity[clientId] = Date.now();

        res.on("close", () => {
            this.removeClient(clientId);
            delete this.clientLastActivity[clientId];
        });
    }

    public emitEvent(
        context: RequestContext,
        event: {
            type: string;
            data: ObjectLiteral;
        },
        title: string,
        message: string,
    ) {
        const client = this.clients[context.privyUser!.id];
        if (client) {
            client.write(`data: ${JSON.stringify(event)}\n\n`);
        }

        this.repos.notification.create(context, {
            userId: context.privyUser!.id,
            title,
            message,
            data: event.data,
        });
    }

    public extendClientHeartbeat(clientId: string) {
        this.clientLastActivity[clientId] = Date.now();
    }

    private removeClient(clientId: string) {
        delete this.clients[clientId];
    }

    public markAsRead(context: RequestContext, notificationId?: string) {
        if (notificationId) {
            return this.repos.notification.update(context, notificationId, {
                isRead: true,
            });
        }
        return this.repos.notification.model.updateMany(
            {
                userId: context.privyUser!.id,
                isRead: false,
            },
            {
                isRead: true,
            },
        );
    }

    public getNotifications(
        context: RequestContext,
        paginationDto: PaginationDto,
    ) {
        return this.repos.notification.paginate(
            context,
            {
                userId: context.privyUser!.id,
            },
            paginationDto,
        );
    }
}

const notificationService = new NotificationService();
export default notificationService;
