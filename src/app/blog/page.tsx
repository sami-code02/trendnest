import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Blog — Guides & Honest Reviews",
  description: "Roundups, buying guides and honest reviews from the TrendNest editorial team.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">The TrendNest Blog</h1>
      <p className="mt-2 max-w-xl text-sm text-ink/60">Guides, roundups and honest reviews — no filler.</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-card shadow-soft">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink/40">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold group-hover:text-accent">{post.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-ink/60">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
