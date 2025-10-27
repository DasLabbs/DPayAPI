import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";

class HealthCheckService extends BaseService {
    get = (context: RequestContext) => {
        this.logger.info({
            context,
            message: "Health check service",
        });
        this.handleError(context, new Error("test error"));
        return { hello: "world" };
    };
}

const healthCheckService = new HealthCheckService();
export default healthCheckService;
