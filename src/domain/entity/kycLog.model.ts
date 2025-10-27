import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { KYC } from "./kyc.model";
import { User } from "./user.model";

export type KYCLog = {
    userId: ObjectId | User;
    kycId: ObjectId | KYC;
    status: "pending" | "approved" | "rejected";
} & BaseModel;

export const KYCLogSchema = new Schema<KYCLog>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        kycId: { type: Schema.Types.ObjectId, ref: "KYC", required: true },
        status: {
            type: "String",
            default: "pending",
            required: true,
            enum: ["pending", "approved", "rejected"],
        },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const KYCLogModel = model<KYCLog>("KYCLog", KYCLogSchema);
