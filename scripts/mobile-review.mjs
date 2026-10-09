import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const baseline = process.argv.includes("--baseline");
const prefix = baseline ? "mobile-before" : "mobile-after";
const url = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
mkdirSync("outputs", { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: existsSync(chrome) ? chrome : edge });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
const report = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.addInitScript(() => {
  window.reviewCLS = 0;
  new PerformanceObserver((entries) => {
    for (const entry of entries.getEntries()) if (!entry.hadRecentInput) window.reviewCLS += entry.value;
  }).observe({ type: "layout-shift", buffered: true });
});

async function matchesRestoredBackgroundSeam(beforePath, afterPath) {
  // A fractional-height hero capture includes one row from the next section.
  // Allow only the requested Warm Stone -> icy-blue change in that final row.
  return page.evaluate(async ({ before, after }) => {
    const pixels = async (encoded) => {
      const image = new Image();
      image.src = `data:image/png;base64,${encoded}`;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, image.width, image.height);
    };
    const [first, second] = await Promise.all([pixels(before), pixels(after)]);
    if (first.width !== second.width || first.height !== second.height) return false;
    for (let i = 0; i < first.data.length; i += 4) {
      if ([0, 1, 2, 3].every((channel) => first.data[i + channel] === second.data[i + channel])) continue;
      if (i < (first.height - 1) * first.width * 4) return false;
      if (![222, 215, 204, 255].every((value, channel) => first.data[i + channel] === value)) return false;
      if (![201, 217, 232, 255].every((value, channel) => second.data[i + channel] === value)) return false;
    }
    return true;
  }, { before: readFileSync(beforePath).toString("base64"), after: readFileSync(afterPath).toString("base64") });
}

