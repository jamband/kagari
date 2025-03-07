import * as v from "valibot";
import { noteIdParamRequest } from "../request.js";

export const pinNoteParamRequest = v.object({
  id: noteIdParamRequest,
});
