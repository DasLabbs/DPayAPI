import { BaseClass } from "@shared/lib/base/class";
import { RequestContext } from "@shared/lib/context";

export abstract class WalletCreator extends BaseClass {
    public readonly chainId: number;

    constructor(chainId: number) {
        super();
        this.chainId = chainId;
    }

    abstract createWallet(context: RequestContext): {
        address: string;
        privateKey: string;
    }; // private key

    abstract getAddress(context: RequestContext, privateKey: string): string;
}
