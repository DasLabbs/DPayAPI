import { NodeEnv } from "@shared/constant";
import * as dotenv from "dotenv";
import joi from "joi";
import type { StringValue } from "ms";

dotenv.config();

export interface Config {
    port: number;
    nodeEnv: NodeEnv;
    jwt: {
        accessTokenSecretKey: string;
        accessTokenExpiresIn: StringValue;
        refreshTokenSecretKey: string;
        refreshTokenExpiresIn: StringValue;
    };
    privy: {
        appId: string;
        appSecret: string;
    };
    appUrl: string;
    redis: {
        host: string;
        port: number;
        password?: string;
        username?: string;
        db: number;
    };
    mongo: {
        uri: string;
    };
    stripe: {
        secretKey: string;
    };
}

const envSchema = joi.object({
    port: joi.number().default(3000),
    nodeEnv: joi
        .string()
        .valid(NodeEnv.DEV, NodeEnv.STAG, NodeEnv.PROD)
        .default(NodeEnv.DEV),
    jwt: joi.object({
        accessTokenSecretKey: joi.string().required(),
        accessTokenExpiresIn: joi.string().default("1h"),
        refreshTokenSecretKey: joi.string().required(),
        refreshTokenExpiresIn: joi.string().default("7d"),
    }),
    privy: joi.object({
        appId: joi.string().required(),
        appSecret: joi.string().required(),
    }),
    appUrl: joi.string().required(),
    redis: joi.object({
        host: joi.string().default("localhost"),
        port: joi.number().default(6379),
        password: joi.string().optional(),
        username: joi.string().optional(),
        db: joi.number().default(0),
    }),
    mongo: joi.object({
        uri: joi.string().required(),
    }),
    stripe: joi.object({
        secretKey: joi.string().required(),
    }),
});

const initConfig = () => {
    const { error, value: env } = envSchema.validate(
        {
            port: process.env.PORT,
            nodeEnv: process.env.NODE_ENV,
            jwt: {
                accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
                accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
                refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
                refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
            },
            privy: {
                appId: process.env.PRIVY_APP_ID,
                appSecret: process.env.PRIVY_APP_SECRET,
            },
            appUrl: process.env.APP_URL ?? "http://localhost:3000",
            redis: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                password: process.env.REDIS_PASSWORD,
                username: process.env.REDIS_USERNAME,
                db: process.env.REDIS_DB,
            },
            mongo: {
                uri: process.env.MONGO_URI,
            },
            stripe: {
                secretKey: process.env.STRIPE_SECRET,
            },
        },
        {
            abortEarly: false,
            convert: true,
        },
    );

    if (error) {
        throw new Error(`Invalid environment variables: ${error.message}`);
    }
    return env as Config;
};

const config = initConfig();
export default config;
