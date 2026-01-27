import { Page, expect } from "playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  logo = () => this.page.locator(".logo");
  userName = () => this.page.locator('input[name="username"]');
  password = () => this.page.locator('input[name="password"]');
  loginButton = () => this.page.getByRole("button", { name: "Log In" });

  //Action Methods
  async goto() {
    await this.page.goto(process.env.BASE_URL_DEV || "/");
    await expect(this.logo()).toBeVisible();
  }
}
