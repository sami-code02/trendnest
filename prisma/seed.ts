import { PrismaClient } from "@prisma/client";
import { categories, products, blogPosts } from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories…");
  const categoryIdBySlug: Record<string, string> = {};
  for (const c of categories) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        bannerImage: c.bannerImage,
      },
    });
    categoryIdBySlug[c.slug] = row.id;
  }

  console.log("Seeding products…");
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        categoryId: categoryIdBySlug[p.categorySlug],
        price: p.price,
        oldPrice: p.oldPrice,
        discountPct: p.discountPct,
        description: p.description,
        features: p.features,
        specs: p.specs,
        pros: p.pros,
        cons: p.cons,
        rating: p.rating,
        reviewCount: p.reviewCount,
        pinterestImage: p.pinterestImage,
        pinterestTitle: p.pinterestTitle,
        pinterestDesc: p.pinterestDesc,
        tags: p.tags,
        affiliateNetwork: p.affiliateNetwork,
        affiliateUrl: p.affiliateUrl,
        isFeatured: p.isFeatured ?? false,
        isTrending: p.isTrending ?? false,
        isBestSeller: p.isBestSeller ?? false,
        isNewArrival: p.isNewArrival ?? false,
        isPublished: true,
        images: {
          create: p.images.map((url, position) => ({ url, position })),
        },
        faqs: {
          create: p.faqs.map((f) => ({ question: f.question, answer: f.answer })),
        },
      },
    });
  }

  console.log("Seeding blog posts…");
  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        featuredImage: b.featuredImage,
        tags: b.tags,
        isPublished: true,
        publishedAt: new Date(b.publishedAt),
      },
    });
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
