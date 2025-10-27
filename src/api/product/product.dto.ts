export type CreateProductDto = {
    image: string;
    name: string;
    description: string;
    price: number;
};

export type UpdateProductDto = Partial<CreateProductDto>;

export type GetProductDto = {
    id: string;
};
