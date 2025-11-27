import { limit, orderBy, page, sort } from "@shared/schema";
import Joi from "joi";

export const getNotificationsSchema = Joi.object({
    page: page.required(),
    limit: limit.required(),
    sort: sort.required(),
    orderBy: orderBy.required(),
});

export const markAsReadSchema = Joi.object({
    notificationId: Joi.string().optional(),
});
