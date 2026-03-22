import { Page } from "playwright";
import { test, expect } from "../../fixture/fixture.ts";
import { PlaywrightPage } from "../../pages/playwrightPage.ts";
test('multiPage', async ({ samplePage, context,page }) => {
  await samplePage.Open();

  const pagePromise = context.waitForEvent('page');
  await samplePage.playwrightLink.click({ modifiers: ['ControlOrMeta'] });
  const newPage = await pagePromise;
await newPage.bringToFront()
  // 1. Create a NEW instance of your POM using the NEW page object
  const playwrightNewTab = new PlaywrightPage(newPage);
  // 2. Now 'playwrightNewTab' points to the correct tab
  await expect(playwrightNewTab.header).toHaveText('PlaywrightPractice');
  await playwrightNewTab.username.fill('i love playwright');
  expect(  await playwrightNewTab.username.inputValue()
).toBe('i love playwright')
await page.waitForTimeout(2000)
await page.bringToFront()
await page.waitForTimeout(500)
const pges = context.pages();

for (const p of pges) {
  const title = await p.title();
  console.log(`Tab Title: ${title}`);
}

let target
for (const p of pges) {
  const title = await p.title();
if(title.includes('Playwright')){
    target = p
    break
}
}
target?.bringToFront()
});
