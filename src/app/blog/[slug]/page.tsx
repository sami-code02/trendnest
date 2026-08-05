import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug, products } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { images: [post.featuredImage], type: "article" },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();
  const relatedProducts = products.filter((p) => post.relatedProductSlugs.includes(p.slug));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
        {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })} · {post.author}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{post.title}</h1>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-card shadow-soft">
        <Image src={post.featuredImage} alt={post.title} fill priority className="object-cover" />
      </div>

      {/* Table of contents would be auto-generated from MDX headings once real content is wired in */}
      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display">
        <p>{post.content}</p>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-14 border-t border-black/5 pt-10">
          <h2 className="font-display text-lg font-semibold">Mentioned in this article</h2>
          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
