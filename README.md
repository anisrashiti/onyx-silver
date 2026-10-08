# ONYX SILVER — Homepage Prototype V1

A local Next.js App Router storefront prototype, implementing the six approved homepage references with real React components. DM Sans is loaded through `next/font/google`; Tailwind CSS, custom token-based CSS, and Lucide icons form the visual foundation.

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

The production build uses Webpack. A normal Next.js project import can be deployed to Vercel later; no deployment, Shopify connection, order processing, or payments are configured in V1. Initial font compilation needs access to Google Fonts.

## Implemented

- Announcement bar, transparent navigation with a solid scrolled state, split hero, oversized DM Sans campaign lettering, and information strip.
- Icy-blue brand statement, Essentials / Exclusive Brand photography, product carousel, three editorial experience cards, and the complete retail footer.
- Responsive mobile navigation and a stacked hero that keeps both supplied campaign images legible.
- Search and category filtering over eight local demo pieces, including empty-category and no-results states.
- Product details; bracelet length selection; local shopping bag with quantities, removal, and calculated EUR subtotal.
- Wishlist toggles and browser-local persistence of wishlist and bag selections.
- Carousel controls, arrow-key navigation, native touch scrolling, endpoint disabled states, and a minimal progress indicator.
- Native modal dialogs with focus containment, Escape, outside-click dismissal, and focus restoration.
- Newsletter email validation with explicit local-only feedback. The form does not retain or send email addresses.
- A language panel shows English active and Shqip coming soon. Full Albanian localization is pending.
- Customer care, policies, socials, account, wholesale, and boutique controls explain pending verified information instead of suggesting a live service.
- Reduced-motion treatment, semantic headings, image dimensions, responsive image loading, skip link, and visible keyboard focus.

## Structure

- `app/`: server-rendered page, layout, font setup, and design tokens.
- `components/home-sections.tsx`: noninteractive editorial homepage sections.
- `components/header.tsx`, `product-carousel.tsx`, `newsletter.tsx`: focused client interactions.
- `components/store-provider.tsx`: isolated demo state and local persistence.
- `components/store-panels.tsx`: browsing, search, product options, bag, wishlist, and information dialogs.
- `lib/products.ts`: provisional data adapter boundary for future Shopify inventory.
- `lib/content.ts`: navigation and pending-business-information content.
- `public/images/`: supplied originals and clean photographic reference crops.

## Asset and content review

See [PROTOTYPE-NOTES.md](./PROTOTYPE-NOTES.md) for exact provenance, missing originals, provisional content, and visual differences. The source photos at the project root are untouched. No section is implemented as a screenshot. No unrelated stock imagery or generated replacement models are used.

## Browser verification

`npm.cmd run qa` runs the browser checks against a running production server at `http://localhost:3000`. `QA_BASE_URL` can override the address. Playwright Chromium must be installed (`npx.cmd playwright install chromium`) or available in the standard Windows Chrome / Edge installation. Screenshots and the resulting report go to `outputs/`, which is ignored by Git.

The QA script checks responsive overflow, font loading, navigation, search, wishlist persistence, product options, cart calculations, newsletter validation, carousel endpoints, and reduced motion. Run build/typecheck sequentially to avoid competing Next.js output writes.
