import type { InvalidResponseBody } from "../../../types/response.js";
import type { NoteResponseBody } from "../response.js";

export type GetNoteResponseBody = InvalidResponseBody | NoteResponseBody;
