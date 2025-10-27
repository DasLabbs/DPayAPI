import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";
import { ethers } from "ethers";

import { WalletCreator } from "./walletCreator";

export class EvmWalletCreator extends WalletCreator {
    constructor() {
        super(1); // Auto set for evm compatible chains
    }

    createWallet(): {
        address: string;
        privateKey: string;
    } {
        const wallet = ethers.Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
        };
    }

    getAddress(context: RequestContext, privateKey: string) {
        try {
            return new ethers.Wallet(privateKey).address;
        } catch (error) {
            this.handleError(context, error);
            throw new BadRequestError("Invalid private key");
        }
    }
}

const evmWalletCreator = new EvmWalletCreator();
export default evmWalletCreator;
