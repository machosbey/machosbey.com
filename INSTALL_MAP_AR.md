# خريطة الملفات والمسارات — Machos Bey

انسخ محتوى المشروع إلى جذر مشروع Next.js الحالي مع الحفاظ على نفس المسارات.

## الصفحات الرئيسية

| الصفحة | الرابط | ملف Route | ملف التنفيذ |
|---|---|---|---|
| الرئيسية | `/` | `app/page.tsx` | `components/sections/HomePage.tsx` |
| تأسيس الأعمال | `/business-setup` | `app/business-setup/page.tsx` | `components/sections/BusinessPage.tsx` |
| الخدمات الرقمية | `/digital-services` | `app/digital-services/page.tsx` | `components/sections/DigitalServicesPage.tsx` |
| من نحن | `/about` | `app/about/page.tsx` | `components/sections/AboutPage.tsx` |
| الوظائف | `/careers` | `app/careers/page.tsx` | `components/sections/CareersPage.tsx` |
| تواصل معنا | `/contact` | `app/contact/page.tsx` | `components/sections/ContactPage.tsx` |

## الصفحات القانونية

المصدر يذكر أسماء الروابط فقط ولا يحتوي نصوصًا قانونية معتمدة، لذلك الصفحتان موجودتان كـplaceholder واضح حتى يتم تزويد النص النهائي:

- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `components/sections/LegalPage.tsx`

## ملفات التصميم المشتركة

- `app/globals.css` — كامل Design System + Home + الصفحات الداخلية + Responsive.
- `components/layout/Navbar.tsx` — الهيدر وروابط الصفحات الحقيقية.
- `components/layout/Footer.tsx` — الفوتر الموحد.
- `components/ui/PageHero.tsx` — Hero الصفحات الداخلية.
- `components/ui/ServiceStory.tsx` — نظام الخدمات المتحرك/pinned.
- `components/ui/EditorialRows.tsx` — الصفوف التحريرية الكبيرة.
- `components/ui/PageCTA.tsx` — CTA الموحد.
- `components/ui/BrandMotif.tsx` — أشكال الهوية المستوحاة من اللوغو.
- `components/three/ParticleField.tsx` — Particle / morph visuals.
- `components/motion/SmoothScroll.tsx` — Lenis + GSAP sync.
- `components/providers/LocaleProvider.tsx` — AR / EN / TR / EL + RTL/LTR.

## النماذج

- `components/forms/ContactForm.tsx`
- `components/forms/CareersForm.tsx`
- `app/api/contact/route.ts`
- `app/api/careers/route.ts`

لجعل الإرسال فعليًا، انسخ `.env.example` إلى `.env.local` واضبط:

```env
CONTACT_WEBHOOK_URL=
CAREERS_WEBHOOK_URL=
```

يمكن أن تكون هذه الروابط Backend خاص بك، CRM، n8n، Make، أو Email Worker.

## بيانات التواصل

- `config/site.ts`
- البريد الافتراضي: `info@abmachos.com` وفق ملف المحتوى.
- الهاتف لا يظهر افتراضيًا لأن المصدر يذكر أن الرقم الحالي تجريبي/غير مكتمل.
- لتفعيله ضع `NEXT_PUBLIC_SITE_PHONE` في `.env.local`.

## اللغات

- `locales/ar.json`
- `locales/en.json`
- `locales/tr.json`
- `locales/el.json`
- `data/i18n.ts`

## اللوغو

ضع الملف في المسار التالي كما هو:

`public/brand/machos-bey-mark.png`

ويوجد أيضًا:

`app/icon.png`

كأيقونة للموقع.

## تشغيل المشروع

```bash
npm install
npm run dev
```

ولفحص الإنتاج:

```bash
npm run lint
npm run build
npm start
```
