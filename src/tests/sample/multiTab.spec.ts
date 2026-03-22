import { test } from "@playwright/test";

test("multi tab test", async ({ context }) => {
  const page1 = await context.newPage();
  await page1.goto("https://testautomationpractice.blogspot.com/");
  await page1.locator("#name").fill("page 1");

  const page2 = await context.newPage();
  await page2.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page2.locator("#name").fill("page 2");
  await page1.locator("#name").fill("I'm back");
  await page2.bringToFront();

  page1.on("dialog", async (dialog) => {
    console.log(dialog.message()); // Read the text: "Hello!"
    await dialog.accept(); // Click "OK"
  });
});

