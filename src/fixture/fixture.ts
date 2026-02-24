import { test as base, Page } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { AdminPage } from "../pages/adminPage";

export const test = base.extend<{
  homePage: HomePage;
  registerPage: RegisterPage;
  adminPage: AdminPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },
});

export { expect } from "playwright/test";
