import { BaseModel } from "@domain/entity/base.model";
import { serializeError } from "@shared/helper/error";
import { RequestContext } from "@shared/lib/context";
import appLogger from "@shared/lib/logger";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { Logger } from "winston";

export abstract class BaseRepo<T extends BaseModel> {
    protected readonly logger: Logger = appLogger.child({
        source: this.constructor.name,
    });
    constructor(public readonly model: Model<T>) {}

    protected handleError<T>(
        context: RequestContext,
        error: unknown,
        defaultReturn: T,
    ): T {
        this.logger.error({
            context,
            ...serializeError(error),
        });
        return defaultReturn;
    }

    async findById(context: RequestContext, id: string): Promise<T | null> {
        const item = await this.model
            .findById(id)
            .catch((error) => this.handleError(context, error, null));
        return item as T | null;
    }

    async find(
        context: RequestContext,
        query: FilterQuery<T> = {},
    ): Promise<T[]> {
        const items = await this.model
            .find({
                deletedAt: { $eq: null },
                ...query,
            })
            .catch((error) => this.handleError(context, error, []));
        return items as T[];
    }

    async findOne(
        context: RequestContext,
        query: FilterQuery<T> = {},
    ): Promise<T | null> {
        const item = await this.model
            .findOne(query)
            .catch((error) => this.handleError(context, error, null));
        return item as T | null;
    }

    async create(
        context: RequestContext,
        data: Partial<T> | Partial<T>[],
    ): Promise<T | T[]> {
        const items = await this.model
            .create(data)
            .catch((error) => this.handleError(context, error, []));
        return items as T | T[];
    }

    async update(
        context: RequestContext,
        id: string,
        data: UpdateQuery<T>,
    ): Promise<T | null> {
        const item = await this.model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .catch((error) => this.handleError(context, error, null));
        return item as T | null;
    }

    async softDelete(context: RequestContext, id: string): Promise<T | null> {
        const item = await this.model
            .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
            .catch((error) => this.handleError(context, error, null));
        return item as T | null;
    }

    async hardDelete(context: RequestContext, id: string): Promise<T | null> {
        const item = await this.model
            .findByIdAndDelete(id)
            .catch((error) => this.handleError(context, error, null));
        return item as T | null;
    }
}
