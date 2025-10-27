import { Currency, CurrencyModel } from "@domain/entity/currency.model";

import { BaseRepo } from "./base.repo";

export class CurrencyRepo extends BaseRepo<Currency> {
    constructor() {
        super(CurrencyModel);
    }
}

const currencyRepo = new CurrencyRepo();
export default currencyRepo;
