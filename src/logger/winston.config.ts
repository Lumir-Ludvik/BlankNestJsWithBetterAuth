import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";

const { combine, timestamp, errors } = winston.format;

export const winstonConfig: winston.LoggerOptions = {
  format: combine(timestamp(), errors({ stack: true })),
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp(),
        nestWinstonModuleUtilities.format.nestLike("App", {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(
        timestamp(),
        errors({ stack: true }),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: combine(timestamp(), winston.format.json()),
    }),
  ],
};
