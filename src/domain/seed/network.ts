import networkRepo from "@domain/repo/network.repo";
import { RequestContext } from "@shared/lib/context";

export const createNetworks = async (context: RequestContext) => {
    const networks = [
        {
            name: "Somnia Testnet",
            chainId: 50312,
            rpcUrls: ["https://dream-rpc.somnia.network"],
            explorerUrl: "https://shannon-explorer.somnia.network/",
            isTestnet: true,
            isEvmCompatible: true,
        },
        {
            name: "Ethereum Mainnet",
            chainId: 1,
            rpcUrls: ["https://eth-mainnet.g.alchemy.com/v2/demo"],
            explorerUrl: "https://etherscan.io/",
            isTestnet: false,
            isEvmCompatible: true,
        },
    ];

    for (const network of networks) {
        await networkRepo.create(context, network);
    }
};
