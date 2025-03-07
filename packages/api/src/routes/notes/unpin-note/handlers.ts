import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import validator from "../../../handlers/validator.js";
import { unpinNote } from "../note.js";
import { unpinNoteParamRequest } from "./request.js";

const factory = createFactory();

const unpinNoteHandlers = factory.createHandlers(
  validator("param", unpinNoteParamRequest),

  async (c) => {
    const param = c.req.valid("param");
    const note = await unpinNote(param.id);
    if (!note) throw new HTTPException(404);
    return c.body(null, 204);
  },
);

export default unpinNoteHandlers;
