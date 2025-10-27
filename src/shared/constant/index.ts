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
