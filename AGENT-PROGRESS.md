#AGENT-PROGRESS — گزارش پیشرفت اصلاحات سایت فضل دارو

> هدف: اگر کار در هر لحظه متوقف شد، از همین فایل دقیقاً از نقطه‌ی توقف ادامه دهید.
> پس از هر مرحله این فایل را به‌روزرسانی کنید.

## اطلاعات پروژه

- مسیر: `C:\Users\soheil-ahmadi\Desktop\phazldaru`
- سایت استاتیک هلدارینگ دارو فضل دارو (۴ صفحه: index / about / contact / projects)
- استایل: Tailwind v4.3 — `assets/css/input.css` ← بیلد با `npm run dev` → `assets/css/output.css`
- زبان پیش‌فرض: فارسی (`lang="fa" dir="rtl"`)
- مخزن گیت: با `git init` در این نشست مقداردهی شد (برANCHOR: commit اول شامل کل پروژه + `.gitignore`)

## قراردادهای کار

- هر تغییر = یک کامیت کوتاه و خلاصه به **فارسی**.
- پیام کامیت‌ها با عبارت پایانی استاندارد:
  `Co-Authored-By: Claude Code <noreply@anthropic.com>`
- قبل از کامیت، اگر `output.css` تغییر کرده، نیازی به stage نیست (در `.gitignore` نادیده گرفته شده).

## نقشه‌ی فنی (نکات مهم)

- موج بالای فوتر: یک `<div class="bg-white">` شامل SVG با `viewBox="0 0 1440 56"` و `fill="#0A1F44"` (هم‌رنگ `bg-brand-900`). در هر ۴ صفحه یکسان است.
- مارپیچ DNA: `assets/js/hero-3d.js` روی هر `<canvas data-fd-hero3d>` مقداردهی می‌شود.
  اتریبیوت‌ها: `data-density` (۰..۱)، `data-speed`، `data-hexagons (0|1)`، `data-scale` (新增 — مقیاس گروه هلیکس).
  نیازمند Three.js r128 از CDN است که باید قبل از `hero-3d.js` لود شود.
- جاافتادگی کانواس‌ها:
  - `index.html`: `#fd-hero-canvas`، `data-hexagons="1"`، `opacity-50 lg:opacity-100`
  - `about.html`: `data-density="0.42"`، `data-hexagons="0"`، `opacity-35`
  - `contact.html` / `projects.html`: کانواس نداشتند (فقط `fd-molecule-bg-light`).

## مراحل و وضعیت

### ✅ مرحله ۰ — آماده‌سازی
- [x] ساختن `.gitignore` (node_modules، output.css، فایل‌های سیستم/ادیتور و...)
- [x] `git init` و کامیت اولیه‌ی کل پروژه

### ✅ مرحله ۱ — اصلاح نوار بالای فوتر
مشکل: مسیر SVG موج فقط قسمت بالای موج را پر می‌کرد و بین موج و فوتر یک
نوار سفیدِ خالص (#fff) باقی می‌ماند که از فوتر تیره جدا به نظر می‌رسید.
همچنین `bg-white`ِ کانتینر، سفیدیِ زننده‌ای داشت.

تغییرات:
- [x] اصلاح مسیر SVG در هر ۴ صفحه تا پر کردن از موج تا پایین `viewBox`:
  `M0 0h1440v8c-240 36-480-2-720 20s-480-14-720 16V0z`
  → `M1440 8c-240 36-480-2-720 20s-480-14-720 16v12h1440z`
- [x] جایگزینی سفیدِ زننده با تن نرم‌ترِ پالت سایت:
  - `index.html`: کانتینر موج + بخش «بیانیه پایانی» `bg-white` → `bg-surface` (#f5f8fc)
  - `about.html` / `projects.html`: کانتینر `bg-white` → `bg-surface-alt` (#eef3fa = رنگ انتهای `fd-band`)
  - `contact.html`: کانتینر `bg-white` → `bg-surface` (هم‌رنگ بخش قبلی)

### ✅ مرحله ۲ — برجسته‌سازی مارپیچ DNA در بنر عنوان صفحات
- [x] `hero-3d.js`: افزودتن گزینه‌ی `data-scale` (مقیاس گروه هلیکس در `layout()`)
- [x] `about.html`: `data-density="0.42"→"0.7"`، افزودن `data-scale="1.2"`، `opacity-35`→`opacity-50 lg:opacity-80`
- [x] `contact.html` / `projects.html`: افزودن کانواس DNA + لود Three.js و `hero-3d.js`
  و یکدست‌کردن پس‌زمینه‌ی بنر با `about.html` (برداشتن `fd-molecule-bg-light`)

### ⬜ مرحله ۳ — بازبینی نهایی
- [ ] بررسی بصری صفحات (اندازه/پررنگی هلیکس، نوار فوتر)
- [ ] به‌روزرسانی همین فایل و کامیت نهایی

## نحوه‌ی ادامه از نقطه‌ی توقف

1. `git log --oneline` را ببین تا بدانی کجا ایستاده‌ای.
2. مراحلِ همچنان ⬜ را انجام بده، بعد از هرکدام این فایل را آپدیت و کامیت کن.
3. اگر تغییری در CSS لازم شد: `npm run dev` روشن است و `output.css` خودکار ساخته می‌شود.
