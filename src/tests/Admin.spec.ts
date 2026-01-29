import { test, expect } from "../fixture/fixture.ts";

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

test(
  "Drop Down lists validation",
  { tag: ["@Regression", "@Admin"] },
  async ({ adminPage }) => {
    await adminPage.navigateToAdminPanel();
    const loanProviderOptions = await adminPage
      .loanProvider() // this should point to the <select>
      .locator("option") // target each <option>
      .evaluateAll((options) =>
        //options will be an array of those <option> DOM elements.
        options.map((o) => (o.textContent ?? "").trim()),
      );
    expect.soft(loanProviderOptions).toEqual(["JMS", "Web Service", "Local"]);

    const loanProcessorOptions = await adminPage
      .loanProcessor()
      .locator("option")
      .evaluateAll((options) =>
        options.map((o) => (o.textContent ?? "").trim()),
      );
    expect
      .soft(loanProcessorOptions)
      .toEqual(["Available Funds", "Down Payment", "Combined"]);
  },
);
