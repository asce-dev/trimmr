import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <section className="w-full max-w-md space-y-4">
        <header>
          <h1 className="text-3xl font-bold text-center">Trimmr</h1>
        </header>

        <form>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="url" className="sr-only">
              Enter URL to shorten
            </FieldLabel>
            <Input
              id="url"
              type="url"
              autoComplete="url"
              className="flex-1 rounded-md p-3 h-12 bg-neutral-900 border border-neutral-700"
              placeholder="Paste a long URL..."
            />
            <Button
              type="submit"
              className="px-6 py-2 h-12 rounded-md bg-white text-black"
            >
              Trim
            </Button>
          </Field>
        </form>

        <div className="mt-6 space-y-2">
          <p className="text-sm text-neutral-400">
            Shortened link will appear here:
          </p>

          <div
            aria-live="polite"
            className="p-3 rounded-md bg-neutral-900 border border-neutral-800 text-sm"
          >
            trimmr.app/abc123
          </div>
        </div>
      </section>
    </main>
  );
}
