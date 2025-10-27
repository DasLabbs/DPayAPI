import { KYCLog, KYCLogModel } from "@domain/entity/kycLog.model";

import { BaseRepo } from "./base.repo";

export class KYCLogRepo extends BaseRepo<KYCLog> {
    constructor() {
        super(KYCLogModel);
    }
}

const kycLogRepo = new KYCLogRepo();
export default kycLogRepo;
