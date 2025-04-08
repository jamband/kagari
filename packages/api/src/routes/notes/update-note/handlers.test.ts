import "../../../db/refresh.js";

import { eq } from "drizzle-orm";
import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import type { InvalidResponseBody } from "../../../types/response.js";
import type { NoteResponseBody } from "../response.js";
import type { UpdateNoteJsonRequest } from "./request.js";

describe("PUT /notes/:id", () => {
  test("422", async () => {
    const res = await app.request("/notes/1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(422);
  });

  test("404", async () => {
    const res = await app.request("/notes/1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: "t1",
        content: "c1",
      } satisfies UpdateNoteJsonRequest),
    });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });

  test("200", async () => {
    await db.insert(notes).values({ title: "t1", content: "c1" });
    expect(await db.$count(notes)).toBe(1);

    const res = await app.request("/notes/1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: "t2",
        content: "c2",
      } satisfies UpdateNoteJsonRequest),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual<NoteResponseBody>({
      id: 1,
      title: "t2",
      content: "c2",
      pin: false,
    });

    expect(await db.$count(notes)).toBe(1);
    expect(
      await db.select().from(notes).where(eq(notes.id, 1)).get(),
    ).toMatchObject<NoteResponseBody>({
      id: 1,
      title: "t2",
      content: "c2",
      pin: false,
    });
  });
});
