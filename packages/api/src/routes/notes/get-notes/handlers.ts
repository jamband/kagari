import { createFactory } from "hono/factory";
import { getNotes } from "../note.js";

const factory = createFactory();

const getNotesHandlers = factory.createHandlers(async (c) => {
  const notes = await getNotes();
  return c.json({ data: notes });
});

export default getNotesHandlers;
