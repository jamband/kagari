import { csrf as honoCsrf } from "hono/csrf";
import { WEB_URL } from "../env.js";

const csrf = honoCsrf({
  origin: WEB_URL,
});

export default csrf;
