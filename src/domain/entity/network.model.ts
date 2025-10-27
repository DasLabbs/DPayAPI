import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";

export type Network = {
    name: string;
    chainId: number;
    rpcUrls: string[];
    explorerUrl: string;
    isTestnet: boolean;
    isEvmCompatible: boolean;
} & BaseModel;

export const NetworkSchema = new Schema<Network>(
    {
        name: {
            type: "String",
            required: true,
        },
        chainId: {
            type: "Number",
            required: true,
        },
        rpcUrls: {
            type: ["String"],
            required: true,
        },
        explorerUrl: {
            type: "String",
            required: true,
        },
        isTestnet: {
            type: "Boolean",
            required: true,
            default: false,
        },
        isEvmCompatible: {
            type: "Boolean",
            required: true,
            default: false,
        },
    },
    { timestamps: true },
);

export const NetworkModel = model<Network>("Network", NetworkSchema);
