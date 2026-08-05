"use client";

import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useWishlist } from "@/lib/wishlist-context";

export default function BuyBar({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const saved = has(product.id);

  function handleBuyClick() {
    // TODO: fire a server action to write AffiliateClick { productId, utmSource: 'site', ... }
    // before navigating, e.g. navigator.sendBeacon('/api/track-click', ...)
  }

  return (
    <div className="mt-6 flex gap-3">
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        onClick={handleBuyClick}
        className="flex-1 rounded-full bg-accent px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
      >
        Buy Now
      </a>
      <button
        onClick={() => toggle(product.id)}
        aria-label={saved ? "Remove from wishlist" : "Save product"}
        className="rounded-full border border-black/10 px-5 py-3.5 transition hover:bg-black/5"
      >
        <Heart size={18} className={saved ? "fill-accent text-accent" : ""} />
      </button>
    </div>
  );
}
