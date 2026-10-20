# Final revision

See `PRODUCTION_NOTES_AR.md` for verified changes, setup, and remaining launch configuration. Run `npm run build` then `npm start` for production.

# Machos Bey — Complete Website

Production-oriented Next.js App Router website based on the approved Home direction and the supplied Creative 3D Agency reference video.

## Routes

- `/` — Home
- `/business-setup` — تأسيس الأعمال
- `/digital-services` — الخدمات الرقمية
- `/about` — من نحن
- `/careers` — الوظائف
- `/contact` — تواصل معنا
- `/privacy` — legal placeholder only; approved legal copy was not present in the source content
- `/terms` — legal placeholder only; approved legal copy was not present in the source content

## Stack

Next.js App Router, TypeScript, GSAP + ScrollTrigger, Lenis, Three.js / React Three Fiber.

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

## Forms

The UI and server validation are implemented. For real delivery, set:

- `CONTACT_WEBHOOK_URL`
- `CAREERS_WEBHOOK_URL`

They can point to a CRM, automation endpoint, mail worker, or your backend. The Careers route accepts PDF/DOC/DOCX up to 8 MB.

## Contact configuration

The source content contains conflicting contact details and marks the phone number as incomplete. For that reason the phone is hidden unless you set `NEXT_PUBLIC_SITE_PHONE`.

## Languages

AR / EN / TR / EL. The current implementation keeps language state in the browser and persists the selection in `localStorage`. Arabic uses RTL; the other languages use LTR.

## Reference fidelity

Home preserves the approved layout and motion direction. Internal pages use the second half of the reference video as the compositional source: large black editorial hero, manifesto/story statement, structured card grids, large horizontal value rows, and a wide final CTA with an abstract branded visual. No fake team, testimonials, clients, statistics, or project names were added.
