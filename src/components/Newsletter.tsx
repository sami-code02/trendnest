"use client";

import { useState } from "react";

export default function Newsletter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const email = new FormData(e.currentTarget).get("email");
    // TODO: wire to a server action -> NewsletterSubscriber.create({ data: { email } })
    await new Promise((r) => setTimeout(r, 500));
    void email;
    setStatus("done");
  }

  const isDark = variant === "dark";

  return (
    <div className={isDark ? "text-white" : "rounded-card bg-violet-soft p-8 text-ink"}>
      <h3 className="font-display text-xl font-semibold">Get the best finds in your inbox</h3>
      <p className={`mt-1 text-sm ${isDark ? "text-white/60" : "text-ink/60"}`}>
        Weekly deals and new arrivals. No spam, unsubscribe anytime.
      </p>
      {status === "done" ? (
        <p className="mt-4 text-sm font-medium text-accent">You're subscribed — check your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex max-w-md gap-2">
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none transition focus:border-accent ${
              isDark ? "border-white/20 bg-white/5 text-white placeholder:text-white/40" : "border-black/10 bg-white"
            }`}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Joining…" : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}
