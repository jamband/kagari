import { logger as honoLogger } from "hono/logger";
import { LOG_LEVEL } from "../env.js";

const customLogger = (message: string, ...rest: Array<string>) => {
  if (LOG_LEVEL === "debug") {
    console.log(message, ...rest);
  }
};

const logger = honoLogger(customLogger);

export default logger;
