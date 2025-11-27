import { ObjectLiteral } from "@shared/ types";
import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";

export type Notification = {
    userId: string;
    title: string;
    message: string;
    data: ObjectLiteral;
    isRead: boolean;
} & BaseModel;

export const Notification = new Schema<Notification>(
    {
        userId: { type: String, required: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        data: { type: Object, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export const NotificationModel = model<Notification>(
    "Notification",
    Notification,
);
export default NotificationModel;
