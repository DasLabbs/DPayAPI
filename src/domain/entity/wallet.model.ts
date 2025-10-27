import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Network } from "./network.model";
import { PrivateKeyPart } from "./privateKeyPart.model";
import { User } from "./user.model";

export type Wallet = {
    userId: ObjectId | User;
    address: string;
    privateKeyPart: ObjectId[] | PrivateKeyPart[];
    network: ObjectId | Network;
    type: "imported" | "generated";
} & BaseModel;

export const WalletSchema = new Schema<Wallet>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        address: { type: String, required: true },
        network: {
            type: Schema.Types.ObjectId,
            ref: "Network",
            required: true,
        },
        privateKeyPart: {
            type: [Schema.Types.ObjectId],
            ref: "PrivateKeyPart",
            default: [] as ObjectId[],
        },
        type: {
            type: String,
            enum: ["imported", "generated"],
            default: "generated",
        },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const WalletModel = model<Wallet>("Wallet", WalletSchema);
