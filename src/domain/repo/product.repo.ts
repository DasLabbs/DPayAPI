import { Product, ProductModel } from "@domain/entity/product.model";

import { BaseRepo } from "./base.repo";

export class ProductRepo extends BaseRepo<Product> {
    constructor() {
        super(ProductModel);
    }
}

const productRepo = new ProductRepo();
export default productRepo;
