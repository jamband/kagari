import { Hono } from "hono";
import cors from "./handlers/cors.js";
import csrf from "./handlers/csrf.js";
import error from "./handlers/error.js";
import logger from "./handlers/logger.js";
import notFound from "./handlers/not-found.js";
import notesApp from "./routes/notes/app.js";

export const app = new Hono()
  .onError(error)
  .notFound(notFound)
  .use(logger)
  .use(cors)
  .use(csrf)
  .route("/notes", notesApp);
