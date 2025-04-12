import { cors as honoCors } from "hono/cors";
import env from "../env.js";

const cors = honoCors({
  origin: env.WEB_URL,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Accept", "Content-Type"],
  exposeHeaders: [],
  // credentials: true,
  maxAge: 0,
});

export default cors;
