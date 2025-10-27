import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Role } from "./role.model";
import { Wallet } from "./wallet.model";

export type User = {
    username: string;
    password: string;
    isKYCVerified: boolean;
    wallets: ObjectId[] | Wallet[];
    roleId: ObjectId | Role;
} & BaseModel;

export const UserSchema = new Schema<User>(
    {
        deletedAt: { type: Date, default: null },
        username: { type: String, required: true },
        password: { type: String, required: true },
        isKYCVerified: { type: Boolean, default: false },
        roleId: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        wallets: {
            type: [Schema.Types.ObjectId],
            ref: "Wallet",
            default: [] as ObjectId[],
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = model<User>("User", UserSchema);
