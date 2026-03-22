import { test, expect, devices } from "@playwright/test";

test.use({
  ...devices["Pixel 7"], // sets viewport, userAgent, deviceScaleFactor, isMobile, hasTouch
});
test.describe("Mobile Emulation Suite", () => {
  test("mobile emulation", async ({ page }) => {
    await page.goto("https://www.youtube.com/");
    await page.waitForLoadState();
    await page
      .getByRole("button", { name: /search( youtube)?/i })
      .first()
      .tap();
    await page.getByRole("combobox", { name: "Search YouTube" }).fill("messi");
    await page.getByRole("combobox", { name: "Search YouTube" }).press("Enter");
    await expect(page.locator("h4")).toContainText("Leo Messi", {
      timeout: 10000,
    });
    await page.waitForTimeout(5000);
    // await page.pause();
    await page
      .getByRole("link", { name: "Messi" })
      .locator(".shortsLockupViewModelHostInlineMetadata")
      .first()
      .tap();
    await page.waitForLoadState();
    await page.waitForTimeout(2000);
    await page.locator("#shorts-video div").first().click();
    await page.waitForTimeout(2000);
  });
});
