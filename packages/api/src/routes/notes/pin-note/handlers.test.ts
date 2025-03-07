import "../../../db/refresh.js";

import { eq } from "drizzle-orm";
import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import { WEB_URL } from "../../../env.js";
import type { InvalidResponseBody } from "../../../types/response.js";

describe("PATCH /notes/:id/pin", () => {
  test("404", async () => {
    const res = await app.request("/notes/1/pin", {
      method: "PATCH",
      headers: { origin: WEB_URL },
    });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });

  test("204", async () => {
    await db.insert(notes).values([
      { id: 1, title: "t1", content: "c1", pin: false },
      { id: 2, title: "t2", content: "c2", pin: true },
      { id: 3, title: "t3", content: "c3", pin: false },
    ]);

    const res = await app.request("/notes/3/pin", {
      method: "PATCH",
      headers: { origin: WEB_URL },
    });
    expect(res.status).toBe(204);
    expect(res.body).toBe(null);

    const data = await db.select().from(notes).where(eq(notes.pin, true));
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(3);
  });
});
