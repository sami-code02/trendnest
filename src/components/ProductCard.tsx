"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatINR, cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";

export default function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const saved = has(product.id);

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-black/5 shadow-soft">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {product.discountPct ? (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
              -{product.discountPct}%
            </span>
          ) : null}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label={saved ? "Remove from wishlist" : "Save product"}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-soft transition hover:scale-105"
          >
            <Heart size={16} className={cn(saved ? "fill-accent text-accent" : "text-ink/70")} />
          </button>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{product.brand}</p>
          <h3 className="line-clamp-1 text-sm font-medium text-ink">{product.name}</h3>
          <div className="flex items-center gap-1.5">
            <span className="font-display text-sm font-semibold">{formatINR(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-xs text-ink/40 line-through">{formatINR(product.oldPrice)}</span>
            ) : null}
          </div>
          <div className="flex items-center gap-1 text-xs text-ink/60">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)} ({product.reviewCount})
          </div>
        </div>
      </Link>
    </div>
  );
}
