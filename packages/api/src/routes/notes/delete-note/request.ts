import * as v from "valibot";
import { noteIdParamRequest } from "../request.js";

export const deleteNoteParamRequest = v.object({
  id: noteIdParamRequest,
});
