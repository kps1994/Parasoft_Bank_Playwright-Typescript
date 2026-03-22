import { test, expect } from "../../fixture/fixture.ts";
import userData from "../../test_data/users.json";
import { createRandomUser } from "../../test_data/random_data.ts";

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

test.describe(`Register using Json`, () => {
  test(`Register using Json user1 @Regression`, async ({ registerPage }) => {
    await registerPage.lastName().isVisible();
    await registerPage.registerNewDataJson(userData.user1);
  });

  test(
    `Register using Json user2`,
    { tag: ["@Sanity"] },
    async ({ registerPage }) => {
      await registerPage.registerNewDataJson(userData.user2);
      await registerPage.page.waitForTimeout(5000);
    },
  );

  test(`Register Random Data`, async ({ registerPage }) => {
    const rand = createRandomUser();
    await registerPage.registerNewDataRandom(rand);
    await registerPage.page.waitForTimeout(5000);

    if (await registerPage.userNameError().isVisible()) {
      await expect(registerPage.userNameError()).toHaveText(
        "This username already exists.",
      );
    } else {
      await expect(registerPage.successTitle()).toHaveText(
        `Welcome ${rand.userName}`,
      );
      await expect(registerPage.successMsg()).toHaveText(
        "Your account was created successfully. You are now logged in.",
      );
    }
  });
});

test.describe(`Register Negative Scenarios`, () => {
  test("Register fields Error validation @Regression", async ({
    registerPage,
  }) => {
    await registerPage.registerLink().click();
    await registerPage.sumbit().click();
    expect(registerPage.firstNameError()).toHaveText("First name is required.");
    expect(registerPage.lastNameError()).toHaveText("Last name is required.");
    expect(registerPage.addressError()).toHaveText("Address is required.");
    expect(registerPage.cityError()).toHaveText("City is required.");
    expect(registerPage.stateError()).toHaveText("State is required.");
    expect(registerPage.zipCodeError()).toHaveText("Zip Code is required.");
    expect(registerPage.ssnError()).toHaveText(
      "Social Security Number is required.",
    );
    expect(registerPage.userNameError()).toHaveText("Username is required.");
    expect(registerPage.passwordError()).toHaveText("Password is required.");

    expect(registerPage.repeatedPasswordError()).toHaveText(
      "Password confirmation is required.",
    );
    await registerPage.page.waitForTimeout(5000);
  });

  test(
    "Register password match Error validation",
    { tag: ["@Sanity"] },
    async ({ registerPage }) => {
      await registerPage.registerLink().click();
      await registerPage.password().fill("new");
      await registerPage.repeatedPassword().fill("new1");
      await registerPage.sumbit().click();
      expect(registerPage.repeatedPasswordError()).toHaveText(
        "Passwords did not match.",
      );
      await registerPage.page.waitForTimeout(5000);
    },
  );
});
