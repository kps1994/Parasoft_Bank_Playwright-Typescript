import { test, expect } from "@playwright/test";

test("extract dropdown items one by one", async ({ page }) => {
  await page.goto("https://www.amazon.in/");

  const rawText = await page
    .locator(".nav-search-scope.nav-sprite")
    .innerText(); // returns multiline string

  const rawText1 = await page
    .locator(".nav-search-scope.nav-sprite")
    .allInnerTexts();
  const rawText3 = rawText1[0].split(/\r?\n/);
  // console.log(rawText);
  const list = rawText
    .split(/\r?\n/) // split by newline
    .map((item) => item.trim()) // remove extra spaces
    .filter(Boolean)
    .splice(1); // remove blank lines

  const list2 = list.sort(() =>0-1);
  expect.soft(list2).toEqual(rawText3);
  let yu = list2.forEach((item) => console.log('3'+item))
  // console.log(yu);
    // console.log(rawText3);

  const c = await page.locator("select>option").count();
  const shuffleArr = list.sort(() => Math.random() - 0.5);
  try {
    for (const item of shuffleArr) {
      await await page
        .locator(
          ".nav-search-dropdown.searchSelect.nav-progressive-attrubute.nav-progressive-search-dropdown",
      ).selectOption(item);

    }
  } catch (e) {
    console.error("Cant find or fill dropdown item:", e);
  }
  console.log(shuffleArr);
  console.log(c);
});
