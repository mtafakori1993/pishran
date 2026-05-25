# تصاویر صفحات سرویس — فهرست شماره‌دار

لینک هر تصویر را با **همان شماره** در `service-image-urls.json` بگذارید، سپس:

```bash
node scripts/download-service-images.mjs
```

فایل‌ها در `public/images/services/` ذخیره می‌شوند.

---

## فهرست (۲۳ صفحه)

| شماره | نوع | عنوان | آدرس | فایل |
|------:|-----|-------|------|------|
| 1 | هاب | پیشران سفر | `/safar` | `1.jpg` |
| 2 | سرویس | سوپر مارکت | `/services/supermarket` | `2.jpg` |
| 3 | سرویس | تجار | `/services/trade` | `3.jpg` |
| 4 | زیرصفحه | خرید اقساطی | `/services/trade/installment` | `4.jpg` |
| 5 | سرویس | پیشران TV | `/services/tv` | `5.jpg` |
| 6 | زیرصفحه | آموزش و پخش زنده | `/services/tv/education` | `6.jpg` |
| 7 | زیرصفحه | دیرین | `/services/tv/dirin` | `7.jpg` |
| 8 | سرویس | تبلیغات | `/services/ads` | `8.jpg` |
| 9 | سرویس | تاکسی اینترنتی | `/services/taxi` | `9.jpg` |
| 10 | سرویس | رستوران | `/services/restaurant` | `10.jpg` |
| 11 | سرویس | صندوق‌ها | `/services/funds` | `11.jpg` |
| 12 | زیرصفحه | صندوق بازنشستگی | `/services/funds/retirement` | `12.jpg` |
| 13 | زیرصفحه | صندوق تأمین تولید | `/services/funds/provision` | `13.jpg` |
| 14 | سرویس | پیشنهادات | `/services/offers` | `14.jpg` |
| 15 | سرویس | صنعت ساختمان | `/services/construction` | `15.jpg` |
| 16 | زیرصفحه | دکورات | `/services/construction/decor` | `16.jpg` |
| 17 | زیرصفحه | فنی‌ها | `/services/construction/technical` | `17.jpg` |
| 18 | زیرصفحه | بوم و بر | `/services/construction/boombar` | `18.jpg` |
| 19 | زیرصفحه | خرده‌کاری | `/services/construction/handyman` | `19.png` |
| 20 | زیرصفحه | کارخانجات | `/services/construction/factories` | `20.jpg` |
| 21 | زیرصفحه | مصالح | `/services/construction/materials` | `21.jpg` |
| 22 | سرویس | کسب و کار | `/services/business` | `22.jpg` |
| 23 | زیرصفحه | کیف پول | `/services/business/wallet` | `23.jpg` |

---

## نمونه ارسال لینک

```
8: https://example.com/ads-hero.png
9: https://example.com/taxi.jpg
```

یا در JSON:

```json
{
  "8": "https://...",
  "9": "https://..."
}
```
