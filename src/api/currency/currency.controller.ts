import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { PaginationDto } from "@shared/interface";
import { extractContext } from "@shared/lib/context";
import { Request } from "express";

import { CreateCurrencyDto, UpdateCurrencyDto } from "./currency.dto";
import currencyService from "./currency.service";

export class CurrencyController {
    @OkResponse()
    async getCurrencies(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<PaginationDto>(req, "query");
        return await currencyService.getCurrencies(context, dto);
    }

    @OkResponse()
    async getCurrency(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<{ id: string }>(req, "params");
        return await currencyService.getCurrency(context, dto.id);
    }

    @CreatedResponse()
    async createCurrency(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<CreateCurrencyDto>(req, "body");
        return await currencyService.createCurrency(context, dto);
    }

    @OkResponse()
    async updateCurrency(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        const dto = extractRequest<UpdateCurrencyDto>(req, "body");
        return await currencyService.updateCurrency(context, param.id, dto);
    }

    @OkResponse()
    async softDeleteCurrency(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<{ id: string }>(req, "params");
        return await currencyService.softDeleteCurrency(context, dto.id);
    }

    @OkResponse()
    async hardDeleteCurrency(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<{ id: string }>(req, "params");
        return await currencyService.hardDeleteCurrency(context, dto.id);
    }
}

const currencyController = new CurrencyController();
export default currencyController;