try {
  for (const width of [320, 375, 390, 430, 700, 701, 768, 1000, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 701 ? 844 : 1000 });
    const response = await page.goto(url, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const image of document.images) image.loading = "eager";
      await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
    });
    const metrics = await page.evaluate(() => {
      const rect = (element) => {
        const box = element.getBoundingClientRect();
        return { x: box.x, y: box.y, width: box.width, height: box.height, right: box.right, bottom: box.bottom };
      };
      const why = document.querySelector(".brand-statement");
      const heading = why.querySelector("h2");
      const range = document.createRange();
      range.selectNodeContents(heading);
      const targets = [".mobile-menu-toggle", ".header-actions button", ".product-track .wishlist-button", ".quick-add", ".brand-statement .text-link", ".footer-link", ".footer-socials .icon-button"];
      return {
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        model: rect(document.querySelector(".hero-model")), jewelry: rect(document.querySelector(".hero-jewelry")),
        wordmark: rect(document.querySelector(".hero-wordmark")), why: rect(why), heading: rect(heading), text: rect(range), headingLines: range.getClientRects().length,
        background: getComputedStyle(why).backgroundColor,
        cls: window.reviewCLS,
        sections: [...document.querySelectorAll("main > section, .onyx-world, .footer-main, .footer-bottom")].map((element) => ({ className: element.className, ...rect(element) })),
        taps: targets.flatMap((selector) => [...document.querySelectorAll(selector)].map((element) => ({ selector, ...rect(element) })).filter((box) => box.width > 0 && box.x >= 0 && box.right <= innerWidth)),
      };
    });
    assert.ok(metrics.documentWidth <= width, JSON.stringify(metrics));
    assert.ok(metrics.wordmark.x >= metrics.model.x && metrics.wordmark.right <= metrics.model.right + 1);
    assert.ok(metrics.wordmark.y >= metrics.model.y && metrics.wordmark.bottom <= metrics.model.bottom + 1);
    assert.ok(Math.abs(metrics.wordmark.width / metrics.wordmark.height - 908 / 283) < .01);
    assert.ok(metrics.text.y >= metrics.why.y && metrics.text.bottom <= metrics.why.bottom);
    assert.ok(metrics.text.x >= metrics.why.x && metrics.text.right <= metrics.why.right + 1);
    if (!baseline) {
      assert.equal(metrics.background, "rgb(201, 217, 232)");
      assert.ok(metrics.cls < .01, `Unexpected loading shift at ${width}px: ${metrics.cls}`);
      if (width <= 430) {
        assert.ok(metrics.jewelry.height <= 330);
        assert.equal(metrics.headingLines, 1);
        assert.ok(metrics.taps.every((box) => box.height >= 44 && box.width >= 44), JSON.stringify(metrics.taps));
      }
      if (width >= 1024) {
        const previous = JSON.parse(readFileSync("outputs/mobile-before-report.json", "utf8")).find((item) => item.width === width);
        assert.deepEqual(metrics.sections, previous.sections, `Desktop section geometry changed at ${width}px`);
        assert.deepEqual(metrics.model, previous.model);
        assert.deepEqual(metrics.jewelry, previous.jewelry);
        assert.deepEqual(metrics.wordmark, previous.wordmark);
        assert.deepEqual(metrics.heading, previous.heading);
      }
    }
    await page.screenshot({ path: `outputs/${prefix}-${width}.png`, fullPage: true });
    if ([320, 375, 390, 430, 701, 768, 1024, 1440].includes(width)) {
      for (const selector of ["hero-section", "brand-statement", "product-section", "experience-section", "footer-main"]) {
        const path = `outputs/${prefix}-${selector}-${width}.png`;
        await page.locator(`.${selector}`).screenshot({ path });
        if (!baseline && width >= 1024 && selector !== "brand-statement") {
          const previousPath = path.replace("mobile-after", "mobile-before");
          const hash = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
          if (hash(path) !== hash(previousPath)) {
            assert.ok(selector === "hero-section" && await matchesRestoredBackgroundSeam(previousPath, path), `Desktop ${selector} pixels changed at ${width}px`);
          }
        }
      }
    }
    await page.locator("#why-heading").evaluate((element) => element.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForFunction(() => document.querySelector(".site-header").classList.contains("is-scrolled"));
    metrics.scroll = await page.evaluate(() => {
      const heading = document.querySelector("#why-heading").getBoundingClientRect();
      const header = document.querySelector(".site-header").getBoundingClientRect();
      return { headingTop: heading.top, headerBottom: header.bottom, headingVisible: heading.top >= header.bottom };
    });
    assert.equal(metrics.scroll.headingVisible, true, JSON.stringify(metrics.scroll));
    if (width <= 430) await page.screenshot({ path: `outputs/${prefix}-heading-scroll-${width}.png` });
    report.push(metrics);
    console.log(`PASS ${width}px: model ${metrics.model.height.toFixed(1)}, jewelry ${metrics.jewelry.height.toFixed(1)}, heading ${metrics.headingLines} line(s), CLS ${metrics.cls}`);
  }
  if (!baseline) for (const width of [320, 430]) {
    const phone = await browser.newPage({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    const settlePanel = () => phone.locator("dialog").evaluate(async (panel) => {
      const images = [...panel.querySelectorAll("img")];
      for (const image of images) image.loading = "eager";
      await Promise.all(images.map((image) => image.decode().catch(() => {})));
      await Promise.all(panel.getAnimations({ subtree: true }).map((animation) => animation.finished.catch(() => {})));
    });
    await phone.goto(url, { waitUntil: "networkidle" });
    await phone.getByRole("button", { name: "Open navigation menu", exact: true }).tap();
    await phone.getByRole("navigation", { name: "Mobile navigation" }).getByRole("button", { name: "Earrings", exact: true }).tap();
    assert.equal(await phone.locator("dialog .product-card").count(), 5);
    const panelFits = () => phone.locator(".panel-body").evaluate((element) => element.scrollWidth <= element.clientWidth);
    assert.equal(await panelFits(), true);
    await settlePanel();
    await phone.screenshot({ path: `outputs/mobile-after-catalog-${width}.png` });
    await phone.getByRole("button", { name: "Close panel", exact: true }).tap();
    await phone.getByRole("button", { name: "Choose options for Charm Bracelet", exact: true }).tap();
    await settlePanel();
    await phone.screenshot({ path: `outputs/mobile-after-options-${width}.png` });
    await phone.getByText("17 cm", { exact: true }).tap();
    await phone.getByRole("button", { name: "ADD TO BAG", exact: true }).tap();
    assert.equal(await phone.getByTestId("bag-total").textContent(), "€129");
    assert.equal(await panelFits(), true);
    const controlsFit = await phone.locator(".cart-line-controls").evaluate((element) => {
      const [quantity, remove] = [...element.children].map((child) => child.getBoundingClientRect());
      return quantity.right <= remove.left && remove.right <= element.getBoundingClientRect().right + 1;
    });
    assert.equal(controlsFit, true);
    await phone.getByRole("button", { name: "Increase quantity of Charm Bracelet 17 cm", exact: true }).tap();
    assert.equal(await phone.getByTestId("bag-total").textContent(), "€258");
    await settlePanel();
    await phone.screenshot({ path: `outputs/mobile-after-bag-${width}.png` });
    await phone.close();
    console.log(`PASS ${width}px touch catalog, required options, bag controls and subtotal`);
  }
  assert.deepEqual(errors, []);
} finally {
  writeFileSync(`outputs/${prefix}-report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
