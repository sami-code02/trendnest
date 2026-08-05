import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/lib/types";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/mock-data";
import ProductGallery from "@/components/ProductGallery";
import BuyBar from "@/components/BuyBar";
import ShareRow from "@/components/ShareRow";
import ProductCard from "@/components/ProductCard";
import { formatINR } from "@/lib/utils";
import { Star } from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.pinterestTitle,
      description: product.pinterestDesc,
      images: [product.pinterestImage],
    },
  };
}

function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `/product/${product.slug}`,
    },
  };
}

function faqJsonLd(product: Product) {
  if (!product.faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const faq = faqJsonLd(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{product.brand}</p>
          <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{product.name}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} className="fill-amber-400" /> {product.rating.toFixed(1)}
            </div>
            <span className="text-ink/40">({product.reviewCount} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold">{formatINR(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-base text-ink/40 line-through">{formatINR(product.oldPrice)}</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                  -{product.discountPct}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink/70">{product.description}</p>

          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" /> {f}
              </li>
            ))}
          </ul>

          <BuyBar product={product} />
          <ShareRow product={product} />

          <p className="mt-6 rounded-lg bg-black/5 p-3 text-xs text-ink/60">
            {product.disclosureText ?? "As an affiliate, we earn from qualifying purchases."}
          </p>
        </div>
      </div>

      {/* Specs, pros/cons */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold">Specifications</h2>
          <dl className="mt-3 divide-y divide-black/5 text-sm">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between py-2">
                <dt className="text-ink/50">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-emerald-700">Pros</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {product.pros.map((p) => (
                <li key={p}>+ {p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-rose-700">Cons</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {product.cons.map((c) => (
                <li key={c}>– {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ */}
      {product.faqs.length > 0 && (
        <div className="mt-14 max-w-3xl">
          <h2 className="font-display text-lg font-semibold">Frequently Asked Questions</h2>
          <div className="mt-3 divide-y divide-black/5">
            {product.faqs.map((f) => (
              <details key={f.question} className="group py-3">
                <summary className="cursor-pointer text-sm font-medium marker:content-none">{f.question}</summary>
                <p className="mt-2 text-sm text-ink/60">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold">You might also like</h2>
          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
