import { HUB, SEGMENTS, type EcosystemChild, type EcosystemSegment } from "./ecosystem";

export type ServicePageKind = "hub" | "segment" | "child";

export type ServicePageCatalogEntry = {
  /** شماره ثابت — لینک تصویر را با همین شماره بفرستید */
  number: number;
  kind: ServicePageKind;
  label: string;
  href: string;
  /** نام فایل تصویر در public/images/services/ — مثلاً `1.jpg` */
  imageFile: string;
  segmentId?: string;
  childId?: string;
};

function imageFileName(number: number) {
  const ext = number === 19 ? "png" : "jpg";
  return `${number}.${ext}`;
}

function buildCatalog(): ServicePageCatalogEntry[] {
  const entries: ServicePageCatalogEntry[] = [];
  let n = 1;

  entries.push({
    number: n,
    kind: "hub",
    label: HUB.title,
    href: HUB.href,
    imageFile: imageFileName(n),
  });
  n += 1;

  for (const segment of SEGMENTS) {
    entries.push({
      number: n,
      kind: "segment",
      label: segment.label,
      href: `/services/${segment.id}`,
      imageFile: imageFileName(n),
      segmentId: segment.id,
    });
    n += 1;

    for (const child of segment.children ?? []) {
      entries.push({
        number: n,
        kind: "child",
        label: child.label,
        href: `/services/${segment.id}/${child.id}`,
        imageFile: imageFileName(n),
        segmentId: segment.id,
        childId: child.id,
      });
      n += 1;
    }
  }

  return entries;
}

export const SERVICE_PAGE_CATALOG = buildCatalog();

export const SERVICE_PAGE_COUNT = SERVICE_PAGE_CATALOG.length;

export function getCatalogEntryByNumber(number: number) {
  return SERVICE_PAGE_CATALOG.find((e) => e.number === number);
}

export function getHubCatalogEntry() {
  return SERVICE_PAGE_CATALOG[0];
}

export function getSegmentCatalogEntry(segmentId: string) {
  return SERVICE_PAGE_CATALOG.find(
    (e) => e.kind === "segment" && e.segmentId === segmentId,
  );
}

export function getChildCatalogEntry(segmentId: string, childId: string) {
  return SERVICE_PAGE_CATALOG.find(
    (e) =>
      e.kind === "child" &&
      e.segmentId === segmentId &&
      e.childId === childId,
  );
}

export function catalogEntryForPage(opts: {
  hub?: boolean;
  segment?: EcosystemSegment;
  child?: EcosystemChild;
}): ServicePageCatalogEntry | undefined {
  if (opts.hub) return getHubCatalogEntry();
  if (opts.segment && opts.child) {
    return getChildCatalogEntry(opts.segment.id, opts.child.id);
  }
  if (opts.segment) return getSegmentCatalogEntry(opts.segment.id);
  return undefined;
}

/** متن فهرست شماره‌دار برای ارسال لینک تصویر */
export function formatCatalogForUser(): string {
  return SERVICE_PAGE_CATALOG.map((e) => {
    const kind =
      e.kind === "hub" ? "هاب" : e.kind === "segment" ? "سرویس" : "زیرصفحه";
    return `${e.number}. [${kind}] ${e.label}\n   ${e.href}\n   فایل: ${e.imageFile}`;
  }).join("\n\n");
}
