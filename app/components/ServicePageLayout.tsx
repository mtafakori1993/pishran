import Link from "next/link";
import Navbar from "./Navbar";
import ServicePageHeroImage from "./ServicePageHeroImage";
import ThemeProvider from "./ThemeProvider";
import {
  HUB,
  SEGMENTS,
  childHref,
  segmentHref,
  segmentWheelLabel,
  childFlyoutLabel,
  type EcosystemChild,
  type EcosystemSegment,
} from "@/lib/ecosystem";
import {
  catalogEntryForPage,
  type ServicePageCatalogEntry,
} from "@/lib/service-page-catalog";

type ServicePageLayoutProps = {
  title: string;
  description: string;
  paragraphs?: readonly string[];
  breadcrumb?: { label: string; href: string }[];
  segment?: EcosystemSegment;
  child?: EcosystemChild;
  childrenLinks?: EcosystemChild[];
  /** فهرست همه بخش‌های چرخ — برای صفحه پیشران سفر */
  showEcosystemIndex?: boolean;
  /** صفحه هاب پیشران سفر */
  hub?: boolean;
  /** ورودی فهرست تصویر (اختیاری؛ در غیر این صورت از segment/child/hub استخراج می‌شود) */
  catalogEntry?: ServicePageCatalogEntry;
};

export default function ServicePageLayout({
  title,
  description,
  paragraphs,
  breadcrumb = [],
  segment,
  child,
  childrenLinks,
  showEcosystemIndex = false,
  hub = false,
  catalogEntry: catalogEntryProp,
}: ServicePageLayoutProps) {
  const links = childrenLinks ?? segment?.children;
  const catalogEntry =
    catalogEntryProp ?? catalogEntryForPage({ hub, segment, child });

  return (
    <ThemeProvider>
      <div className="flex min-h-full flex-1 flex-col bg-background">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:py-14">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              خانه
            </Link>
            {breadcrumb.map((item) => (
              <span key={item.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <section className="mb-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
       
              <h1 className="text-display text-gradient mb-3">{title}</h1>
              <p className="text-subtitle text-lg leading-relaxed">{description}</p>
            </div>
            <div className="order-1 lg:order-2">
              <ServicePageHeroImage
                catalogEntry={catalogEntry}
                hub={hub}
                segment={segment}
                child={child}
              />
            </div>
          </section>

          {paragraphs && paragraphs.length > 0 && (
            <div className="glass-card mb-8 space-y-5 rounded-2xl p-5 sm:p-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-body leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {child && segment && (
            <p className="text-subtitle mb-8 rounded-2xl border border-border bg-surface-muted/50 p-4">
              زیرمجموعه{" "}
              <Link href={segmentHref(segment.id)} className="font-bold text-accent hover:underline">
                {segment.label}
              </Link>
            </p>
          )}

          {showEcosystemIndex && (
            <section className="mt-10">
              <h2 className="text-heading mb-4">بخش‌های اکوسیستم</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {SEGMENTS.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={segmentHref(item.id)}
                      className="glass-card block rounded-xl px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                    >
                      {segmentWheelLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {links && links.length > 0 && (
            <section className="mt-10">
              <h2 className="text-heading mb-4">زیرخدمات</h2>
              <ul className="flex flex-col gap-3">
                {links.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={
                        segment
                          ? childHref(segment.id, item.id)
                          : "#"
                      }
                      className="glass-card block rounded-xl px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                    >
                      {childFlyoutLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              بازگشت به خانه
            </Link>
            <Link
              href={HUB.href}
              className="btn-glow-primary rounded-xl px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              {HUB.title}
            </Link>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
