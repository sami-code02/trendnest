import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { categories } from "@/lib/mock-data";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Newsletter variant="dark" />

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Shop</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="transition hover:text-accent">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="transition hover:text-accent">Blog</Link></li>
              <li><Link href="/search" className="transition hover:text-accent">Search</Link></li>
              <li><Link href="/wishlist" className="transition hover:text-accent">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="transition hover:text-accent">About</Link></li>
              <li><Link href="/contact" className="transition hover:text-accent">Contact</Link></li>
              <li><Link href="/affiliate-disclosure" className="transition hover:text-accent">Affiliate Disclosure</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Follow</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition hover:text-accent">Pinterest</a></li>
              <li><a href="#" className="transition hover:text-accent">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            As an affiliate partner, TrendNest earns a commission on qualifying purchases made through
            links on this site. This does not affect the price you pay.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} TrendNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
