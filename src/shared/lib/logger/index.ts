import config from "@config/index";
import { NodeEnv } from "@shared/constant";
import { createLogger, format, transports } from "winston";

import { RequestContext } from "../context";

const initDevFormat = () => {
    return format.printf(
        ({
            level,
            source,
            message,
            timestamp,
            userId,
            requestId,
            file,
            line,
        }) => {
            let messageString = `${level}: [${timestamp}]\nSource: ${source}\nMessage: ${message}\n`;
            if (userId) {
                messageString += `User ID: ${userId as string}\n`;
            }
            if (requestId) {
                messageString += `Request ID: ${requestId as string}\n`;
            }
            if (file && line) {
                messageString += `File: ${file as string}\n`;
                messageString += `Line: ${line as string}\n`;
            }
            return messageString;
        },
    );
};

const initProdFormat = () => {
    return format.json();
};

const initBaseFormat = () => {
    const formats = [
        format((info) => {
            const { context, level, message, timestamp, source, file, line } =
                info;
            const result: Record<string, unknown> = {
                level,
                source,
                message,
                timestamp,
            };
            if (context) {
                const { jwtPayload, requestId } = context as RequestContext;
                if (jwtPayload) {
                    result.userId = jwtPayload.userId;
                }
                if (requestId) {
                    result.requestId = requestId;
                }
            }
            if (file && line) {
                result.file = file;
                result.line = line;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return result as any;
        })(),
    ];
    return formats;
};

const initErrorStackFormat = () => {
    return [format.errors({ stack: true })];
};

const initLogger = (env: NodeEnv) => {
    const baseFormat = initBaseFormat();
    const errorFormat = initErrorStackFormat();
    const formats = [
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        ...errorFormat,
        ...baseFormat,
    ];

    if (env === NodeEnv.DEV) {
        formats.unshift(format.colorize());
        formats.push(initDevFormat());
    } else {
        formats.push(initProdFormat());
    }

    const logger = createLogger({
        level: env === NodeEnv.DEV ? "debug" : "info",
        transports: [
            new transports.Console({
                format: format.combine(...formats),
            }),
        ],
    });
    return logger.child({
        source: "app",
    });
};

const appLogger = initLogger(config.nodeEnv);
export default appLogger;
