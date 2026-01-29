import { test, expect, Page } from "playwright/test";

export class AdminPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  adminLink = () => this.page.getByRole("link", { name: "Admin Page" });
  loanProvider = () => this.page.locator("#loanProvider");
  loanProcessor = () => this.page.locator("#loanProcessor");
  Submit = () => this.page.getByLabel("Submit");

  //Action Methods
  async navigateToAdminPanel() {
    await this.adminLink().click();
    await expect(this.page).toHaveURL(/.*parabank\/admin\.htm/);
  }
}
