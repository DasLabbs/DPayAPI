import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { User } from "./user.model";

export type PrivateKeyPart = {
    userId: ObjectId | User;
    partId: number;
    privateKey: string;
} & BaseModel;

export const PrivateKeyPartSchema = new Schema<PrivateKeyPart>(
    {
        partId: {
            type: "Number",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        privateKey: {
            type: String,
            required: true,
        },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const PrivateKeyPartModel = model<PrivateKeyPart>(
    "PrivateKeyPart",
    PrivateKeyPartSchema,
);
