import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { PaginationDto } from "@shared/interface";
import { extractContext } from "@shared/lib/context";
import { Request } from "express";

import { CreateNetworkDto, UpdateNetworkDto } from "./network.dto";
import networkService from "./network.service";

export class NetworkController {
    @OkResponse()
    async getNetworks(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<PaginationDto>(req, "query");
        return await networkService.getNetworks(context, dto);
    }

    @OkResponse()
    async getNetwork(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<{ id: string }>(req, "params");
        return await networkService.getNetwork(context, dto.id);
    }

    @CreatedResponse()
    async createNetwork(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<CreateNetworkDto>(req, "body");
        return await networkService.createNetwork(context, dto);
    }

    @OkResponse()
    async updateNetwork(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        const dto = extractRequest<UpdateNetworkDto>(req, "body");
        return await networkService.updateNetwork(context, param.id, dto);
    }

    @OkResponse()
    async softDeleteNetwork(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        return await networkService.softDeleteNetwork(context, param.id);
    }
}

const networkController = new NetworkController();
export default networkController;
