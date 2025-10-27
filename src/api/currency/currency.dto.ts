export type CreateCurrencyDto = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    networkId: string;
};

export type UpdateCurrencyDto = Partial<CreateCurrencyDto>;
