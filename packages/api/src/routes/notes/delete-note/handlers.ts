import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import validator from "../../../handlers/validator.js";
import { deleteNote, getNote } from "../note.js";
import { deleteNoteParamRequest } from "./request.js";

const factory = createFactory();

const deleteNoteHandlers = factory.createHandlers(
  validator("param", deleteNoteParamRequest),

  async (c) => {
    const param = c.req.valid("param");
    const note = await getNote(param.id);
    if (!note) throw new HTTPException(404);
    await deleteNote(note.id);
    return c.body(null, 204);
  },
);

export default deleteNoteHandlers;
