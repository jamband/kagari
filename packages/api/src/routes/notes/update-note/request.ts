import * as v from "valibot";
import { noteIdParamRequest } from "../request.js";

export const updateNoteParamRequest = v.object({
  id: noteIdParamRequest,
});

export const updateNoteJsonRequest = v.object({
  title: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  content: v.pipe(v.string(), v.trim(), v.nonEmpty()),
});

export type UpdateNoteJsonRequest = v.InferOutput<typeof updateNoteJsonRequest>;
