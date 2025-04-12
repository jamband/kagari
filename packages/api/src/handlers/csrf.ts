import { csrf as honoCsrf } from "hono/csrf";
import env from "../env.js";

const csrf = honoCsrf({
  origin: env.WEB_URL,
});

export default csrf;
