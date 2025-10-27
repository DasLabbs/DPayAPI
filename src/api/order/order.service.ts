import { paginate } from "@shared/helper/paginate";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";

import { CreateOrderDto, GetOrderDto, GetOrdersDto } from "./order.dto";

export class OrderService extends BaseService {
    async getOrders(context: RequestContext, dto: GetOrdersDto) {
        const orders = await this.repos.order.find(context);
        return paginate(orders, dto);
    }

    async getOrder(context: RequestContext, dto: GetOrderDto) {
        return this.repos.order.findOne(context, {
            _id: dto.id,
            userId: dto.userId,
        });
    }

    async createOrder(context: RequestContext, dto: CreateOrderDto) {
        const product = await this.repos.product.findOne(context, {
            _id: dto.productId,
        });
        if (!product) throw new BadRequestError("Product not found");

        const order = await this.repos.order.create(context, {
            userId: dto.userId,
            productId: dto.productId,
            quantity: dto.quantity,
            totalPrice: product.price * dto.quantity,
            status: "pending",
        });
        return order;
    }
}

const orderService = new OrderService();
export default orderService;
