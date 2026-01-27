import { test as base } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";

export const test = base.extend<{
  homePage: HomePage;
  registerPage: RegisterPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export { expect } from "playwright/test";
