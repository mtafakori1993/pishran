#!/usr/bin/env node
/**
 * دانلود تصاویر سرویس از لینک‌هایی که در service-image-urls.json گذاشته‌اید.
 * شماره کلید JSON = شماره صفحه در SERVICE_PAGE_CATALOG
 *
 * استفاده: node scripts/download-service-images.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const urlsPath = join(root, "service-image-urls.json");
const outDir = join(root, "public", "images", "services");

/** نام فایل‌ها — هم‌تراز با lib/service-page-catalog.ts */
const FILES = {
  1: "1.jpg",
  2: "2.jpg",
  3: "3.jpg",
  4: "4.jpg",
  5: "5.jpg",
  6: "6.jpg",
  7: "7.jpg",
  8: "8.jpg",
  9: "9.jpg",
  10: "10.jpg",
  11: "11.jpg",
  12: "12.jpg",
  13: "13.jpg",
  14: "14.jpg",
  15: "15.jpg",
  16: "16.jpg",
  17: "17.jpg",
  18: "18.jpg",
  19: "19.png",
  20: "20.jpg",
  21: "21.jpg",
  22: "22.jpg",
  23: "23.jpg",
};

const urls = JSON.parse(readFileSync(urlsPath, "utf8"));
mkdirSync(outDir, { recursive: true });

let ok = 0;
let skip = 0;
let fail = 0;

for (const [num, filename] of Object.entries(FILES)) {
  const url = (urls[num] ?? "").trim();
  if (!url) {
    console.log(`⏭  ${num}: خالی — رد شد`);
    skip++;
    continue;
  }

  const dest = join(outDir, filename);
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`✓  ${num}: ${filename} (${buf.length} bytes)`);
    ok++;
  } catch (err) {
    console.error(`✗  ${num}: ${filename} — ${err.message}`);
    fail++;
  }
}

console.log(`\nپایان: ${ok} دانلود، ${skip} خالی، ${fail} خطا`);
console.log(`مسیر: public/images/services/`);
