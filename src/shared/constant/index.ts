import { AbiItem } from "@shared/ types";

export enum NodeEnv {
    DEV = "DEV",
    STAG = "STAG",
    PROD = "PROD",
}

export const EIP712_DOMAIN = {
    name: "DPay",
    version: "1",
    verifyingContract: "0x0000000000000000000000000000000000000000",
};

export const EIP721_TYPES = {
    LoginMessage: [
        { name: "Message", type: "string" },
        { name: "URL", type: "string" },
        { name: "Network", type: "string" },
        { name: "Account", type: "address" },
        { name: "Nonce", type: "string" },
    ],
};
export const FUND_TRANSFERRED_TOPIC =
    "0x4ed2986a2cde8f90dd7d10ce44efb8d683b5e58ff9a6ffdc2d83dbbacee76437";

export const TRANSFER_EVENT_ABI: AbiItem[] = [
    { name: "token", type: "address", indexed: true, internalType: "address" },
    { name: "from", type: "address", indexed: true, internalType: "address" },
    { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
];
