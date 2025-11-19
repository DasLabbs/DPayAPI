import { PaginationDto } from "@shared/interface";

export type CreateTransactionDto = {
    chainId: number;
    txHash: string;
    qrPayload: string;
};

export type GetTransactionsDto = {
    userAddress: string;
} & PaginationDto;
