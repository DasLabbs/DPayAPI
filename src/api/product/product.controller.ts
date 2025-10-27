import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { PaginationDto } from "@shared/interface";
import { extractContext } from "@shared/lib/context";
import { Request } from "express";

import { CreateProductDto, UpdateProductDto } from "./product.dto";
import productService from "./product.service";

export class ProductController {
    @OkResponse()
    async getProducts(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<PaginationDto>(req, "query");
        return await productService.getProducts(context, dto);
    }

    @OkResponse()
    async getProduct(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<{ id: string }>(req, "params");
        return await productService.getProduct(context, dto.id);
    }

    @CreatedResponse()
    async createProduct(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<CreateProductDto>(req, "body");
        return await productService.createProduct(context, dto);
    }

    @OkResponse()
    async updateProduct(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        const dto = extractRequest<UpdateProductDto>(req, "body");
        return await productService.updateProduct(context, param.id, dto);
    }

    @OkResponse()
    async activateProduct(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        return await productService.activateProduct(context, param.id);
    }

    @OkResponse()
    async deactivateProduct(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        return await productService.deactivateProduct(context, param.id);
    }

    @OkResponse()
    async softDeleteProduct(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        return await productService.softDeleteProduct(context, param.id);
    }

    @OkResponse()
    async hardDeleteProduct(req: Request) {
        const context = extractContext(req);
        const param = extractRequest<{ id: string }>(req, "params");
        return await productService.hardDeleteProduct(context, param.id);
    }
}

const productController = new ProductController();
export default productController;
