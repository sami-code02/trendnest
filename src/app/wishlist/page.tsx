"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Your Wishlist</h1>

      {saved.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-card border border-dashed border-black/10 py-20 text-center">
          <Heart size={32} className="text-ink/20" />
          <p className="mt-3 text-sm text-ink/50">Nothing saved yet — tap the heart on any product.</p>
          <Link href="/" className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">
            Start browsing
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
