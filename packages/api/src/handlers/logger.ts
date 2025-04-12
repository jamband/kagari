import { logger as honoLogger } from "hono/logger";
import env from "../env.js";

const customLogger = (message: string, ...rest: Array<string>) => {
  if (env.LOG_LEVEL === "debug") {
    console.log(message, ...rest);
  }
};

const logger = honoLogger(customLogger);

export default logger;
