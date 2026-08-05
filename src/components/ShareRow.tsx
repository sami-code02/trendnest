"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { Product } from "@/lib/types";

export default function ShareRow({ product }: { product: Product }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : `https://trendnest.example.com/product/${product.slug}`;

  const links = {
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(
      product.pinterestImage
    )}&description=${encodeURIComponent(product.pinterestDesc)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${product.name} — ${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(product.name)}`,
  };

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  const btnClass = "rounded-full border border-black/10 px-3 py-2 text-xs font-medium transition hover:bg-black/5";

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <a href={links.pinterest} target="_blank" rel="noopener noreferrer" className={btnClass}>Pinterest</a>
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={btnClass}>WhatsApp</a>
      <a href={links.facebook} target="_blank" rel="noopener noreferrer" className={btnClass}>Facebook</a>
      <a href={links.twitter} target="_blank" rel="noopener noreferrer" className={btnClass}>Twitter</a>
      <button onClick={copyLink} className={`${btnClass} inline-flex items-center gap-1`}>
        {copied ? <Check size={14} /> : <Link2 size={14} />} {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
