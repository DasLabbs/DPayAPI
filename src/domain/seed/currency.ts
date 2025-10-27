import currencyRepo from "@domain/repo/currency.repo";
import networkRepo from "@domain/repo/network.repo";
import { RequestContext } from "@shared/lib/context";

export const createCurrencies = async (context: RequestContext) => {
    const currencies = [
        {
            address: "0x0000000000000000000000000000000000000000",
            name: "Somnia Testnet",
            symbol: "STT",
            decimals: 18,
        },
        {
            address: "0x0000000000000000000000000000000000000001",
            name: "USD Coin",
            symbol: "USDC",
            decimals: 6,
        },
        {
            address: "0x0000000000000000000000000000000000000002",
            name: "Tether USD",
            symbol: "USDT",
            decimals: 6,
        },
    ];

    const network = await networkRepo.findOne(context, {
        chainId: 50312,
    });
    if (!network) return;

    await currencyRepo.create(
        context,
        currencies.map((currency) => ({
            ...currency,
            network: network._id,
        })),
    );
};
