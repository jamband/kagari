import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import validator from "../../../handlers/validator.js";
import { pinNote } from "../note.js";
import { pinNoteParamRequest } from "./request.js";

const factory = createFactory();

const pinNoteHandlers = factory.createHandlers(
  validator("param", pinNoteParamRequest),

  async (c) => {
    const param = c.req.valid("param");
    const note = await pinNote(param.id);
    if (!note) throw new HTTPException(404);
    return c.body(null, 204);
  },
);

export default pinNoteHandlers;
