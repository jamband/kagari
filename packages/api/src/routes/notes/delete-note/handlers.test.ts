import "../../../db/refresh.js";

import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import type { InvalidResponseBody } from "../../../types/response.js";

describe("DELETE /notes/:id", () => {
  test("403", async () => {
    const res = await app.request("/notes/1", {
      method: "DELETE",
    });
    expect(res.status).toBe(403);
  });

  test("404", async () => {
    const res = await app.request("/notes/1", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });

  test("204", async () => {
    await db.insert(notes).values({ title: "t1", content: "c1" });
    expect(await db.$count(notes)).toBe(1);

    const res = await app.request("/notes/1", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(204);
    expect(res.body).toBe(null);

    expect(await db.$count(notes)).toBe(0);
  });
});
