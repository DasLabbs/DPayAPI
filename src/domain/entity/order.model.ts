import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Product } from "./product.model";
import { Transaction } from "./transaction.model";
import { User } from "./user.model";

export type Order = {
    userId: ObjectId | User;
    productId: ObjectId | Product;
    quantity: number;
    totalPrice: number;
    status: "pending" | "completed" | "failed";
    transaction: ObjectId | Transaction;
} & BaseModel;

export const OrderSchema = new Schema<Order>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "completed", "failed"],
        },
        transaction: {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
            required: true,
        },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const OrderModel = model<Order>("Order", OrderSchema);
