import type { InvalidJsonResponseBody } from "../../../types/response.js";
import type { NoteResponseBody } from "../response.js";
import type { CreateNoteJsonRequest } from "./request.js";

export type CreateNoteInvalidJsonResponseBody =
  InvalidJsonResponseBody<CreateNoteJsonRequest>;

export type CreateNoteResponseBody =
  | CreateNoteInvalidJsonResponseBody
  | NoteResponseBody;
