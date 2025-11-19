import config from "@config/index";
import jwtLib from "jsonwebtoken";
import type { StringValue } from "ms";

export type JwtPayload = {
    userId: string;
    roleId: string;
    userAddress: string;
};

export class Jwt {
    constructor(
        private readonly configs: {
            accessTokenSecretKey: string;
            accessTokenExpiresIn: StringValue;
            refreshTokenSecretKey: string;
            refreshTokenExpiresIn: StringValue;
        },
    ) {}

    generateTokens(payload: JwtPayload) {
        const accessToken = jwtLib.sign(
            payload,
            this.configs.accessTokenSecretKey,
            {
                expiresIn: this.configs.accessTokenExpiresIn,
                algorithm: "HS256",
            },
        );
        const refreshToken = jwtLib.sign(
            payload,
            this.configs.refreshTokenSecretKey,
            {
                expiresIn: this.configs.refreshTokenExpiresIn,
                algorithm: "HS256",
            },
        );

        return { accessToken, refreshToken };
    }

    verifyToken(token: string, type: "access" | "refresh") {
        try {
            const result = jwtLib.verify(
                token,
                type === "access"
                    ? this.configs.accessTokenSecretKey
                    : this.configs.refreshTokenSecretKey,
            );
            return result as JwtPayload;
        } catch {
            return null;
        }
    }
}

const jwt = new Jwt(config.jwt);
export default jwt;
