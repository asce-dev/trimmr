import { redirect } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Response> {
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

  redirect(data.original_url);
}
