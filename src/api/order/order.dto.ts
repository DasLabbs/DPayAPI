import { PaginationDto } from "@shared/interface";
import { ObjectId } from "@shared/lib/mongoose/type";

export type GetOrdersDto = {
    userId: ObjectId;
    status?: "pending" | "completed" | "failed";
} & PaginationDto;

export type GetOrderDto = {
    id: ObjectId;
    userId: ObjectId;
};

export type CreateOrderDto = {
    userId: ObjectId;
    productId: ObjectId;
    quantity: number;
    qrPayload: string;
    txHash: string;
};

export type UpdateOrderDto = Partial<CreateOrderDto>;
