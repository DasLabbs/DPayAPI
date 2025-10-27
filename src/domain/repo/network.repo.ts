import { Network, NetworkModel } from "@domain/entity/network.model";

import { BaseRepo } from "./base.repo";

export class NetworkRepo extends BaseRepo<Network> {
    constructor() {
        super(NetworkModel);
    }
}

const networkRepo = new NetworkRepo();
export default networkRepo;
