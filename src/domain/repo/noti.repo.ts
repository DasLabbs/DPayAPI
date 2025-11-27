import { Notification, NotificationModel } from "@domain/entity/noti.model";

import { BaseRepo } from "./base.repo";

export class NotificationRepo extends BaseRepo<Notification> {
    constructor() {
        super(NotificationModel);
    }
}

const notificationRepo = new NotificationRepo();
export default notificationRepo;
