import { serializeError } from "@shared/helper/error";
import { camelCaseToWords } from "@shared/utils/string";
import { Logger } from "winston";

import { RequestContext } from "../context";
import appLogger from "../logger";

export abstract class BaseClass {
    protected readonly logger: Logger;

    constructor() {
        this.logger = appLogger.child({
            source: camelCaseToWords(this.constructor.name),
        });
    }

    protected handleError(context: RequestContext, error: unknown) {
        this.logger.error({
            context,
            ...serializeError(error),
        });
    }
}
