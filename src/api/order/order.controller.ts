import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { PaginationDto } from "@shared/interface";
import { extractContext } from "@shared/lib/context";
import { JwtPayload } from "@shared/lib/jwt";
import { toObjectId } from "@shared/utils/string";
import { Request } from "express";

import { CreateOrderDto } from "./order.dto";
import orderService from "./order.service";

export class OrderController {
    @OkResponse()
    async getOrders(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<PaginationDto>(req, "query");
        const payload = extractRequest<JwtPayload>(req, "user");

        return await orderService.getOrders(context, {
            userId: toObjectId(payload.userId),
            ...dto,
        });
    }

    @OkResponse()
    async getOrder(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<{ id: string }>(req, "params");
        const payload = extractRequest<JwtPayload>(req, "user");
        return await orderService.getOrder(context, {
            id: toObjectId(dto.id),
            userId: toObjectId(payload.userId),
        });
    }

    @CreatedResponse()
    async createOrder(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<CreateOrderDto>(req, "body");
        const payload = extractRequest<JwtPayload>(req, "user");

        return await orderService.createOrder(context, {
            ...dto,
            userId: toObjectId(payload.userId),
        });
    }
}

const orderController = new OrderController();
export default orderController;
