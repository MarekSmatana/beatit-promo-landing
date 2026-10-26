export const CONTACT_API_URL = import.meta.env?.VITE_CONTACT_API_URL || "https://api.buildit.studio/contact";
export const CONTACT_TOPICS = ["Support", "Subscription", "Account deletion", "Privacy request", "Store review"];

export function createContactPayload(data) {
  const read = (key) => String(data.get(key) ?? "").trim();
  const payload = {
    site: "beatit",
    name: read("name"),
    email: read("email"),
    topic: read("topic") || "Support",
    message: read("message"),
    company: read("company"),
  };
  if (!payload.name || payload.name.length > 100) throw new Error("Enter your name using 1–100 characters.");
  if (payload.email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(payload.email)) {
    throw new Error("Enter a valid email address using at most 150 characters.");
  }
  if (!CONTACT_TOPICS.includes(payload.topic)) throw new Error("Choose a support topic from the list.");
  if (payload.message.length < 10 || payload.message.length > 5000) {
    throw new Error("Enter a message using 10–5,000 characters, excluding spaces at the beginning and end.");
  }
  return payload;
}

export async function sendContactMessage(payload, { fetchImpl = fetch, timeoutMs = 20000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(CONTACT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true) {
      if (response.status === 429) throw new Error("Too many messages. Please wait 10 minutes before trying again, or email us directly.");
      if (response.status === 400 && typeof result?.error === "string") throw new Error(result.error);
      throw new Error("Your message could not be sent. Please try again or email support@buildit.studio directly.");
    }
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Sending took too long. We could not confirm whether your message was sent. Please wait before retrying, or email support@buildit.studio directly.");
    }
    if (error instanceof TypeError) {
      throw new Error("Could not connect. Check your internet connection and try again, or email support@buildit.studio directly.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
