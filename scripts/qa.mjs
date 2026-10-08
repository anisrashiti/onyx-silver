import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const url = process.env.QA_BASE_URL || "http://localhost:3000";
mkdirSync("outputs", { recursive: true });
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await chromium.launch({ headless: true, ...(existsSync(chrome) ? { executablePath: chrome } : existsSync(edge) ? { executablePath: edge } : {}) });
const results = [];
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

async function check(name, test) {
  await test();
  results.push({ name, passed: true });
  console.log(`PASS ${name}`);
}

async function closePanel() {
  await page.getByRole("button", { name: "Close panel", exact: true }).click();
  await page.locator("dialog").waitFor({ state: "hidden" });
}

async function loadPageImages() {
  await page.evaluate(async () => {
    for (const image of document.querySelectorAll("main img, footer img")) image.loading = "eager";
    await Promise.all([...document.querySelectorAll("main img, footer img")].map((image) => image.decode().catch(() => {})));
  });
}

try {
  const response = await page.goto(url, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await loadPageImages();

  await check("1440px visual layout, font loading, and no overflow", async () => {
    const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, font: getComputedStyle(document.body).fontFamily, loaded: [...document.fonts].filter((font) => font.status === "loaded").map((font) => font.family), hero: [...document.querySelectorAll(".hero-panels > div")].map((element) => element.getBoundingClientRect().width), products: [...document.querySelectorAll(".product-track > article")].slice(0, 5).map((element) => element.getBoundingClientRect().right) }));
    assert.ok(layout.scroll <= layout.width, JSON.stringify(layout));
    assert.ok(layout.font.includes("DM Sans") || layout.font.includes("DM_Sans"), JSON.stringify(layout));
    assert.ok(layout.loaded.some((font) => font.includes("DM Sans") || font.includes("DM_Sans")), JSON.stringify(layout));
    assert.ok(Math.abs(layout.hero[0] - layout.hero[1]) < 1);
    assert.ok(layout.products[4] < 1441);
    await page.screenshot({ path: "outputs/desktop-1440.png", fullPage: true });
    await page.screenshot({ path: "outputs/desktop-hero.png" });
  });

  await check("Search, no results, clear search, and focus restoration", async () => {
    const trigger = page.getByRole("button", { name: "Search jewelry", exact: true });
    await trigger.click();
    await page.getByLabel("Search demo products").fill("charm");
    assert.equal(await page.locator("dialog .product-card").count(), 3);
    await page.getByLabel("Search demo products").fill("no-such-piece");
    await page.getByRole("heading", { name: "No pieces found." }).waitFor();
    await page.getByRole("button", { name: "Clear search", exact: true }).click();
    assert.equal(await page.locator("dialog .product-card").count(), 8);
    for (let i = 0; i < 22; i++) {
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.querySelector("dialog").contains(document.activeElement)), true);
    }
    await page.keyboard.press("Escape");
    await page.locator("dialog").waitFor({ state: "hidden" });
    assert.equal(await trigger.evaluate((element) => element === document.activeElement), true);
  });

  await check("Wishlist toggling and persistence after reload", async () => {
    await page.getByRole("button", { name: "Save Charm Bracelet to wishlist", exact: true }).click();
    assert.equal(await page.getByRole("button", { name: "Remove Charm Bracelet from wishlist", exact: true }).getAttribute("aria-pressed"), "true");
    await page.reload({ waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Open wishlist, 1 saved items" }).click();
    assert.equal(await page.locator("dialog .product-card").count(), 1);
    await page.locator("dialog").getByRole("button", { name: "Remove Charm Bracelet from wishlist", exact: true }).click();
    await page.getByRole("heading", { name: "Keep the pieces you love." }).waitFor();
    await closePanel();
  });

  await check("Required variants, quantity updates, distinct variants, totals, and removal", async () => {
    await page.getByRole("button", { name: "Choose options for Charm Bracelet", exact: true }).click();
    assert.equal(await page.getByRole("button", { name: "SELECT A LENGTH" }).isDisabled(), true);
    await page.getByRole("radio", { name: "19 cm", exact: true }).check();
    await page.getByRole("button", { name: "ADD TO DEMO BAG", exact: true }).click();
    assert.equal(await page.getByTestId("bag-total").textContent(), "€129");
    await page.getByRole("button", { name: "Increase quantity of Charm Bracelet 19 cm", exact: true }).click();
    assert.equal(await page.getByTestId("bag-total").textContent(), "€258");
    await closePanel();
    await page.getByRole("button", { name: "Choose options for Charm Bracelet", exact: true }).click();
    await page.getByRole("radio", { name: "17 cm", exact: true }).check();
    await page.getByRole("button", { name: "ADD TO DEMO BAG", exact: true }).click();
    assert.equal(await page.locator("dialog .cart-line").count(), 2);
    assert.equal(await page.getByTestId("bag-total").textContent(), "€387");
    await closePanel();
    await page.getByRole("button", { name: "Add Bow Crystal Drops to demo bag", exact: true }).click();
    assert.equal(await page.getByTestId("bag-total").textContent(), "€472");
    await page.screenshot({ path: "outputs/desktop-bag.png" });
    await page.reload({ waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Open shopping bag, 4 items", exact: true }).click();
    assert.equal(await page.getByTestId("bag-total").textContent(), "€472");
    await page.getByRole("button", { name: "Remove Charm Bracelet 19 cm from bag", exact: true }).click();
    assert.equal(await page.getByTestId("bag-total").textContent(), "€214");
    await page.getByRole("button", { name: "Decrease quantity of Charm Bracelet 17 cm", exact: true }).click();
    assert.equal(await page.getByTestId("bag-total").textContent(), "€85");
    await page.getByRole("button", { name: "Remove Bow Crystal Drops from bag", exact: true }).click();
    await page.getByRole("heading", { name: "Your bag is waiting." }).waitFor();
    await closePanel();
  });

  await check("Carousel keyboard, next/previous controls, and endpoint states", async () => {
    const previous = page.getByRole("button", { name: "Previous products", exact: true });
    const next = page.getByRole("button", { name: "Next products", exact: true });
    assert.equal(await previous.isDisabled(), true);
    await next.click();
    await page.waitForFunction(() => {
      const element = document.querySelector(".product-track");
      return element.scrollLeft >= element.querySelector("article").offsetWidth + parseFloat(getComputedStyle(element).columnGap) - 2;
    });
    await page.locator(".product-track").evaluate((element) => element.focus({ preventScroll: true }));
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(() => document.querySelector(".product-track").scrollLeft > 300);
    for (let i = 0; i < 5; i++) {
      if (await next.isDisabled()) break;
      await next.click();
      await page.waitForTimeout(450);
    }
    assert.equal(await next.isDisabled(), true);
    assert.equal(await previous.isDisabled(), false);
    await previous.click();
    await page.waitForFunction(() => !document.querySelector('[aria-label="Next products"]').disabled);
  });

  await check("Empty categories, pending policies, and transparent language state", async () => {
    await page.locator(".desktop-navigation").getByRole("button", { name: "Rings", exact: true }).click();
    await page.getByRole("heading", { name: "This collection is on its way." }).waitFor();
    await closePanel();
    await page.getByRole("button", { name: "Privacy Policy", exact: true }).click();
    assert.ok((await page.locator("dialog").textContent()).includes("supplied before launch"));
    await closePanel();
    await page.locator(".locale-button").click();
    assert.ok((await page.locator("dialog").textContent()).includes("Coming soon"));
    await closePanel();
  });

  await check("Newsletter invalid email and explicit local-only success", async () => {
    const input = page.getByLabel("Email address", { exact: true });
    await input.fill("invalid");
    await page.getByRole("button", { name: "SUBSCRIBE", exact: true }).click();
    assert.equal(await input.evaluate((element) => element.validity.valid), false);
    await input.fill("prototype@example.com");
    await page.getByRole("button", { name: "SUBSCRIBE", exact: true }).click();
    assert.ok((await page.locator("#newsletter-status").textContent()).includes("does not subscribe, store, or send"));
    assert.equal(await input.inputValue(), "");
  });

  for (const width of [768, 390, 320, 1920]) {
    await check(`${width}px responsive layout and no overflow`, async () => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await loadPageImages();
      const metrics = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert.ok(metrics.scroll <= metrics.width, JSON.stringify(metrics));
      if ([768, 390, 1920].includes(width)) await page.screenshot({ path: `outputs/layout-${width}.png`, fullPage: true });
    });
  }

  await check("Mobile navigation and product browsing", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Open navigation menu", exact: true }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("button", { name: "Earrings", exact: true }).click();
    assert.equal(await page.locator("dialog .product-card").count(), 5);
    await page.screenshot({ path: "outputs/mobile-catalog.png" });
    await closePanel();
    await page.screenshot({ path: "outputs/mobile-hero.png" });
    const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const touchPage = await touch.newPage();
    await touchPage.goto(url, { waitUntil: "networkidle" });
    await touchPage.getByRole("button", { name: "Next products", exact: true }).tap();
    await touchPage.waitForFunction(() => document.querySelector(".product-track").scrollLeft > 150);
    await touchPage.locator(".product-track").scrollIntoViewIfNeeded();
    const bounds = await touchPage.locator(".product-track").boundingBox();
    const initialScroll = await touchPage.locator(".product-track").evaluate((element) => element.scrollLeft);
    const session = await touch.newCDPSession(touchPage);
    const swipeY = Math.min(700, bounds.y + 130);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 320, y: swipeY }] });
    for (const x of [280, 230, 180, 130, 70]) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: swipeY }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await touchPage.waitForFunction((before) => document.querySelector(".product-track").scrollLeft > before + 100, initialScroll);
    await touch.close();
  });

  await check("Reduced motion disables animated transitions", async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle" });
    const animation = await page.locator(".hero-model img").evaluate((element) => getComputedStyle(element).transitionDuration);
    assert.equal(animation, "0s");
    await page.getByRole("button", { name: "Open shopping bag, 0 items", exact: true }).click();
    assert.equal(await page.locator("dialog").evaluate((element) => getComputedStyle(element).animationName), "none");
    await closePanel();
  });

  assert.deepEqual(errors, [], `Browser errors: ${errors.join("\n")}`);
  results.push({ name: "No browser console or runtime errors", passed: true });
  console.log(`All ${results.length} checks passed.`);
} catch (error) {
  results.push({ name: "Failure", passed: false, error: error.message });
  await page.screenshot({ path: "outputs/qa-failure.png", fullPage: true }).catch(() => {});
  console.error(error);
  process.exitCode = 1;
} finally {
  writeFileSync("outputs/qa-results.json", JSON.stringify({ url, results, errors }, null, 2));
  await browser.close();
}
