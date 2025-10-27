import { Wallet, WalletModel } from "@domain/entity";

import { BaseRepo } from "./base.repo";

export class WalletRepo extends BaseRepo<Wallet> {
    constructor() {
        super(WalletModel);
    }
}

const walletRepo = new WalletRepo();
export default walletRepo;
