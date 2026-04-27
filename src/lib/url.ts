export function validateURL(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { ok: false, error: "Invalid protocol" };
    }

    return { ok: true, url: parsed.toString() };
  } catch {
    return { ok: false, error: "Invalid URL format" };
  }
}
