import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { products, categories, blogPosts } from "@/lib/mock-data";

export default function HomePage() {
  const trending = products.filter((p) => p.isTrending);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const featured = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNewArrival).length ? products.filter((p) => p.isNewArrival) : products.slice(-4);

  return (
    <>
      <Hero />

      <Section title="Trending Now" subtitle="What's getting saved and bought this week" href="/search?sort=trending">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title="Today's Deals" subtitle="Best discounts live right now" href="/search?sort=deals">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {[...products].sort((a, b) => (b.discountPct ?? 0) - (a.discountPct ?? 0)).slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title="Popular Categories" subtitle="Shop by what you're actually looking for">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group relative aspect-square overflow-hidden rounded-card shadow-soft"
            >
              <Image
                src={c.bannerImage}
                alt={c.name}
                fill
                sizes="200px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
              <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">{c.name}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Best Sellers" subtitle="Most bought, most reviewed" href="/search?sort=bestsellers">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title="Editor's Picks" subtitle="Hand-picked by the TrendNest team" href="/search?sort=featured">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title="New Arrivals" subtitle="Just landed" href="/search?sort=new">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title="From the Blog" subtitle="Guides, roundups and honest reviews" href="/blog">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((b) => (
            <Link key={b.id} href={`/blog/${b.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-card shadow-soft">
                <Image src={b.featuredImage} alt={b.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{b.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-ink/60">{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Newsletter />
      </section>
    </>
  );
}
