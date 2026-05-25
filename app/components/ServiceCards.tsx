import type { CSSProperties } from "react";
import Link from "next/link";
import EcosystemIconBadge from "./EcosystemIconBadge";
import FadeIn from "./FadeIn";
import { SEGMENTS, segmentHref } from "@/lib/ecosystem";
import { getSegmentAccent } from "@/lib/segment-icons";

export default function ServiceCards() {
  return (
    <section className="ecosystem-section relative px-3 py-14 sm:px-4 sm:py-24 lg:py-32">
      <div className="ecosystem-section-glow pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <div className="ecosystem-panel">
          <FadeIn className="ecosystem-header">
            <span className="ecosystem-eyebrow">اکوسیستم یکپارچه پیشران</span>
            <h2 className="ecosystem-title">خدمات اکوسیستم</h2>
            <p className="ecosystem-subtitle">
              حوزه‌های تخصصی در یک پلتفرم واحد — هر بخش با امکانات، زیرساخت و خدمات
              اختصاصی خود
            </p>
          </FadeIn>

          <div className="ecosystem-grid">
            {SEGMENTS.map((service, i) => {
              const accent = getSegmentAccent(service.id);
              return (
                <FadeIn key={service.id} delay={i * 70}>
                  <Link
                    href={segmentHref(service.id)}
                    className="service-card group"
                    style={
                      {
                        "--segment-hue": accent.hue,
                        "--segment-glow": accent.glow,
                      } as CSSProperties
                    }
                  >
                    <div className="service-card-shine" aria-hidden />
                    <EcosystemIconBadge segmentId={service.id} size="lg" />
                    <h3 className="service-card-title">{service.label}</h3>
                    <p className="service-card-desc">{service.description}</p>
                    <span className="service-card-cta">
                      مشاهده خدمات
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="service-card-cta-arrow"
                      >
                        <path
                          d="M10 8H3M10 8L7 5M10 8L7 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
