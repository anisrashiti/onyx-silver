# ONYX SILVER — V2 source, assets, and launch notes

## V2 identity

Kalnia provides the six prominent editorial headings, using regular weight and a restrained variable width setting. Satoshi provides navigation, body copy, buttons, product information, forms, and dialogs. DM Sans is removed. The brand statement keeps a compact composition; the desktop footer no longer contains the four icon benefits. The S&A panel replaces the provisional Exclusive Brand campaign.

The 9 October homepage refinements remove THE ONYX EDIT from the hero and information strip, tighten strip spacing, and keep WHY ONYX SILVER? on a single desktop line at 32 px with a wider heading column. Narrow layouts retain natural wrapping. The statement alone uses Warm Stone `#DED7CC` with charcoal `#242424` text; the existing palette and icy-blue custom hero wordmark are unchanged. Captures are `outputs/homepage-refinements-1440.png` and `outputs/homepage-refinements-390.png`. Lint, TypeScript, production build, and all 17 production browser checks passed. Desktop one-line fit was checked at 1001, 1024, 1440, and 1920 px; the 1440 and 390 px screenshots were visually reviewed.

Customer-facing development labels are removed from the page and dialogs. Missing services report their availability only when used. Checkout creates no order or transaction. Newsletter validation neither sends nor saves an email address, and reports no false subscription success. Mock inventory remains explicitly identified in `lib/products.ts` through `inventoryStatus` and these notes; it is not confirmed stock.

## Font sources

