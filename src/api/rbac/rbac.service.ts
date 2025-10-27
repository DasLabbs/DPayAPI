import { BaseService } from "@shared/lib/base/service";

export class RBACService extends BaseService {
    async hasRoles(): Promise<boolean> {
        return true;
    }
}
