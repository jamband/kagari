import type { InferRequestType, InferResponseType } from "hono/client";
import type { notesClient, notesIdClient } from "../clients/notes";

type NoteResponse = InferResponseType<typeof notesIdClient.$get>;
export type Note = Exclude<NoteResponse, { message: unknown }>;

export type CreateNoteRequest = InferRequestType<typeof notesClient.$post>;
export type CreateNoteForm = CreateNoteRequest["json"];

export type UpdateNoteRequest = InferRequestType<typeof notesIdClient.$put>;
export type UpdateNoteForm = UpdateNoteRequest["json"] &
  UpdateNoteRequest["param"];

type DeleteNoteRequest = InferRequestType<typeof notesIdClient.$delete>;
export type DeleteNoteForm = DeleteNoteRequest["param"];

export type PinNoteForm = InferRequestType<typeof notesIdClient.pin.$patch>;
export type UnpinNoteForm = InferRequestType<typeof notesIdClient.unpin.$patch>;
