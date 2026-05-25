"use client";

import Image from "next/image";
import { useState } from "react";
import {
  catalogEntryForPage,
  type ServicePageCatalogEntry,
} from "@/lib/service-page-catalog";
import { serviceImagePublicPath } from "@/lib/service-images";
import type { EcosystemChild, EcosystemSegment } from "@/lib/ecosystem";

type Props = {
  catalogEntry?: ServicePageCatalogEntry;
  hub?: boolean;
  segment?: EcosystemSegment;
  child?: EcosystemChild;
};

export default function ServicePageHeroImage({
  catalogEntry: entryProp,
  hub,
  segment,
  child,
}: Props) {
  const entry =
    entryProp ?? catalogEntryForPage({ hub, segment, child });
  const [failed, setFailed] = useState(false);

  if (!entry) return null;

  const src = serviceImagePublicPath(entry);
  const showImage = !failed;

  return (
    <div className="service-hero-visual relative mx-auto w-full max-w-md lg:max-w-none lg:mx-0">
      <div
        className="service-hero-visual-frame overflow-hidden rounded-2xl border-2 border-accent/25 bg-surface-muted/40 p-3 shadow-lg sm:rounded-3xl sm:p-4"
        aria-hidden={!showImage}
      >
        {showImage ? (
          <Image
            src={src}
            alt=""
            width={640}
            height={480}
            className="h-auto w-full rounded-xl object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
            priority
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/50 px-6 text-center">
            <span className="text-4xl font-bold text-accent/40">
              {String(entry.number).padStart(2, "0")}
            </span>
            <p className="text-sm text-foreground-muted">
              تصویر شماره {entry.number} هنوز اضافه نشده
            </p>
            <p className="text-xs text-foreground-subtle">{entry.imageFile}</p>
          </div>
        )}
      </div>
    </div>
  );
}
