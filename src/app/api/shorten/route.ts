import { getSupabaseClient } from "@/lib/supabase";
import { generateShortCode } from "@/lib/utils";

type RequestBody = {
  url: string;
};

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const url = body.url;

  if (!url) {
    return Response.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL format" }, { status: 400 });
  }

  let shortUrl = "";
  let attempts = 0;
  const MAX_ATTEMPTS = 5;
  const supabase = getSupabaseClient();

  while (attempts < MAX_ATTEMPTS) {
    shortUrl = generateShortCode(6);

    const { error } = await supabase.from("links").insert({
      original_url: url,
      short_url: shortUrl,
    });

    if (!error) {
      break;
    }

    if (error.code !== "23505") {
      return Response.json(
        { error: "Failed to create short link" },
        { status: 500 },
      );
    }

    attempts++;
  }

  if (attempts >= MAX_ATTEMPTS) {
    return Response.json({ error: "Too many collisions" }, { status: 500 });
  }

  return Response.json({ originalUrl: url, shortUrl: shortUrl });
}
