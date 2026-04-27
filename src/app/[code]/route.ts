import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
): Promise<Response> {
  const { code } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
  const { data, error } = await supabase
    .from("links")
    .select()
    .eq("short_url", code)
    .single();

  console.log("error:", error);
  if (error || !data) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  redirect(data.original_url);
}
