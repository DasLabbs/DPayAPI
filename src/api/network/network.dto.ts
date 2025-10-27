export type CreateNetworkDto = {
    name: string;
    chainId: number;
    rpcUrls: string[];
    explorerUrl: string;
    isTestnet: boolean;
    isEvmCompatible: boolean;
};

export type UpdateNetworkDto = Partial<CreateNetworkDto>;

export type GetNetworkDto = {
    id: string;
};
