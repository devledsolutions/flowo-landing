import assert from "node:assert/strict";
import test from "node:test";
import { GET } from "../../app/api/health/route.ts";

test("landing liveness endpoint returns uncached service health without provider claims", async () => {
  const response = await GET();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), {
    ok: true,
    service: "flowo-landing",
  });
});
