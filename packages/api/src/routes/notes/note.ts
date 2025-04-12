import { desc, eq } from "drizzle-orm";
import type { SQLiteColumn } from "drizzle-orm/sqlite-core";
import db from "../../db/client.js";
import notes from "../../db/schema/notes.js";
import env from "../../env.js";

type NoteSelect = typeof notes.$inferSelect;
type NoteInsert = typeof notes.$inferInsert;

type NoteId = NoteSelect["id"];

export type NotesMaskedFields = Pick<
  NoteSelect,
  "id" | "title" | "content" | "pin"
>;

type CreateNoteData = Pick<NoteInsert, "title" | "content">;
type UpdateNoteData = Pick<NoteInsert, "title" | "content">;

const notesMaskedFields = {
  id: notes.id,
  title: notes.title,
  content: notes.content,
  pin: notes.pin,
} satisfies Record<keyof NotesMaskedFields, SQLiteColumn>;

export async function getNotes() {
  return await db
    .select(notesMaskedFields)
    .from(notes)
    .orderBy(desc(notes.pin), desc(notes.createdAt));
}

export async function getNote(id: NoteId) {
  return await db
    .select(notesMaskedFields)
    .from(notes)
    .where(eq(notes.id, id))
    .limit(1)
    .get();
}

export async function createNote(data: CreateNoteData) {
  return await db.insert(notes).values(data).returning(notesMaskedFields).get();
}

export async function updateNote(id: NoteId, data: UpdateNoteData) {
  return await db
    .update(notes)
    .set(data)
    .where(eq(notes.id, id))
    .returning(notesMaskedFields)
    .get();
}

export async function deleteNote(id: NoteId) {
  return await db
    .delete(notes)
    .where(eq(notes.id, id))
    .returning(notesMaskedFields)
    .get();
}

export async function pinNote(id: NoteId) {
  return await db.transaction(async (transaction) => {
    await transaction.update(notes).set({ pin: false });
    return await transaction
      .update(notes)
      .set({ pin: true })
      .where(eq(notes.id, id))
      .returning(notesMaskedFields)
      .get();
  });
}

export async function unpinNote(id: NoteId) {
  return await db
    .update(notes)
    .set({ pin: false })
    .where(eq(notes.id, id))
    .returning(notesMaskedFields)
    .get();
}

export async function canCreateNote() {
  return env.NOTE_RECORD_LIMIT >= (await db.$count(notes));
}
