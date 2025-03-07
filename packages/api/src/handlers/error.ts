import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { InvalidResponseBody } from "../types/response.js";

const error = (e: Error, c: Context) => {
  if (e instanceof HTTPException) {
    if (e.status === 400) {
      return c.json<InvalidResponseBody>({ message: e.message }, e.status);
    }
    if (e.status === 403) {
      return c.json<InvalidResponseBody>({ message: "forbidden" }, e.status);
    }
    if (e.status === 404) {
      return c.json<InvalidResponseBody>({ message: "not found" }, e.status);
    }
    if (e.status === 422) {
      return c.json({ message: e.cause }, e.status);
    }
  }
  return c.json<InvalidResponseBody>({ message: e.message }, 500);
};

export default error;
