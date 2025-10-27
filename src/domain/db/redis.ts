import config from "@config/index";
import appLogger from "@shared/lib/logger";
import Redis, { RedisOptions } from "ioredis";

class RedisClient {
    private static instance: Redis | null = null;
    private constructor() {}

    public static getInstance(options?: RedisOptions): Redis {
        if (!RedisClient.instance) {
            const defaultOptions: RedisOptions = {
                host: config.redis.host,
                port: config.redis.port,
                password: config.redis.password,
                username: config.redis.username,
                db: config.redis.db,
                retryStrategy: (times: number) => {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
            };

            const redisOptions = { ...defaultOptions, ...options };
            RedisClient.instance = new Redis(redisOptions);

            RedisClient.instance.on("connect", () => {
                appLogger.info("Redis connected successfully");
            });

            RedisClient.instance.on("error", (err: Error) => {
                appLogger.error(err);
            });

            RedisClient.instance.on("close", () => {
                appLogger.info("Redis connection closed");
            });
        }

        return RedisClient.instance;
    }

    public static async disconnect(): Promise<void> {
        if (RedisClient.instance) {
            await RedisClient.instance.quit();
            RedisClient.instance = null;
        }
    }

    public static isConnected(): boolean {
        return (
            RedisClient.instance !== null &&
            RedisClient.instance.status === "ready"
        );
    }
}

const appRedis = RedisClient.getInstance();
export default appRedis;
