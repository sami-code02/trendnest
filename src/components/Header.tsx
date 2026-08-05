"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Heart, Menu, X } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { useWishlist } from "@/lib/wishlist-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { ids } = useWishlist();

  return (
    <header className="sticky top-0 z-50 glass border-b border-black/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Trend<span className="text-accent">Nest</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/80 md:flex">
          {categories.slice(0, 6).map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="transition hover:text-accent">
              {c.name}
            </Link>
          ))}
          <Link href="/blog" className="transition hover:text-accent">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search products"
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="View wishlist"
            className="relative rounded-full p-2 transition hover:bg-black/5"
          >
            <Heart size={20} />
            {ids.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
                {ids.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 transition hover:bg-black/5 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-paper px-4 py-3 md:hidden">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              {c.name}
            </Link>
          ))}
          <Link href="/blog" className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5" onClick={() => setOpen(false)}>
            Blog
          </Link>
        </nav>
      )}
    </header>
  );
}
