import { createFactory } from "hono/factory";
import { getNotes } from "../note.js";
import type { GetNotesResponseBody } from "./response.js";

const factory = createFactory();

const getNotesHandlers = factory.createHandlers(async (c) => {
  const notes = await getNotes();
  return c.json<GetNotesResponseBody>({ data: notes });
});

export default getNotesHandlers;
