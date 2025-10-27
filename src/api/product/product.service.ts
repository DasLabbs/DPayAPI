import { paginate } from "@shared/helper/paginate";
import { PaginationDto } from "@shared/interface";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";

import { CreateProductDto, UpdateProductDto } from "./product.dto";

export class ProductService extends BaseService {
    async getProducts(context: RequestContext, dto: PaginationDto) {
        const products = await this.repos.product.find(context);
        return paginate(products, dto);
    }

    async getProduct(context: RequestContext, id: string) {
        return this.repos.product.findOne(context, { _id: id });
    }

    async createProduct(context: RequestContext, dto: CreateProductDto) {
        return this.repos.product.create(context, dto);
    }

    async updateProduct(
        context: RequestContext,
        id: string,
        dto: UpdateProductDto,
    ) {
        return this.repos.product.update(context, id, dto);
    }

    async activateProduct(context: RequestContext, id: string) {
        return this.repos.product.update(context, id, { isActive: true });
    }

    async deactivateProduct(context: RequestContext, id: string) {
        return this.repos.product.update(context, id, {
            isActive: false,
        });
    }

    async softDeleteProduct(context: RequestContext, id: string) {
        return this.repos.product.softDelete(context, id);
    }

    async hardDeleteProduct(context: RequestContext, id: string) {
        return this.repos.product.hardDelete(context, id);
    }
}

const productService = new ProductService();
export default productService;
