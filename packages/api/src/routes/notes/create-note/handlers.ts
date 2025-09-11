import { createFactory } from "hono/factory";
import validator from "../../../handlers/validator.js";
import { createNote } from "../note.js";
import { createNoteJsonRequest } from "./request.js";

const factory = createFactory();

const createNoteHandlers = factory.createHandlers(
  validator("json", createNoteJsonRequest),

  async (c) => {
    const json = c.req.valid("json");
    const note = await createNote(json);
    return c.json(note, 201, {
      location: `${c.req.url}/${note.id}`,
    });
  },
);

export default createNoteHandlers;
