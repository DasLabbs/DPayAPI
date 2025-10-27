import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { Permission } from "./permission.model";

export type Role = {
    name: string;
    description?: string;
    permissions: ObjectId[] | Permission[];
} & BaseModel;

export const RoleSchema = new Schema<Role>(
    {
        name: { type: String, required: true },
        description: { type: String, default: null },
        permissions: {
            type: [Schema.Types.ObjectId],
            ref: "Permission",
            default: [] as ObjectId[],
        },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const RoleModel = model<Role>("Role", RoleSchema);
