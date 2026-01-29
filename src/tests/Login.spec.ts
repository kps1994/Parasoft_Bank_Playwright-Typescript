import { test, expect } from "../fixture/fixture.ts";

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
});
