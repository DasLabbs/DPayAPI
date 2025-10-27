import {
    PrivateKeyPart,
    PrivateKeyPartModel,
} from "@domain/entity/privateKeyPart.model";

import { BaseRepo } from "./base.repo";

export class PrivateKeyPartRepo extends BaseRepo<PrivateKeyPart> {
    constructor() {
        super(PrivateKeyPartModel);
    }
}

const privateKeyPartRepo = new PrivateKeyPartRepo();
export default privateKeyPartRepo;
