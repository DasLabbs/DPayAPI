import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Role } from "./role.model";

export type User = {
    address: string;
    isKYCVerified: boolean;
    roleId: ObjectId | Role;
} & BaseModel;

export const UserSchema = new Schema<User>(
    {
        address: { type: String, required: true },
        deletedAt: { type: Date, default: null },
        isKYCVerified: { type: Boolean, default: false },
        roleId: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = model<User>("User", UserSchema);
