import "../../../db/refresh.js";

import { eq } from "drizzle-orm";
import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import type { InvalidResponseBody } from "../../../types/response.js";

describe("PATCH /notes/:id/unpin", () => {
  test("404", async () => {
    const res = await app.request("/notes/1/unpin", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });

  test("204", async () => {
    await db.insert(notes).values([
      { id: 1, title: "t1", content: "c1", pin: true },
      { id: 2, title: "t2", content: "c2", pin: true },
      { id: 3, title: "t3", content: "c3", pin: true },
    ]);

    const res = await app.request("/notes/2/unpin", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(204);
    expect(res.body).toBe(null);

    const data = await db.select().from(notes).where(eq(notes.pin, false));
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(2);
  });
});
