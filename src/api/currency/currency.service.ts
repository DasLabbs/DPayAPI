import { paginate } from "@shared/helper/paginate";
import { PaginationDto } from "@shared/interface";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";

import { CreateCurrencyDto, UpdateCurrencyDto } from "./currency.dto";

export class CurrencyService extends BaseService {
    async getCurrencies(context: RequestContext, dto: PaginationDto) {
        const currencies = await this.repos.currency.find(context);
        return paginate(currencies, dto);
    }

    async getCurrency(context: RequestContext, id: string) {
        return this.repos.currency.findOne(context, { _id: id });
    }

    async createCurrency(context: RequestContext, dto: CreateCurrencyDto) {
        return this.repos.currency.create(context, dto);
    }

    async updateCurrency(
        context: RequestContext,
        id: string,
        dto: UpdateCurrencyDto,
    ) {
        return this.repos.currency.update(context, id, dto);
    }

    async softDeleteCurrency(context: RequestContext, id: string) {
        return this.repos.currency.softDelete(context, id);
    }

    async hardDeleteCurrency(context: RequestContext, id: string) {
        return this.repos.currency.hardDelete(context, id);
    }
}

const currencyService = new CurrencyService();
export default currencyService;
