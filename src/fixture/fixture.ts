import { test as base, Page } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { AdminPage } from "../pages/adminPage";
import { SamplePage } from "../pages/samplePage";
import { PlaywrightPage } from "../pages/playwrightPage";

export const test = base.extend<{
  homePage: HomePage;
  registerPage: RegisterPage;
  adminPage: AdminPage;
  samplePage: SamplePage
  playwrightPage: PlaywrightPage
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  adminPage: async ({  page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },
  samplePage: async({page},use)=>{
const samplePage = new SamplePage(page)
await use(samplePage)
  },
});

export { expect } from "playwright/test";
