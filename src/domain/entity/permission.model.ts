import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";

export type Permission = {
    name: string;
    description?: string;
} & BaseModel;

export const PermissionSchema = new Schema<Permission>(
    {
        name: { type: String, required: true },
        description: { type: String, default: null },
    },
    {
        timestamps: true,
    },
);

export const PermissionModel = model<Permission>(
    "Permission",
    PermissionSchema,
);
