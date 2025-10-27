import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Network } from "./network.model";

export type Transaction = {
    hash: string;
    from: string;
    to: string;
    amount: number;
    status: "pending" | "completed" | "failed";
    network: ObjectId | Network;
} & BaseModel;

export const TransactionSchema = new Schema<Transaction>(
    {
        hash: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        amount: { type: Number, required: true },
        status: {
            type: String,
            required: true,
            enum: ["pending", "completed", "failed"],
        },
        network: {
            type: Schema.Types.ObjectId,
            ref: "Network",
            required: true,
        },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const TransactionModel = model<Transaction>(
    "Transaction",
    TransactionSchema,
);
