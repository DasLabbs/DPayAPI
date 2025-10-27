import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Network } from "./network.model";

export type Currency = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    network: ObjectId | Network;
    status: "active" | "inactive";
} & BaseModel;

export const CurrencySchema = new Schema<Currency>(
    {
        address: {
            type: "String",
            required: true,
        },
        name: {
            type: "String",
            required: true,
        },
        symbol: {
            type: "String",
            required: true,
        },
        decimals: {
            type: "Number",
            required: true,
        },
        network: {
            type: Schema.Types.ObjectId,
            ref: "Network",
            required: true,
        },
        status: {
            type: "String",
            required: true,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

export const CurrencyModel = model<Currency>("Currency", CurrencySchema);
