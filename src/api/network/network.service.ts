import { paginate } from "@shared/helper/paginate";
import { PaginationDto } from "@shared/interface";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";

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
}

const networkService = new NetworkService();
export default networkService;
