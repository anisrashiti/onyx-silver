# ONYX SILVER — Visual Identity V2

An editorial jewelry storefront built with Next.js App Router, React, TypeScript, Tailwind CSS, and Lucide. V2 refines the existing homepage with Kalnia editorial typography, Satoshi interface typography, and the original ONYX logo letterforms. The supplied photography, component architecture, and shopping interactions are preserved.

## Run locally

Requires Node.js 20.9 or newer. From this directory in PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the Local URL printed by Next.js, normally `http://localhost:3000`.

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd start
```

Build and typecheck should run sequentially. The production build uses Webpack. No live checkout, account service, newsletter endpoint, or deployment is configured.

## Fonts

[Kalnia](https://fonts.google.com/specimen/Kalnia) is loaded through `next/font/google` with Latin and Latin Extended subsets and its variable width axis. [Satoshi](https://www.fontshare.com/fonts/satoshi) is loaded through `next/font/local` from the unchanged official 42.6 KB variable WOFF2, using weights 400–600.

`npm.cmd run fonts` obtains Satoshi directly from the official Fontshare distribution. It runs automatically before development and production builds and skips downloading when the local file exists. First setup requires access to Fontshare; first Kalnia compilation requires Google Fonts. Both fonts are self-hosted by the finished application, so visitors make no font-provider requests.

The Satoshi binary is ignored by Git because the supplied FFL permits self-hosting but restricts redistribution through repositories. A fresh checkout downloads its own official copy; do not force-add the binary or font archives. License texts are in `public/fonts/`. No subsetting or conversion of Satoshi is performed. Next.js copies the local WOFF2 unchanged into its static font output.

Shared font tokens are `--font-editorial` and `--font-interface`. Kalnia is restricted to the prominent homepage headings; body text, navigation, products, forms, and dialogs use Satoshi. The visible hero wordmark is a transparent crop of the supplied logo, rather than a font approximation.

## Implemented

- Original split photographic hero, original logo, lighter left-edge gradient, and oversized icy-blue ONYX wordmark.
- Compact two-column Why Onyx Silver statement with a maximum 1100 px inner width.
- Essentials / S&A Jewellery Design campaigns, with an official S&A collection link in the partner panel.
- Unboxed product carousel and three editorial experience cards with refined type and spacing.
- Simplified five-column desktop footer, useful navigation, and newsletter form.
- Search and category filtering over eight local mock pieces, including empty and no-results states.
- Product details, required bracelet lengths, bag quantities/removal, calculated EUR subtotals, and browser-local bag/wishlist persistence.
- Carousel controls, arrow-key navigation, native touch scrolling, and endpoint states.
- Native modal dialogs with focus containment, Escape, outside-click dismissal, and focus restoration.
- Newsletter email validation and action-time unavailable feedback without sending or saving email addresses.
- Checkout unavailable feedback without creating orders or payments.
- English active and Shqip coming soon; full Albanian localization is not implemented.
- Responsive layouts, reduced motion, semantic headings, skip link, and keyboard focus.

## Structure

- `app/`: page, layout, fonts, and shared visual tokens.
- `components/home-sections.tsx`: editorial sections.
- `components/header.tsx`, `product-carousel.tsx`, `newsletter.tsx`: focused client interactions.
- `components/store-provider.tsx`: local browsing state and persistence.
- `components/store-panels.tsx`: search, catalog, product, bag, wishlist, and information dialogs.
- `lib/products.ts`: mock data and explicit unconfirmed inventory metadata; not a live stock feed.
- `lib/content.ts`: navigation and business information.
- `public/images/`: supplied photography and documented reference crops.
- `scripts/prepare-fonts.mjs`: official Satoshi setup.
- `scripts/prepare-wordmark.ps1`: exact letterform extraction and recoloring.

## Asset and content review

[PROTOTYPE-NOTES.md](./PROTOTYPE-NOTES.md) records asset provenance, unconfirmed inventory, missing source assets, and launch requirements. Root originals are untouched. All headings, product information, links, and forms are real components; no section is a flattened screenshot.

The S&A relationship is client-provided. The retained campaign photograph is not verified S&A photography. The boutique crop is not a verified photograph of the Onyx store. These limitations are recorded in the source documentation, without permanent development labels on the customer interface.

## Browser verification

With a local production server running:

```powershell
npm.cmd run qa
node scripts/capture.mjs
```

`QA_BASE_URL` overrides the default local address. Playwright Chromium or a standard Windows Chrome/Edge installation is required. `capture.mjs` currently uses the standard Windows Chrome path. Captures and reports go to the ignored `outputs/` directory; `CAPTURE_PREFIX` selects a comparison prefix.

Checks cover font loading, editorial font assignment, compact statement proportions, original wordmark aspect ratio, responsive overflow, shopping interactions, S&A branding, interface cleanup, unavailable actions, native touch scrolling, and reduced motion. The official TTF glyph maps were additionally checked for English letters and Albanian Ç, ç, Ë, and ë using `scripts/check-font-glyphs.mjs` with locally downloaded official reference files.
