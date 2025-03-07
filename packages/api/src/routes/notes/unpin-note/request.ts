import * as v from "valibot";
import { noteIdParamRequest } from "../request.js";

export const unpinNoteParamRequest = v.object({
  id: noteIdParamRequest,
});
