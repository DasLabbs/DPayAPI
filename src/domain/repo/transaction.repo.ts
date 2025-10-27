import {
    Transaction,
    TransactionModel,
} from "@domain/entity/transaction.model";

import { BaseRepo } from "./base.repo";

export class TransactionRepo extends BaseRepo<Transaction> {
    constructor() {
        super(TransactionModel);
    }
}

const transactionRepo = new TransactionRepo();
export default transactionRepo;
