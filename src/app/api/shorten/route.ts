import { createClient } from "@supabase/supabase-js";

function generateString(length: number) {
  const result = Math.random()
    .toString(36)
    .slice(2, length + 2);
  return result;
}

export async function POST(request: Request) {
  const body: { url: string } = await request.json();
  const url = body.url;
  if (!url) {
    return Response.json({ error: "Missing url" }, { status: 400 });
  }
  const shortUrl = generateString(6);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
  const { error } = await supabase.from("links").insert({
    original_url: url,
    short_url: shortUrl,
  });
  console.log("insert error:", error);

  if (error) {
    return Response.json({ error: "DB insert failed" }, { status: 500 });
  }

  return Response.json({ originalUrl: url, shortUrl: shortUrl });
}
