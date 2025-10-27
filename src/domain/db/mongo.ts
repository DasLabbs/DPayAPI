import config from "@config/index";
import appLogger from "@shared/lib/logger";
import mongoose from "mongoose";

export const initializeMongo = () => {
    const logger = appLogger.child({
        context: "Mongo",
    });

    mongoose.connect(config.mongo.uri, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
    });

    mongoose.connection.on("connected", () => {
        logger.info("Mongo connected successfully");
    });

    mongoose.connection.on("error", () => {
        logger.info("Mongo connected failed");
    });
};

initializeMongo();
