import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Section({
  title,
  subtitle,
  href,
  children,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-ink/60">{subtitle}</p> : null}
        </div>
        {href ? (
          <Link href={href} className="hidden items-center gap-1 text-sm font-medium text-accent sm:flex">
            View all <ArrowRight size={14} />
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
