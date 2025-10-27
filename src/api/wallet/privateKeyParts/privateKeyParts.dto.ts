import { ObjectId } from "@shared/lib/mongoose/type";

export type GeneratePrivateKeyPartsDto = {
    privateKey: string;
    userId: ObjectId;
};

export type CombinePrivateKeyPartsDto = {
    parts: string[];
};
