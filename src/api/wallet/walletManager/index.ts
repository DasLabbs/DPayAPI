import { BaseClass } from "@shared/lib/base/class";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";

import evmWalletCreator from "./evmWalletCreator";
import { WalletCreator } from "./walletCreator";

export class WalletManager extends BaseClass {
    // Chain id -> WalletCreator
    private readonly walletCreatorsMap: Map<number, WalletCreator> = new Map();

    constructor() {
        super();
        this.walletCreatorsMap.set(1, evmWalletCreator);
    }

    createWallet(context: RequestContext, chainId: number) {
        const walletCreator = this.walletCreatorsMap.get(chainId);
        if (!walletCreator) {
            throw new BadRequestError(
                `Wallet creator not found for chain id: ${chainId}`,
            );
        }
        return walletCreator.createWallet(context);
    }

    getAddress(context: RequestContext, chainId: number, privateKey: string) {
        const walletCreator = this.walletCreatorsMap.get(chainId);
        if (!walletCreator) {
            throw new BadRequestError(
                `Wallet creator not found for chain id: ${chainId}`,
            );
        }
        return walletCreator.getAddress(context, privateKey);
    }
}

const walletManager = new WalletManager();
export default walletManager;
