import { createClient } from "@supabase/supabase-js";
import { generateShortCode } from "@/lib/utils";

export async function POST(request: Request) {
  const body: { url: string } = await request.json();
  const url = body.url;

  if (!url) {
    return Response.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const shortUrl = generateShortCode(6);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { error } = await supabase.from("links").insert({
    original_url: url,
    short_url: shortUrl,
  });

  if (error) {
    return Response.json(
      { error: "Failed to create short link" },
      { status: 500 },
    );
  }

  return Response.json({ originalUrl: url, shortUrl: shortUrl });
}
