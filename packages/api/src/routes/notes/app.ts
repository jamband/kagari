import { Hono } from "hono";
import createNoteHandlers from "./create-note/handlers.js";
import deleteNoteHandlers from "./delete-note/handlers.js";
import getNoteHandlers from "./get-note/handlers.js";
import getNotesHandlers from "./get-notes/handlers.js";
import pinNoteHandlers from "./pin-note/handlers.js";
import unpinNoteHandlers from "./unpin-note/handlers.js";
import updateNoteHandlers from "./update-note/handlers.js";

const notesApp = new Hono()
  .get("/", ...getNotesHandlers)
  .post("/", ...createNoteHandlers)
  .get("/:id", ...getNoteHandlers)
  .put("/:id", ...updateNoteHandlers)
  .delete("/:id", ...deleteNoteHandlers)
  .patch("/:id/pin", ...pinNoteHandlers)
  .patch("/:id/unpin", ...unpinNoteHandlers);

export default notesApp;
