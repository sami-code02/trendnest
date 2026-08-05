export type AffiliateNetwork = "AMAZON" | "FLIPKART" | "MYNTRA" | "AJIO" | "MEESHO" | "OTHER";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  discountPct?: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  faqs: ProductFaq[];
  rating: number;
  reviewCount: number;
  images: string[];
  pinterestImage: string;
  pinterestTitle: string;
  pinterestDesc: string;
  tags: string[];
  affiliateNetwork: AffiliateNetwork;
  affiliateUrl: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  tags: string[];
  relatedProductSlugs: string[];
  publishedAt: string;
}
