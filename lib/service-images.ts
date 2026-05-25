import {
  getCatalogEntryByNumber,
  type ServicePageCatalogEntry,
} from "./service-page-catalog";

/** مسیر عمومی تصاویر دانلودشده (public/images/services/) */
export const SERVICE_IMAGES_DIR = "/images/services";

export function serviceImagePublicPath(entry: ServicePageCatalogEntry) {
  return `${SERVICE_IMAGES_DIR}/${entry.imageFile}`;
}

export function serviceImagePathByNumber(number: number) {
  const entry = getCatalogEntryByNumber(number);
  if (!entry) return null;
  return serviceImagePublicPath(entry);
}
