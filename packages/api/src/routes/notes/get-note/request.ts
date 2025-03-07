import * as v from "valibot";
import { noteIdParamRequest } from "../request.js";

export const getNoteParamRequest = v.object({
  id: noteIdParamRequest,
});
