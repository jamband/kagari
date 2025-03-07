import { hc } from "hono/client";
import type notesApp from "../../../api/src/routes/notes/app";
import { API_URL } from "../constants";

const client = hc<typeof notesApp>(`${API_URL}/notes`);
export const notesClient = client.index;
export const notesIdClient = client[":id"];
