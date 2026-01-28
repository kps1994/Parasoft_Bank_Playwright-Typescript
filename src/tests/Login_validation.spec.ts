import { test, expect } from "../fixture/fixture.ts";
import userData from "../test_data/users.json";
import { createRandomUser } from "../test_data/random_data.ts";

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

test.describe(`Login using dotenv`, () => {
  test(`Login QA Environment`, async ({ homePage }) => {
    await homePage.login(
      process.env.USERNAME || "",
      process.env.PASSWORD || "",
    );
    await homePage.page.waitForTimeout(5000);
  });
});
