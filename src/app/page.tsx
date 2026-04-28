"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Scissors } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Copy } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Home() {
  const [url, setUrl] = useState("");
  const [fullUrl, setFullUrl] = useState("");
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

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Something went wrong");
        return;
      }

      const data = await res.json();

      setFullUrl(process.env.NEXT_PUBLIC_BASE_URL + "/" + data.shortUrl);
      navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_BASE_URL + "/" + data.shortUrl,
      );
      toast.success("Link created and copied");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(fullUrl);
    toast.success("Copied to clipboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <Toaster position="top-center" />
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
              className="px-6 py-2 h-11 rounded-md bg-white text-black gap-2 disabled:opacity-50 cursor-pointer"
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

        {fullUrl ? (
          <div className="mt-6 space-y-2">
            <p className="text-sm text-neutral-400">Trimm'd link:</p>
            <div
              aria-live="polite"
              className="px-3 py-2 rounded-md bg-neutral-900 text-sm border border-neutral-800 flex items-center justify-between"
            >
              <a
                href={`${fullUrl}`}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:underline truncate"
              >
                {fullUrl}
              </a>
              <div className="flex gap-1">
                <a
                  href={`${fullUrl}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open link"
                  className="p-2 rounded-md hover:bg-neutral-800 transition flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 text-neutral-300" />
                </a>
                <Button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy link"
                  title="Copy link"
                  className="p-2 rounded-md hover:bg-neutral-800 transition cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-neutral-300" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
    </main>
  );
}
