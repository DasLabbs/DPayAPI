import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { User } from "./user.model";

export type KYC = {
    userId: ObjectId | User;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    idNumber: string;
    idType: string;
    idIssuedAt: Date;
} & BaseModel;

export const KYCSchema = new Schema<KYC>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
        idNumber: { type: String, required: true },
        idType: { type: String, required: true },
        idIssuedAt: { type: Date, required: true },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const KYCModel = model<KYC>("KYC", KYCSchema);
