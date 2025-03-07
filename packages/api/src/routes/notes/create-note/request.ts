import * as v from "valibot";
import { canCreateNote } from "../note.js";

export const createNoteJsonRequest = v.objectAsync({
  title: v.pipeAsync(
    v.string(),
    v.trim(),
    v.nonEmpty(),
    v.checkAsync(canCreateNote, "you cannot create any more notes"),
  ),
  content: v.pipe(v.string(), v.trim(), v.nonEmpty()),
});

export type CreateNoteJsonRequest = v.InferOutput<typeof createNoteJsonRequest>;
