import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import validator from "../../../handlers/validator.js";
import { getNote, updateNote } from "../note.js";
import { updateNoteJsonRequest, updateNoteParamRequest } from "./request.js";

const factory = createFactory();

const updateNoteHandlers = factory.createHandlers(
  validator("param", updateNoteParamRequest),
  validator("json", updateNoteJsonRequest),

  async (c) => {
    const param = c.req.valid("param");
    const json = c.req.valid("json");
    const note = await getNote(param.id);
    if (!note) throw new HTTPException(404);
    return c.json(await updateNote(note.id, json));
  },
);

export default updateNoteHandlers;
