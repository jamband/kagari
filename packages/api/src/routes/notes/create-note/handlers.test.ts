import "../../../db/refresh.js";

import { eq } from "drizzle-orm";
import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import { APP_URL, WEB_URL } from "../../../env.js";
import type { NoteResponseBody } from "../response.js";
import type { CreateNoteJsonRequest } from "./request.js";

describe("POST /notes", () => {
  test("422", async () => {
    const res = await app.request("/notes", {
      method: "POST",
      headers: { origin: WEB_URL },
    });
    expect(res.status).toBe(422);
  });

  test("201", async () => {
    expect(await db.$count(notes)).toBe(0);

    const res = await app.request("/notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: "t1",
        content: "c1",
      } satisfies CreateNoteJsonRequest),
    });

    expect(res.status).toBe(201);
    expect(res.headers.get("location")).toBe(`${APP_URL}/notes/1`);
    expect(await res.json()).toEqual<NoteResponseBody>({
      id: 1,
      title: "t1",
      content: "c1",
      pin: false,
    });

    expect(await db.$count(notes)).toBe(1);
    const query = db.select().from(notes);
    expect(
      await query.where(eq(notes.id, 1)).get(),
    ).toMatchObject<NoteResponseBody>({
      id: 1,
      title: "t1",
      content: "c1",
      pin: false,
    });
  });
});
