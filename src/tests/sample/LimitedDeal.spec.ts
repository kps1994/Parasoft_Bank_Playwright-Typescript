import { test, expect } from "@playwright/test";

test("Limited deal watch", async ({ page }) => {
   await page.addLocatorHandler(page.getByRole('button',{name:'Continue shopping'}), async()=>{
  await page.getByRole('button',{name:'Continue shopping'}).click()
 })
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
  const limitedDeals = await page.locator(
    "//span[normalize-space()='Limited time deal']/ancestor::*[contains(@class,'a-section a-spacing-small')]",
  );
  const limitedDealsName = await limitedDeals
    .locator("//a//h2//span")
    .allInnerTexts();
  console.log("limitedDealsName:", limitedDealsName);
  const limitedDealsPrice = await limitedDeals
    .locator(" //descendant::span[contains(@class,'a-price-whole')]")
    .allInnerTexts();
  const cleanPrices = limitedDealsPrice.map((item) =>
    item.trim().replace(/[^\d]/g, ""),
  );
  console.log("limitedDealsPrice:", cleanPrices);

  expect.soft(limitedDealsName.length).toBe(cleanPrices.length);
  let map = new Map();
  for (let i = 0; i < limitedDealsName.length; i++) {
    map.set(limitedDealsName[i], cleanPrices[i]);
  }
  console.log("Map:", map);
});
