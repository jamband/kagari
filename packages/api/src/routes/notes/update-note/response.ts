import type {
  InvalidJsonResponseBody,
  InvalidResponseBody,
} from "../../../types/response.js";
import type { NoteResponseBody } from "../response.js";
import type { UpdateNoteJsonRequest } from "./request.js";

export type UpdateNoteInvalidJsonResponseBody =
  InvalidJsonResponseBody<UpdateNoteJsonRequest>;

export type UpdateNoteResponseBody =
  | InvalidResponseBody
  | UpdateNoteInvalidJsonResponseBody
  | NoteResponseBody;
