import { OkResponse } from "@shared/decorators/response";
import { extractRequest } from "@shared/helper/request";
import { PaginationDto } from "@shared/interface";
import { extractContext } from "@shared/lib/context";
import { JwtPayload } from "@shared/lib/jwt";
import { Request } from "express";

import { CreateTransactionDto } from "./transaction.dto";
import transactionService from "./transaction.service";

export class TransactionController {
    @OkResponse()
    async submitTransaction(req: Request) {
        const context = extractContext(req);
        const dto = extractRequest<CreateTransactionDto>(req, "body");
        return transactionService.submitTransaction(context, dto);
    }

    @OkResponse()
    async getTransactions(req: Request) {
        const context = extractContext(req);
        const { userId } = extractRequest<JwtPayload>(req, "user");
        const paginateDto = extractRequest<PaginationDto>(req, "query");

        return transactionService.getTransactions(context, {
            userId,
            ...paginateDto,
        });
    }
}

const transactionController = new TransactionController();
export default transactionController;
