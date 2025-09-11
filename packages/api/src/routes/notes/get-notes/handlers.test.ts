import "../../../db/refresh.js";

import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import type { NotesMaskedFields } from "../note.js";

describe("GET /notes", () => {
  test("200", async () => {
    const now = Date.now();
    await db.insert(notes).values([
      { id: 1, title: "t1", content: "c1", createdAt: now + 1 },
      { id: 2, title: "t2", content: "c2", pin: true, createdAt: now + 2 },
      { id: 3, title: "t3", content: "c3", createdAt: now + 3 },
    ]);

    const res = await app.request("/notes");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual<{ data: Array<NotesMaskedFields> }>({
      data: [
        { id: 2, title: "t2", content: "c2", pin: true },
        { id: 3, title: "t3", content: "c3", pin: false },
        { id: 1, title: "t1", content: "c1", pin: false },
      ],
    });
  });
});
