import "../../db/refresh.js";

import { asc, eq } from "drizzle-orm";
import { describe, expect, test } from "vitest";
import db from "../../db/client.js";
import notes from "../../db/schema/notes.js";
import * as note from "./note.js";

describe("getNotes", () => {
  test("has no data", async () => {
    expect(await db.$count(notes)).toBe(0);
    expect(await note.getNotes()).toEqual([]);
  });

  test("has data", async () => {
    const now = Date.now();
    await db.insert(notes).values([
      { title: "t1", content: "c1", createdAt: now + 1 },
      { title: "t2", content: "c2", pin: true, createdAt: now + 2 },
      { title: "t3", content: "c3", createdAt: now + 3 },
    ]);
    expect(await note.getNotes()).toEqual([
      { id: 2, title: "t2", content: "c2", pin: true },
      { id: 3, title: "t3", content: "c3", pin: false },
      { id: 1, title: "t1", content: "c1", pin: false },
    ]);
  });
});

describe("getNote", () => {
  test("has no data", async () => {
    expect(await db.$count(notes)).toBe(0);
    expect(await note.getNote(1)).toBe(undefined);
  });

  test("has data", async () => {
    await db.insert(notes).values({
      title: "t1",
      content: "c1",
    });
    expect(await note.getNote(1)).toEqual({
      id: 1,
      title: "t1",
      content: "c1",
      pin: false,
    });
  });
});

test("createNote", async () => {
  expect(await db.$count(notes)).toBe(0);

  expect(await note.createNote({ title: "t1", content: "c1" })).toEqual({
    id: 1,
    title: "t1",
    content: "c1",
    pin: false,
  });

  expect(await db.$count(notes)).toBe(1);
  const query = db.select().from(notes);
  expect(await query.where(eq(notes.id, 1)).get()).toMatchObject({
    id: 1,
    title: "t1",
    content: "c1",
    pin: false,
  });
});

describe("updateNote", () => {
  test("has no data", async () => {
    expect(await db.$count(notes)).toBe(0);
    expect(await note.updateNote(1, { title: "t1", content: "c1" })).toBe(
      undefined,
    );
  });

  test("has data", async () => {
    await db.insert(notes).values({ title: "t1", content: "c1" });
    expect(await db.$count(notes)).toBe(1);

    expect(await note.updateNote(1, { title: "t2", content: "c2" })).toEqual({
      id: 1,
      title: "t2",
      content: "c2",
      pin: false,
    });

    expect(await db.$count(notes)).toBe(1);
    const query = db.select().from(notes);
    expect(await query.where(eq(notes.id, 1)).get()).toMatchObject({
      id: 1,
      title: "t2",
      content: "c2",
      pin: false,
    });
  });
});

describe("deleteNote", () => {
  test("has no data", async () => {
    expect(await db.$count(notes)).toBe(0);
    expect(await note.deleteNote(1)).toBe(undefined);
  });

  test("has data", async () => {
    await db.insert(notes).values([
      { id: 1, title: "t1", content: "c1" },
      { id: 2, title: "t2", content: "c2" },
      { id: 3, title: "t3", content: "c3" },
    ]);
    expect(await db.$count(notes)).toBe(3);

    expect(await note.deleteNote(2)).toEqual({
      id: 2,
      title: "t2",
      content: "c2",
      pin: false,
    });
    expect(await db.$count(notes)).toBe(2);

    const query = db.select().from(notes);
    expect(await query.where(eq(notes.id, 1)).get()).not.toBe(undefined);
    expect(await query.where(eq(notes.id, 2)).get()).toBe(undefined);
    expect(await query.where(eq(notes.id, 3)).get()).not.toBe(undefined);
  });
});

describe("pinNote", () => {
  test("has no data", async () => {
    expect(await db.$count(notes)).toBe(0);
    expect(await note.pinNote(1)).toBe(undefined);
  });

  test("has data", async () => {
    await db.insert(notes).values([
      { id: 1, title: "t1", content: "c1", pin: false },
      { id: 2, title: "t2", content: "c2", pin: true },
      { id: 3, title: "t3", content: "c3", pin: false },
    ]);
    expect(await note.pinNote(3)).toEqual({
      id: 3,
      title: "t3",
      content: "c3",
      pin: true,
    });

    const query = db.select().from(notes);
    expect(await query.orderBy(asc(notes.id))).toMatchObject([
      { id: 1, title: "t1", content: "c1", pin: false },
      { id: 2, title: "t2", content: "c2", pin: false },
      { id: 3, title: "t3", content: "c3", pin: true },
    ]);
  });
});

describe("unpinNote", () => {
  test("has no data", async () => {
    expect(await db.$count(notes)).toBe(0);
    expect(await note.unpinNote(1)).toBe(undefined);
  });

  test("has data", async () => {
    await db.insert(notes).values([
      { id: 1, title: "t1", content: "c1", pin: false },
      { id: 2, title: "t2", content: "c2", pin: true },
      { id: 3, title: "t3", content: "c3", pin: false },
    ]);

    expect(await note.unpinNote(2)).toEqual({
      id: 2,
      title: "t2",
      content: "c2",
      pin: false,
    });

    const query = db.select().from(notes);
    expect(await query.orderBy(asc(notes.id))).toMatchObject([
      { id: 1, title: "t1", content: "c1", pin: false },
      { id: 2, title: "t2", content: "c2", pin: false },
      { id: 3, title: "t3", content: "c3", pin: false },
    ]);
  });
});

test("canCreateNote", async () => {
  expect(await db.$count(notes)).toBe(0);
  expect(await note.canCreateNote()).toBe(true);

  await db.insert(notes).values({ title: "t1", content: "c1" });
  expect(await note.canCreateNote()).toBe(true);

  await db.insert(notes).values({ title: "t2", content: "c2" });
  expect(await note.canCreateNote()).toBe(true);

  await db.insert(notes).values({ title: "t3", content: "c3" });
  expect(await note.canCreateNote()).toBe(true);

  await db.insert(notes).values({ title: "t4", content: "c4" });
  expect(await note.canCreateNote()).toBe(false);

  await db.insert(notes).values({ title: "t5", content: "c5" });
  expect(await note.canCreateNote()).toBe(false);
});
