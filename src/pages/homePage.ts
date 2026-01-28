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
    console.log("Navigating to:", process.env.ENV);
    await this.page.goto(process.env.BASE_URL || "/wrong-url");
    await expect(this.logo()).toBeVisible();
  }


  async login(username: string, password: string) {
    await this.userName().fill(username);
    await this.password().fill(password);
    await this.loginButton().click();
  }
}
