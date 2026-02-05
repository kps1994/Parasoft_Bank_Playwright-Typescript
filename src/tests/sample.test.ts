import { test, expect } from "@playwright/test";
import { SamplePage } from "../pages/SamplePage";

test.describe("Sample Page Automation Practice", () => {
  let samplePage: SamplePage;

  test.beforeEach(async ({ page }) => {
    await test.step("Navigate to test page", async () => {
      await page.goto("https://testautomationpractice.blogspot.com/", {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      await page.waitForLoadState("domcontentloaded");
      samplePage = new SamplePage(page);
    });
  });

  test("Form submission", async ({ page }) => {
    await test.step("Verify form is visible", async () => {
      await expect(samplePage.nameInput).toBeVisible({ timeout: 10000 });
    });

    await test.step("Fill form fields", async () => {
      await samplePage.nameInput.fill("John Doe");
      await samplePage.emailInput.fill("john@example.com");
      await samplePage.phoneInput.fill("1234567890");
      await samplePage.countryDropdown.selectOption({ label: "India" });
      await samplePage.genderRadio.first().check();
      await samplePage.weekCheckbox.first().check();
    });

    await test.step("Submit form", async () => {
      // await page.waitForTimeout(1000); // Small delay to ensure form is ready
      // await page.pause(); // Debugging pause

      await samplePage.submitButton.click();
    });
  });

  test("Alert handling", async ({ page }) => {
    await test.step("Handle alert dialog", async () => {
      await expect(samplePage.alertButton).toBeVisible({ timeout: 5000 });
      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("alert");
        await dialog.accept();
      });
      await samplePage.alertButton.click();
      // Wait for dialog to be handled
      await page.waitForTimeout(1000);
    });
  });

  test("Double click", async ({ page }) => {
    await test.step("Perform double click action", async () => {
      await expect(samplePage.doubleClickButton).toBeVisible({ timeout: 5000 });
      await samplePage.doubleClickButton.dblclick();
      await expect(samplePage.field2).toHaveValue("Hello World!");
    });
  });

  test("Drag and drop", async ({ page }) => {
    await test.step("Perform drag and drop operation", async () => {
      await expect(samplePage.dragSource).toBeVisible({ timeout: 5000 });
      await expect(samplePage.dropTarget).toBeVisible({ timeout: 5000 });
      await samplePage.dragSource.dragTo(samplePage.dropTarget);
      await expect(samplePage.dropTarget).toHaveText(/Dropped!/, {
        timeout: 5000,
      });
    });
  });

  test("Shadow dom interaction", async ({ page }) => {
    await test.step("Interact with Shadow dom", async () => {
      //shadoms can access directly without switching to frame
      await samplePage.shadowInput.click();
      await samplePage.shadowInput.fill("test shadowDom");
      await samplePage.shadowCheck.check();
      expect(samplePage.shadowCheck).toBeChecked();
      await samplePage.shadowCheck.uncheck();
      expect(samplePage.shadowCheck).not.toBeChecked();
      await samplePage.shadowNested.click();
    });
  });

  test("Table validation", async ({ page }) => {
    const home = new SamplePage(page);
    const rowCount = await home.table.locator("tr").count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test("Handling Iframes, Drag and Drop element in playwright", async ({
    page,
  }) => {
    // Go to URL
    await page.goto("https://jqueryui.com/droppable/");

    const iframe = page.frameLocator('[class="demo-frame"]');

    // drag element, drop element
    const dragElement = iframe.locator('[id="draggable"]');
    const dropElement = iframe.locator('[id="droppable"]');

    await dragElement.dragTo(dropElement);
  });
});

test("Element Visual Comparison in Playwright", async ({ page }) => {
  await page.goto("https://github.com/login");

  // Compare page screnshots
  // fist time - this will create the baseline screenshot
  await expect(page).toHaveScreenshot("GitHubLoginPage.png");

  // Compare element screnshots
  const element = page.locator('[class="authentication-header "]');
  await expect(element).toHaveScreenshot("GitHubLoginForm.png");

  await page.locator("#login_field").fill("playwright with typescript");
  await expect(element).toHaveScreenshot("GitHubLoginForm.png");
});
