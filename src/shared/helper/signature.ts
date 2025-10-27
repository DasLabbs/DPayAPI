import config from "@config/index";
import { EIP712_DOMAIN, EIP721_TYPES } from "@shared/constant";
import { ethers } from "ethers";

export type EIP721Message = {
    address: string;
    message: string;
    nonce: string;
    chainId: number;
    network: string;
    url: string;
};

export const verifyEIP721Message = (
    message: EIP721Message,
    signature: string,
    signer: string,
) => {
    const messagePayload = {
        Message: config.eip712.message,
        URL: message.url,
        Network: message.network,
        Account: message.address,
        Nonce: message.nonce,
    };
    return (
        signer ===
        ethers.verifyTypedData(
            {
                ...EIP712_DOMAIN,
                chainId: message.chainId,
            },
            EIP721_TYPES,
            messagePayload,
            signature,
        )
    );
};
