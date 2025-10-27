import { ObjectId } from "@shared/lib/mongoose/type";

export type CreateWalletDto = {
    userId: ObjectId;
    chainId: number;
    privateKey?: string;
};

export type ExportWalletDto = {
    walletId: ObjectId;
    userId: ObjectId;
    password: string;
};

export type GetWalletsDto = {
    userId: ObjectId;
};