- [Kalnia — Google Fonts](https://fonts.google.com/specimen/Kalnia), SIL Open Font License. Loaded with `next/font/google`, Latin/Latin Extended, and the variable width axis.
- [Satoshi — official Fontshare](https://www.fontshare.com/fonts/satoshi), supplied ITF Free Font License. The local 42,588-byte variable WOFF2 is unchanged. The license permits self-hosting but restricts modification, subsetting, and redistribution through repositories. The binary is ignored by Git; `scripts/prepare-fonts.mjs` downloads a local copy from the official distribution before dev/build.
- License texts are retained in `public/fonts/`. No unofficial font sources or extra weights are used.
- Official TTF Unicode maps were checked for English letters plus Ç, ç, Ë, and ë; both fonts contain all checked glyphs. The reference TTFs are verification artifacts in ignored `outputs/`, not shipped site dependencies.
- Fresh-checkout Satoshi download was tested and matched the supplied official WOFF2 SHA-256: `e739aff9b4d02c264341d6d4872edcda28e79373aeda936f659566a1cd3eb47f`.

## Original assets used

| Website asset | Supplied original |
| --- | --- |
| Hero model | `IMG_2630.PNG` |
| Hero product and chandelier browsing piece | `863504AA-E7F1-4296-BC66-45A318D3985F.PNG` |
| Essentials campaign | `IMG_1926.JPG` |
| Charm bracelet | `3E758D2D-E783-49A7-B81F-0C90331F95C0.PNG` |
| Bow earrings | `202D55C6-8950-4908-AD65-F4D73B648520.PNG` |
| Leaf earrings | `IMG_2654.JPG` |
| Floral earrings | `IMG_2627.JPG` |
| Pearl link earrings | `IMG_2601.JPG` |
| Original logo | `logo.jpg`; original letterforms cropped and background removed for a transparent PNG |

Root originals are unchanged. Photographs retain their aspect ratios.

## Hero wordmark

`public/images/onyx-wordmark.png` uses the exact original ONYX letterforms from `onyx-logo.png`, omitting the smaller SILVER descriptor. The transparent crop is 908 × 283 px. Pixel color is changed to `#C9D9E8` while preserving the original alpha and proportions; no tracing or font substitution is used. `scripts/prepare-wordmark.ps1` reproduces this operation. The original header/footer logo is unchanged.

This raster source cannot supply a true scalable vector at high display densities. An original brand SVG or vector source is needed for a future resolution upgrade. A separate semantic H1 supplies an accessible main heading.

## Clean reference crops

Only photographic regions are extracted. Typography, controls, prices, and forms are HTML.

| Website asset | Reference source | Status |
| --- | --- | --- |
| S&A panel photo | Right photograph of `Split-Screen Silver Jewelry Showcase.png` | Existing suitable photo retained; not verified S&A photography; approved original S&A image needed |
| Boutique | Left photograph of `The Onyx Experience Showcase.png` | Not a verified photo of the actual Onyx boutique; neutral image alt text |
| Gift edit | Center photograph of `The Onyx Experience Showcase.png` | Original photograph needed |
| Wholesale edit | Right photograph of `The Onyx Experience Showcase.png` | Original photograph needed |
| Heart / cherry charms | Third photo in `Luxury Jewelry Picks Carousel.png` | Original cutouts needed |
| Angel charm | Fifth photo in `Luxury Jewelry Picks Carousel.png` | Original cutout needed |

Reference crops have lower resolution than originals. Replace them with approved originals before the real store launch. `scripts/prepare-assets.ps1` records the V1 asset preparation from the supplied attachments; update its attachment paths if regenerating on another machine.

## S&A relationship

The client states that Onyx Silver distributes S&A jewellery. V2 presents the partner brand without claiming exclusive territorial rights. Brand positioning was reviewed against [S&A Design](https://s-a.pl/en/sa-design-en/) and [official collections](https://s-a.pl/en/collections/). No proprietary S&A photographs, partner logo, advertising assets, or invented S&A product records were added. The panel links to official collections through a clearly identified external link.

## Unconfirmed content and unavailable services

- Eight mock names, EUR prices, material descriptions, and bracelet lengths. Material copy describes visible tones rather than claiming unverified metal purity or stone authenticity.
- The 27-year heritage and S&A distribution relationship are client-provided. No claim of being the only silver wholesaler or an exclusive regional S&A distributor is used.
- No verified bestseller ranking or new-arrival feed exists.
- Actual boutique address, hours, map, customer care contact, wholesale enquiry details, and social URLs are absent.
- Official privacy, terms, shipping, returns, payment, care, and size information remain unavailable; no policy is fabricated.
- Account service, checkout, newsletter delivery, and complete Albanian localization are not connected.
- Bag/wishlist use only local storage in the current browser. The existing persistence key is retained so V1 saved selections survive the identity update.
- Metadata remains no-index until the store is ready to launch. No Shopify work, Git push, or deployment is included in this refinement.

## Launch requirements

1. Confirm inventory, names, prices, materials, sizes, business claims, and partner relationship scope.
2. Supply original vector logo and approved campaign, S&A, and real boutique photographs.
3. Supply verified business, contact, legal, social, and wholesale information; review Albanian translations.
4. Connect actual inventory, account, checkout, and newsletter services with appropriate consent.
5. Review production metadata/domains and remove no-index only when the live store is approved.

## Initial V2 visual verification

Verified on 9 October 2026 against the local production server:

- ESLint, strict TypeScript check, and the Next.js 16.4 Webpack production build passed. Homepage is statically prerendered; local server returns HTTP 200.
- All 15 automated Chromium checks passed, with no browser console or runtime errors.
- Kalnia and Satoshi are actually loaded; all six editorial headings use Kalnia, and interface text uses Satoshi. No DM Sans font is loaded or assigned.
- The built Satoshi WOFF2 has the same SHA-256 as the unchanged official source. English and Albanian glyph mapping checks passed for both fonts.
- Desktop Why section: 280 px, versus V1's 479.98 px; inner width 1100 px and column gap 115.2 px. Mobile Why section: 331.45 px, versus V1's 381.23 px.
- No horizontal page overflow at 320, 390, 768, 1440, or 1920 px. Equal desktop hero panels, five visible desktop products, and original wordmark aspect ratio confirmed.
- Search, empty categories, keyboard focus containment/restoration, Escape, wishlist persistence, required options, distinct bag variants, quantity changes, removal, reload persistence, and EUR subtotals passed.
- Carousel controls, keyboard input, endpoint states, native mobile touch swiping, and reduced motion passed.
- Newsletter validates email and reports unavailable without sending a request or claiming success. Checkout reports unavailable without an order/payment request.
- S&A branding and official destination checked. Visible homepage and footer dialogs contain no development-status labels.
- Full-page screenshots at 1440 and 390 px, plus individual section captures, were visually inspected and compared with V1. Headline wrapping, original photography, wordmark scaling, product spacing, experience alignment, and simplified footer were reviewed.

Baseline captures are `outputs/v1-1440.png` and `outputs/v1-390.png`; final captures are `outputs/v2-1440.png` and `outputs/v2-390.png`. Section screenshots and both version metrics are alongside them. `outputs/qa-results.json`, `outputs/v2-typography.json`, and `outputs/font-glyphs.json` contain the verification evidence.

The connected browser preview was unavailable; checks used a separate headless Chrome instance against the local production server. No Lighthouse score was measured. No V2 commit, push, or live deployment was performed.
