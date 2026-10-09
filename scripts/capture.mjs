import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const prefix = process.env.CAPTURE_PREFIX || "v2";
const url = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
mkdirSync("outputs", { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage();
const metrics = [];
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const image of document.images) image.loading = "eager";
    await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
  });
  metrics.push(await page.evaluate(() => ({ width: innerWidth, height: document.documentElement.scrollHeight, whyHeight: document.querySelector(".brand-statement").getBoundingClientRect().height, bodyFont: getComputedStyle(document.body).fontFamily, headingFont: getComputedStyle(document.querySelector("#why-heading")).fontFamily })));
  await page.screenshot({ path: `outputs/${prefix}-${width}.png`, fullPage: true });
  await page.screenshot({ path: `outputs/${prefix}-hero-${width}.png` });
  for (const section of ["brand-statement", "editorial-split", "product-section", "experience-section", "onyx-world", "footer-main"]) await page.locator(`.${section}`).screenshot({ path: `outputs/${prefix}-${section}${width === 1440 ? "" : `-${width}`}.png` });
}
writeFileSync(`outputs/${prefix}-metrics.json`, JSON.stringify(metrics, null, 2));
await browser.close();
console.log(JSON.stringify(metrics));
