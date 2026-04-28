"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Scissors } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setLoading(true);

      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      const data = await res.json();

      setShortUrl(data.shortUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <section className="w-full max-w-md space-y-4">
        <header>
          <h1 className="text-3xl font-bold text-center">Trimmr</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="url" className="sr-only">
              Enter URL to shorten
            </FieldLabel>
            <Input
              id="url"
              type="url"
              autoComplete="url"
              name="url"
              className="flex-1 rounded-md p-3 h-11 bg-neutral-900 border border-neutral-700"
              placeholder="Enter URL to shorten..."
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              type="submit"
              className="px-6 py-2 h-11 rounded-md bg-white text-black gap-2 disabled:opacity-50"
              disabled={loading}
            >
              {!loading ? (
                <>
                  <Scissors />
                  Trim
                </>
              ) : (
                <>
                  <Loader2 className="animate-spin" />
                  Trimming...
                </>
              )}
            </Button>
          </Field>
        </form>

        {shortUrl ? (
          <div className="mt-6 space-y-2">
            <p className="text-sm text-neutral-400">Shortened link:</p>
            <div
              aria-live="polite"
              className="p-3 rounded-md bg-neutral-900 border border-neutral-800 text-sm"
            >
              {shortUrl}
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
    </main>
  );
}
