import assert from "node:assert/strict";
import test from "node:test";
import { CONTACT_API_URL, CONTACT_TOPICS, createContactPayload, sendContactMessage } from "../src/contact.js";

const data = (overrides = {}) => new Map(Object.entries({ name: "  Test Visitor  ", email: " visitor@example.com ", topic: "Support", message: "  A support request.  ", company: "", ...overrides }));

test("payload trims input and preserves all five support topics", () => {
  for (const topic of CONTACT_TOPICS) {
    assert.deepEqual(createContactPayload(data({ topic })), { site: "beatit", name: "Test Visitor", email: "visitor@example.com", topic, message: "A support request.", company: "" });
  }
});

test("required fields, email and length boundaries are validated after trimming", () => {
  for (const overrides of [{ name: "  " }, { name: "a".repeat(101) }, { email: "bad" }, { email: `${"a".repeat(145)}@ex.co` }, { message: "         short          " }, { message: "x".repeat(5001) }, { topic: "Unknown" }]) {
    assert.throws(() => createContactPayload(data(overrides)));
  }
  assert.equal(createContactPayload(data({ name: "a".repeat(100), message: "x".repeat(5000) })).message.length, 5000);
  assert.equal(createContactPayload(data({ email: `${"a".repeat(144)}@ex.co`, message: "x".repeat(10) })).email.length, 150);
});

test("one JSON request is sent to the API with the honeypot and topic", async () => {
  const payload = createContactPayload(data({ company: "bot" }));
  let calls = 0;
  await sendContactMessage(payload, { fetchImpl: async (url, options) => {
    calls++;
    assert.equal(url, CONTACT_API_URL);
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "application/json");
    assert.deepEqual(JSON.parse(options.body), payload);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ ok: true });
  } });
  assert.equal(calls, 1);
});

test("success requires both HTTP success and an explicit boolean ok", async () => {
  for (const response of [Response.json({ ok: false }), Response.json({ ok: "true" }), Response.json({}), new Response("not JSON"), Response.json({ ok: true }, { status: 502 })]) {
    await assert.rejects(sendContactMessage({}, { fetchImpl: async () => response }), /could not be sent/);
  }
});

test("validation and rate-limit failures remain actionable", async () => {
  await assert.rejects(sendContactMessage({}, { fetchImpl: async () => Response.json({ ok: false, error: "Message contains too many links" }, { status: 400 }) }), /too many links/);
  await assert.rejects(sendContactMessage({}, { fetchImpl: async () => Response.json({ ok: false }, { status: 429 }) }), /wait 10 minutes/);
});

test("network errors and timeouts never retry", async () => {
  await assert.rejects(sendContactMessage({}, { fetchImpl: async () => { throw new TypeError("offline"); } }), /internet connection/);
  let calls = 0;
  await assert.rejects(sendContactMessage({}, {
    timeoutMs: 5,
    fetchImpl: (_url, { signal }) => {
      calls++;
      return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true }));
    },
  }), /could not confirm whether your message was sent/);
  assert.equal(calls, 1);
});
