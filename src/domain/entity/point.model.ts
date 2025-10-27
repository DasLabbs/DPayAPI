import { ObjectId } from "@shared/lib/mongoose/type";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";
import { User } from "./user.model";

export type Point = {
    userId: ObjectId | User;
    amount: number;
} & BaseModel;

export const PointSchema = new Schema<Point>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        amount: { type: Number, required: true },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
);

export const PointModel = model<Point>("Point", PointSchema);
