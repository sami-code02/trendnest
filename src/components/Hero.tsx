"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/mock-data";

const collage = products.slice(0, 5);

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 inline-flex items-center rounded-full bg-violet-soft px-3 py-1 text-xs font-semibold text-violet">
            Saved 40,000+ times on Pinterest this month
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Trending finds,
            <br />
            <span className="text-accent">worth the click.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-ink/60">
            TrendNest curates the pieces actually worth buying — tested picks across fashion,
            beauty, home and tech, with the best price we can find.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/category/womens-fashion"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Shop Trending
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold transition hover:bg-black/5"
            >
              Read the Blog
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
          aria-hidden
        >
          {/* Pinterest-style masonry collage — heights vary intentionally */}
          <div className="row-span-2">
            <Image src={collage[0].images[0]} alt="" width={300} height={420} className="h-full w-full rounded-card object-cover shadow-glass" />
          </div>
          <div className="row-span-1 mt-6">
            <Image src={collage[1].images[0]} alt="" width={300} height={220} className="h-full w-full rounded-card object-cover shadow-glass" />
          </div>
          <div className="row-span-2">
            <Image src={collage[2].images[0]} alt="" width={300} height={420} className="h-full w-full rounded-card object-cover shadow-glass" />
          </div>
          <div className="col-start-2 row-span-1">
            <Image src={collage[3].images[0]} alt="" width={300} height={260} className="h-full w-full rounded-card object-cover shadow-glass" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
