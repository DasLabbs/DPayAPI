import { Network } from "@domain/entity";
import { BaseClass } from "@shared/lib/base/class";

export abstract class NetworkManager extends BaseClass {
    public readonly chainId: number;
    public readonly networkMap: Map<number, Network> = new Map();

    constructor(chainId: number) {
        super();
        this.chainId = chainId;
    }
}
