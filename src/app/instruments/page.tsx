import { createClient } from "@supabase/supabase-js";
import { Suspense } from "react";
async function InstrumentsData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
  const { data: instruments } = await supabase.from("instruments").select();
  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}
export default function Instruments() {
  return (
    <Suspense fallback={<div>Loading instruments...</div>}>
      <InstrumentsData />
    </Suspense>
  );
}
