import { Network } from "@domain/entity";
import { paginate } from "@shared/helper/paginate";
import { PaginationDto } from "@shared/interface";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";
import { FallbackProvider, JsonRpcProvider } from "ethers";

import { CreateNetworkDto, UpdateNetworkDto } from "./network.dto";

export class NetworkService extends BaseService {
    async getNetworks(context: RequestContext, dto: PaginationDto) {
        const networks = await this.repos.network.find(context);
        return paginate(networks, dto);
    }

    async getNetwork(context: RequestContext, id: string) {
        return this.repos.network.findOne(context, { _id: id });
    }

    async createNetwork(context: RequestContext, dto: CreateNetworkDto) {
        return this.repos.network.create(context, dto);
    }

    async updateNetwork(
        context: RequestContext,
        id: string,
        dto: UpdateNetworkDto,
    ) {
        return this.repos.network.update(context, id, dto);
    }

    async softDeleteNetwork(context: RequestContext, id: string) {
        return this.repos.network.softDelete(context, id);
    }

    async getProviderByChainId(context: RequestContext, chainId: number) {
        const network = await this.repos.network.findOne(context, { chainId });
        if (!network) throw new BadRequestError("Network not found");

        return new FallbackProvider(
            network.rpcUrls.map((rpcUrl) => new JsonRpcProvider(rpcUrl)),
            {
                name: network.name,
                chainId: network.chainId,
            },
        );
    }

    async getProvider(_: RequestContext, network: Network) {
        return new FallbackProvider(
            network.rpcUrls.map((rpcUrl) => new JsonRpcProvider(rpcUrl)),
            {
                name: network.name,
                chainId: network.chainId,
            },
        );
    }
}

const networkService = new NetworkService();
export default networkService;
