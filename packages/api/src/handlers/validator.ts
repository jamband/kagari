import "../lang/en/validation.js";

import { sValidator } from "@hono/standard-validator";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";

const validator = <
  Target extends keyof ValidationTargets,
  T extends StandardSchemaV1,
>(
  target: Target,
  schema: T,
) =>
  sValidator(target, schema, (result) => {
    if (!result.success) {
      if (target === "param") {
        throw new HTTPException(404);
      }
      if (target === "json") {
        const cause: Record<PropertyKey, string> = {};
        const issues = result.error;

        for (const issue of issues) {
          if (issue.path) {
            const path = issue.path[0];
            cause[typeof path === "object" ? path.key : path] = issue.message;
          }
        }
        throw new HTTPException(422, { cause });
      }
    }
  });

export default validator;
