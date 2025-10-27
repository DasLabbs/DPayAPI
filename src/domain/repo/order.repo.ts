import { Order, OrderModel } from "@domain/entity/order.model";

import { BaseRepo } from "./base.repo";

export class OrderRepo extends BaseRepo<Order> {
    constructor() {
        super(OrderModel);
    }
}

const orderRepo = new OrderRepo();
export default orderRepo;
