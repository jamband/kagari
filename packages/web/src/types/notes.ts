import type { InferRequestType, InferResponseType } from "hono/client";
import type { notesClient, notesIdClient } from "../clients/notes";

export type Note = InferResponseType<typeof notesIdClient.$get, 200>;

export type CreateNoteRequest = InferRequestType<typeof notesClient.$post>;
export type UpdateNoteRequest = InferRequestType<typeof notesIdClient.$put>;
export type DeleteNoteRequest = InferRequestType<typeof notesIdClient.$delete>;
export type PinNoteRequest = InferRequestType<typeof notesIdClient.pin.$patch>;
export type UnpinNoteRequest = InferRequestType<
  typeof notesIdClient.unpin.$patch
>;
