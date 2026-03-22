import { Page, Locator } from "@playwright/test";

export class PlaywrightPage {
  readonly page: Page;
  readonly header: Locator;
  readonly username: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("h3").first();
    this.username = page.locator("#email");
  }
}
