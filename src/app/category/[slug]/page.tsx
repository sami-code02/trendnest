import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { categories, getCategoryBySlug, getProductsByCategory } from "@/lib/mock-data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: { images: [category.bannerImage] },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();
  const productList = getProductsByCategory(category.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: category.name, item: `/category/${category.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <Image src={category.bannerImage} alt={category.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8">
          <nav className="mb-2 text-xs text-white/80">
            <Link href="/">Home</Link> / <span>{category.name}</span>
          </nav>
          <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">{category.name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="max-w-2xl text-sm text-ink/60">{category.description}</p>

        {/* Filters — client-side filtering/sorting can be wired here once products come from Prisma */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <button className="rounded-full border border-black/10 px-4 py-1.5 font-medium transition hover:bg-black/5">Price</button>
          <button className="rounded-full border border-black/10 px-4 py-1.5 font-medium transition hover:bg-black/5">Rating</button>
          <button className="rounded-full border border-black/10 px-4 py-1.5 font-medium transition hover:bg-black/5">Brand</button>
          <button className="ml-auto rounded-full border border-black/10 px-4 py-1.5 font-medium transition hover:bg-black/5">
            Sort: Featured
          </button>
        </div>

        {productList.length ? (
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {productList.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-card border border-dashed border-black/10 py-16 text-center text-ink/50">
            No products in this category yet — check back soon.
          </div>
        )}
      </div>
    </>
  );
}
