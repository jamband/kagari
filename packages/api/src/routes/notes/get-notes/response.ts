import type { NoteResponseBody } from "../response.js";

export type GetNotesValidResponseBody = {
  data: Array<NoteResponseBody>;
};

export type GetNotesResponseBody = GetNotesValidResponseBody;
