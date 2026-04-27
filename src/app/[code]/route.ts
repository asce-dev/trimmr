import { redirect } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";
import { validateURL } from "@/lib/url";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
): Promise<Response> {
  const { code } = await params;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("links")
    .select()
    .eq("short_url", code)
    .single();

  if (error || !data) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const validation = validateURL(data.original_url);
  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  redirect(data.original_url);
}
