import { ObjectLiteral } from "@shared/ types";
import { Request, Response } from "express";

export class SseService {
    private clients: Record<string, Response> = {};
    private clientLastActivity: Record<string, number> = {};
    private readonly heartbeatInterval: NodeJS.Timeout;

    constructor() {
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
        clientId: string,
        event: {
            type: string;
            data: ObjectLiteral;
        },
    ) {
        const client = this.clients[clientId];
        if (!client) return;
        client.write(`data: ${JSON.stringify(event)}\n\n`);
    }

    public extendClientHeartbeat(clientId: string) {
        this.clientLastActivity[clientId] = Date.now();
    }

    private removeClient(clientId: string) {
        delete this.clients[clientId];
    }
}

const sseService = new SseService();
export default sseService;
