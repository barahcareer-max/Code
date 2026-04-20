# Clearview Glazing — Next.js website + quote calculator

A production-ready marketing site and interactive quote calculator for a UK
double glazing company, built with **Next.js 14 (App Router)**, **TypeScript
(strict)**, **Tailwind CSS**, and **shadcn/ui** primitives.

- Live quote calculator for **Windows**, **Doors** and **Conservatories**
- All pricing lives in a single editable file (`lib/pricing-data.ts`)
- Quote state is encoded in URL search params → every quote is shareable
- PDF download (jsPDF) + email/copy stubs
- Fully responsive, accessible, keyboard-navigable
- Deploy-ready for Vercel

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Scripts:

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production build |
| `npm run lint` | Next/ESLint |
| `npm run typecheck` | `tsc --noEmit` against strict config |

## Project structure

```
app/                        Next.js routes (App Router)
├── layout.tsx              Root layout: fonts, header, footer, toaster
├── page.tsx                Home (hero, USPs, products, testimonials)
├── windows/page.tsx        Windows marketing page
├── doors/page.tsx          Doors marketing page
├── conservatories/page.tsx Conservatories marketing page
├── quote/page.tsx          The quote calculator
├── gallery/page.tsx        Installation gallery grid
├── about/page.tsx          About the company
└── contact/page.tsx        Contact form + details + map placeholder

components/
├── site-header.tsx         Sticky nav with phone number and CTA
├── site-footer.tsx         4-column footer
├── contact-form.tsx        RHF + zod contact form (stub submit)
├── image-placeholder.tsx   Gradient tile that references a /public path
├── ui/                     shadcn/ui primitives (button, card, tabs…)
└── quote/                  Calculator — forms, summary, pricing wiring

hooks/
├── use-toast.ts            shadcn toast hook
└── use-debounced-value.ts  200ms debounce helper

lib/
├── pricing-data.ts         ⭐ Single source of truth for all prices
├── pricing-engine.ts       Pure pricing functions
├── quote-schema.ts         Zod schemas + TypeScript types per tab
├── quote-url.ts            URL encoding/decoding for shareable quotes
├── quote-pdf.ts            jsPDF exporter
└── utils.ts                `cn` + `formatGBP`
```

## Editing pricing

All prices are in **`lib/pricing-data.ts`**. You should only need to touch this
file to change what the calculator quotes. Every value is commented with its
unit so you can edit with confidence:

- `£/m²` — currency per square metre of product area
- `multiplier (×)` — dimensionless factor applied to the running total
- `flat £` — a fixed amount added to the total
- `%` — a percentage of the running total (`0.08` = 8%)

Example: to raise the base uPVC window rate from £350/m² to £380/m²:

```ts
windows: {
  baseRatePerSqm: {
    upvc: 380,   // was 350
    aluminium: 520,
    timber: 680,
  },
  // …
}
```

To change VAT:

```ts
vatRate: 0.20  // 20% — change to 0.05 for reduced rate etc.
```

Changes take effect on the next render (hot-reloaded in dev, rebuilt for prod).

## Adding a new option (e.g. a new frame style)

Say you want to add a new window style called `Flush Casement`. Three steps:

### 1. Extend the data and key type in `lib/pricing-data.ts`

```ts
export type WindowStyleKey =
  | "casement"
  | "flushCasement"  // ← add
  | "sash"
  // …;

styleMultiplier: {
  casement: 1.0,
  flushCasement: 1.1,  // ← price multiplier
  sash: 1.4,
  // …
},

// And in the `labels` block:
labels = {
  windowStyle: {
    casement: "Casement",
    flushCasement: "Flush Casement",   // ← display name
    // …
  },
};
```

### 2. Extend the zod enum in `lib/quote-schema.ts`

```ts
export const windowSchema = z.object({
  style: z.enum(["casement", "flushCasement", "sash", /* … */]),
  // …
});
```

### 3. That's it

The forms iterate `Object.entries(labels.windowStyle)`, so the new option
appears automatically in the dropdown. No form edits required.

The same three-step pattern applies to door types, conservatory styles,
colours, glazing types, etc.

## Architecture notes

- **Live pricing**: inputs feed RHF, which surfaces errors inline
  (`mode: "onChange"`). Form values are watched, debounced 200 ms, and passed
  to pure functions in `lib/pricing-engine.ts` that return `{ lines[], subtotal,
  vat, total }`. The summary card renders these verbatim.
- **URL state**: the orchestrator encodes current tab + all three forms into
  flat prefixed query params (`?tab=windows&w.widthMm=1200&…`). On page load
  these are decoded back into form defaults, so any quote URL is shareable and
  bookmarkable.
- **Accessibility**: labelled inputs via the `Field` helper; `aria-invalid` on
  errored inputs; `role="alert"` error text; `aria-live="polite"` on the total;
  full keyboard nav via Radix primitives; mobile menu with
  `aria-expanded`.
- **No backend (v1)**: the contact form and "Email me" button log to the
  console / show a toast and include a `TODO` comment pointing to where to wire
  up a form service (Resend, Formspree, Postmark…).

## Images

Every image on the site is an `<ImagePlaceholder>` that references a file path
under `/public`, e.g. `/placeholder-windows-hero.jpg`. Drop real images into
`public/` with the same filenames and replace `<ImagePlaceholder>` with
`<Image>` from `next/image`. The grep target is:

```bash
rg placeholder- app components
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Root directory: leave at the project root.
5. Build command: `npm run build` (default).
6. Output directory: `.next` (default).
7. Click **Deploy**.

No environment variables are required for v1. When you wire up a real form
service you'll want to add, for example, `RESEND_API_KEY` under
**Settings → Environment Variables**.

### Alternative one-liner (Vercel CLI)

```bash
npm i -g vercel
vercel
```

## Changelog / next steps

- [ ] Swap `ImagePlaceholder` for real `next/image` assets in `/public`.
- [ ] Connect the contact form to an email service (Resend or similar).
- [ ] Wire the "Email me" button to send a PDF via the same service.
- [ ] Replace the map placeholder on the Contact page with an embedded map
      (Google Maps iframe or Mapbox component).
- [ ] Add a CMS layer (Sanity/Contentlayer) for the gallery and testimonials
      if editorial control is needed.

---

&copy; Clearview Glazing demo scaffold. Free to use / adapt.
