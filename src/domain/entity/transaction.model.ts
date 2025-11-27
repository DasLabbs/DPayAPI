import { ObjectLiteral } from "@shared/ types";
import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Network } from "./network.model";

export type TransactionStatus = "pending" | "confirmed" | "failed";

export type Transaction = {
    userId: Schema.Types.ObjectId | string;
    hash: string;
    from: string;
    to: string;
    amount: string;
    formattedAmount: number;
    status: TransactionStatus;
    network: ObjectId | Network;
    gasUsed: number;
    gasPrice: number;
    totalFee?: number;
    stripePayment?: ObjectLiteral;
} & BaseModel;

export const TransactionSchema = new Schema<Transaction>(
    {
        hash: { type: String, required: true },
        from: { type: String, required: false },
        to: { type: String, required: false },
        amount: { type: String, required: false },
        formattedAmount: { type: Number, required: false },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
        status: {
            type: String,
            required: true,
            enum: ["pending", "confirmed", "failed"],
        },
        network: {
            type: Schema.Types.ObjectId,
            ref: "Network",
            required: true,
        },
        gasUsed: { type: Number, required: false },
        gasPrice: { type: Number, required: false },
        totalFee: { type: Number, required: false },
        stripePayment: { type: Object, required: false },
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
