import { ObjectId } from "@shared/lib/mongoose/type";

export type BaseModel = {
    _id: ObjectId;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
} & Document;
