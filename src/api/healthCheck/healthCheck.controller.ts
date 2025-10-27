import { OkResponse } from "@shared/decorators/response";
import { extractContext } from "@shared/lib/context";
import { Request } from "express";

import healthCheckService from "./healthCheck.service";

class HealthCheckController {
    @OkResponse()
    async get(req: Request) {
        const context = extractContext(req);
        return healthCheckService.get(context);
    }
}

const healthCheckController = new HealthCheckController();
export default healthCheckController;
