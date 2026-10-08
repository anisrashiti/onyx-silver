# Prototype assets and launch content

## Original assets used

| Website asset | Supplied original |
| --- | --- |
| Hero model | `IMG_2630.PNG` |
| Hero product and chandelier demo piece | `863504AA-E7F1-4296-BC66-45A318D3985F.PNG` |
| Essentials campaign | `IMG_1926.JPG` |
| Charm bracelet | `3E758D2D-E783-49A7-B81F-0C90331F95C0.PNG` |
| Bow earrings | `202D55C6-8950-4908-AD65-F4D73B648520.PNG` |
| Leaf earrings | `IMG_2654.JPG` |
| Floral earrings | `IMG_2627.JPG` |
| Pearl link earrings | `IMG_2601.JPG` |
| Official logo | `logo.jpg`; original letterforms cropped and background removed for a transparent PNG |

Photos are converted to local JPEG assets, maintaining their aspect ratios. The root originals are retained unchanged.

## Clean reference crops

Only photographic regions are extracted; headings, body copy, links, icons, prices, and forms are real HTML.

| Website asset | Reference source | Status |
| --- | --- | --- |
| Exclusive campaign | Right photograph of `Split-Screen Silver Jewelry Showcase.png`, excluding typography | Original photograph needed |
| Boutique | Left photograph of `The Onyx Experience Showcase.png` | Design-reference visual only; explicitly labeled on site |
| Gift edit | Center photograph of `The Onyx Experience Showcase.png` | Original photograph needed |
| Wholesale edit | Right photograph of `The Onyx Experience Showcase.png` | Original photograph needed |
| Heart / cherry charms | Third photographic region in `Luxury Jewelry Picks Carousel.png` | Original product cutouts needed |
| Angel charm | Fifth photographic region in `Luxury Jewelry Picks Carousel.png` | Original product cutout needed |

The boutique crop is **not** a verified photo of the actual store. The editorial arrangements are prototype merchandising, not confirmed stock. Cropped reference images have lower resolution than supplied originals and should be replaced before production.

`scripts/prepare-assets.ps1` records and reproduces the asset preparation from the provided local files. Its paths refer to this task’s original attachment locations; update those when regenerating assets on another machine.

## Provisional content

- Eight demo product names, EUR prices, material descriptions, and bracelet lengths. Descriptions use visual tones rather than unverified metal-purity or gemstone claims.
- The 27-year heritage statement is client-provided and pending final verification. No claim of being the only silver wholesaler is used.
- “Exclusive Brand” is a provisional campaign category; no brand, logo, partnership, or exclusivity contract is invented.
- Best sellers and new arrivals cannot be verified from demo data. Best Sellers explicitly explains this; New In shows a labeled collection preview.
- Actual boutique address, hours, map, contact details, wholesale enquiry destination, and terms are pending.
- Official social URLs, privacy policy, terms, returns, shipping, payment information, jewelry care, and size guide are pending. Linked panels communicate their status; no fabricated policy text or URLs are supplied.
- Account sign-in, real checkout, newsletter delivery, and Albanian translations are pending integration/content review.
- Bag and wishlist persist only in local storage on the current browser. Email validation has no submission endpoint.

## Intentional visual differences

- The authentic supplied logo is used throughout, including the footer, where the reference’s spaced lettering differs from the official file.
- The hero campaign lettering uses DM Sans as requested; the reference’s serif-like custom ONYX lettering cannot be reproduced exactly with that font.
- Original supplied product photos take priority over cutouts in the mockup. Bow earrings, leaf earrings, and the hero’s original crop therefore differ slightly from the screenshot treatment.
- A restrained scrim on the left of the hero maintains contrast for white copy and navigation over the supplied photograph’s lighter background.
- The icy-blue statement keeps the reference composition and uses the brief’s accurate wholesale wording.
- A subtle prototype label accompanies the carousel. The boutique image has an explicit design-reference label.
- Bracelet “Choose Options” replaces the mockup’s unconditional Add control.
- The newsletter includes a working email field and local-only status, in addition to the reference’s subscribe button.
- Mobile layouts stack the hero and photographic edits; the product carousel shows one large piece with the next piece visible. Tablet keeps the editorial hierarchy with adjusted navigation and spacing.

## Before the real store launch

1. Confirm inventory, names, pricing, materials, variants, and heritage copy.
2. Replace reference crops with original campaign photography and the actual store photo.
3. Supply verified contact, store, legal, social, and wholesale details; review Albanian translations.
4. Connect the product adapter to Shopify, implement actual account/checkout flows, and connect newsletter delivery with appropriate consent.
5. Review production domains and metadata; remove prototype no-index instructions only when the live store is approved.

## Verification completed — 8 October 2026

- ESLint: passed with no errors or warnings.
- TypeScript strict check: passed.
- Next.js 16.4 production Webpack build: passed; homepage is statically prerendered.
- Local production server: HTTP 200.
- Fourteen automated Chromium checks: passed, with no browser console or runtime errors.
- Tested responsive overflow at 320, 390, 768, 1440, and 1920 pixels; all passed.
- Confirmed DM Sans is actually loaded, equal desktop hero panels, and five visible desktop products.
- Checked search, clearing, no results, missing categories, keyboard focus containment/restoration, and Escape dismissal.
- Checked wishlist persistence, bracelet length requirements, distinct cart variants, quantity changes, removal, reload persistence, and EUR subtotals.
- Checked carousel buttons, keyboard input, endpoint disabled states, native touch swiping, and reduced motion.
- Checked newsletter validation/local-only messaging and transparent policy/language placeholders.
- Visually inspected final desktop, tablet, and mobile screenshots. Captures are in `outputs/desktop-1440.png`, `outputs/layout-768.png`, and `outputs/layout-390.png`; detailed results are in `outputs/qa-results.json`.
- The connected browser preview was unavailable in this session. Screenshot and interaction verification used a separate headless Chrome instance against the local production server.
- No Lighthouse score was measured. No Git push or live deployment was performed.
