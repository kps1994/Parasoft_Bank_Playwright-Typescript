import { test, expect } from "@playwright/test";

test("min price of watch", async ({ page }) => {
  await page.goto("https://www.amazon.in/");
  await page.waitForLoadState("domcontentloaded");

  // Search for "watch"
  await page.getByPlaceholder("Search Amazon.in").fill("watch");
  await page.keyboard.press("Enter");

  // Wait for search results to load
  await page.waitForSelector("span.a-price-whole");

  // Optionally, scroll to load lazy items (Amazon paginates, so keep it modest)
  await page.waitForTimeout(1000);

  // Get all price texts
  const priceTexts = await page.locator("span.a-price-whole").allInnerTexts();
  console.log("Raw price texts:", priceTexts);
  const prices = priceTexts
    .map((item) => item.trim())
    .map((item) => item.replace(/[^\d]/g, ""))
    .filter(Boolean)
    .map(Number);
  console.log("Extracted prices:", prices);

  const minPrice = Math.min(...prices);
  console.log("Minimum price:", minPrice);
 expect("abcd@j.com").toMatch(/@.+\.com/);

  // (Optional) Just to assert we got something reasonable
  expect(minPrice).toBeGreaterThan(0);
});
