import { test, expect } from "../fixture/fixture.ts";
import { fetchExpectedBalance } from "../pages/IntegrationSource.ts";

// var expected_balance: number;
test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

test.describe(`Login using dotenv`, () => {
  test(`Login from environment file`, async ({ homePage }) => {
    await homePage.login(
      process.env.USERNAME || "",
      process.env.PASSWORD || "",
    );
    await homePage.page.waitForTimeout(5000);
    expect(homePage.accountsOverviewTitle()).toBeVisible();
    const balance = await homePage
      .accountBalance(Number(process.env.ACCOUNT_ID))
      .textContent();

    console.log("Balance: " + balance);
  });

  test(`Integration Login from environment file`, async ({
    homePage,
    request,
  }) => {
    await homePage.login(
      process.env.USERNAME || "",
      process.env.PASSWORD || "",
    );
    await homePage.page.waitForTimeout(5000);
    expect(homePage.accountsOverviewTitle()).toBeVisible();
    const balance = await homePage
      .accountBalance(Number(process.env.ACCOUNT_ID))
      .textContent();

    console.log("Balance: " + balance);
    const expected_balance = await fetchExpectedBalance(
      request,
      Number(process.env.ACCOUNT_ID),
    );

    // Currency formatting
    const expectedText = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(expected_balance); // -> "$1,231.10"
    expect(balance).toBe(expectedText.replace(/,/g, ""));
  });
});
