# Modern House 01 (ផ្ទះទំនើប ០១) — Next.js + Tailwind villa sales site

Bilingual (ខ្មែរ / English) website for selling villas in Cambodia.

## Features
- Villa listings with filters (location, type, bedrooms, budget, available only)
- Villa detail dialog: photo, specs (land W×L, built area, hard title, handover), highlights, floor plans
- Payment plan calculator: $5,000 deposit, down payment %, 0% in-house installments (12–48 months) or bank loan with interest
- Site-visit form that prepares a message to send on Telegram
- Light / dark mode follows the visitor's system setting

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit your content
- `public/logo.png` — logo
- `lib/site.ts` — brand name, Telegram username, phone, office address, hours
- `lib/villas.ts` — villa listings (name, price, land size, beds, status, features…)
- `lib/i18n.ts` — all Khmer / English text
- `app/globals.css` — colours (design tokens) and fonts

## Photos
Villa photos live in `public/villas/`. To add or change one, put the image there and set the villa's `image`
field in `lib/villas.ts` (e.g. `image: "villas/my-villa.jpg"`). Landscape photos around 1400 px wide work best;
cards crop them to 4:3.

## Receiving form submissions
The contact form currently builds a message for the visitor to send on Telegram. To receive leads directly,
add an API route (e.g. `app/api/lead/route.ts`) that forwards the form to a Telegram bot
(`https://api.telegram.org/bot<TOKEN>/sendMessage`) or saves it to a database, and `fetch` it from `submit()` in
`components/VillaSite.tsx`.

## Deploy
Push to GitHub and import the repo on Vercel, or run `npm run build && npm start` on any Node server.

`preview/build.mjs` builds a single-file HTML preview (`node preview/build.mjs`) and is not needed for deployment.
