import { KYC, KYCModel } from "@domain/entity";

import { BaseRepo } from "./base.repo";

export class KYCRepo extends BaseRepo<KYC> {
    constructor() {
        super(KYCModel);
    }
}

const kycRepo = new KYCRepo();
export default kycRepo;
