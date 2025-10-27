import { model, Schema } from "mongoose";

import { BaseModel } from "./base.model";

export type Product = {
    image: string;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
} & BaseModel;

export const ProductSchema = new Schema<Product>(
    {
        image: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        isActive: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
);

export const ProductModel = model<Product>("Product", ProductSchema);
