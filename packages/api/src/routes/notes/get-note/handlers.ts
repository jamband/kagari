import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import validator from "../../../handlers/validator.js";
import { getNote } from "../note.js";
import { getNoteParamRequest } from "./request.js";
import type { GetNoteResponseBody } from "./response.js";

const factory = createFactory();

const getNoteHandlers = factory.createHandlers(
  validator("param", getNoteParamRequest),

  async (c) => {
    const param = c.req.valid("param");
    const note = await getNote(param.id);
    if (!note) throw new HTTPException(404);
    return c.json<GetNoteResponseBody>(note);
  },
);

export default getNoteHandlers;
