"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [minRating, setMinRating] = useState(0);

  const results = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = category === "all" || p.categorySlug === category;
      const matchesRating = p.rating >= minRating;
      return matchesQuery && matchesCategory && matchesRating;
    });
  }, [query, category, minRating]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative max-w-xl">
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, brands, tags…"
          className="w-full rounded-full border border-black/10 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-accent"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium"
        >
          <option value={0}>Any rating</option>
          <option value={4}>4★ & up</option>
          <option value={4.5}>4.5★ & up</option>
        </select>
      </div>

      <p className="mt-6 text-sm text-ink/50">{results.length} result{results.length === 1 ? "" : "s"}</p>

      {results.length ? (
        <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-card border border-dashed border-black/10 py-16 text-center text-ink/50">
          No products match your search.
        </div>
      )}
    </div>
  );
}
