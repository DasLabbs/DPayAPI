import { TransactionStatus } from "@domain/entity";
import { Types } from "mongoose";

export type OnchainTransaction = {
    hash: string;
    from: string;
    to: string;
    token: string;
    amount: bigint;
    status: TransactionStatus;
    network: Types.ObjectId;
    gasUsed: number;
    gasPrice: number;
    totalFee: number;
};
