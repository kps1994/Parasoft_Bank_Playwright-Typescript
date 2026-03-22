import { Page, Locator, FrameLocator,expect } from "@playwright/test";

export class SamplePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly countryDropdown: Locator;
  readonly genderRadio: Locator;
  readonly weekCheckbox: Locator;
  readonly submitButton: Locator;
  readonly alertButton: Locator;
  readonly doubleClickButton: Locator;
  readonly field2: Locator;
  readonly dragSource: Locator;
  readonly dropTarget: Locator;
  readonly frame: FrameLocator;
  readonly shadowInput: Locator;
  readonly shadowCheck: Locator;
  readonly shadowNested: Locator;
  readonly table: Locator;
  readonly playwrightLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone");
    this.countryDropdown = page.locator("#country");
    this.genderRadio = page.locator('input[name="gender"]');
    this.weekCheckbox = page.locator('input[type="checkbox"]');
    this.submitButton = page.getByRole("button", { name: "Submit" }).first();
    this.alertButton = page.getByRole("button", { name: "Simple Alert" });
    this.doubleClickButton = page.getByRole("button", { name: "Copy Text" });
    this.field2 = page.locator("#field2");
    this.dragSource = page.locator("#draggable");
    this.dropTarget = page.locator("#droppable");
    this.frame = page.frameLocator("iframe");
    this.table = page.locator("table");
    this.shadowInput = page.locator("#shadow_host > input").first();
    this.shadowCheck = page.locator("input:nth-child(7)");
    this.shadowNested = page.locator("#nested_shadow_content").getByText("Laptops");
    this.playwrightLink= page.getByText('PlaywrightPractice')

  }

  async Open(){
    await this.page.goto('https://testautomationpractice.blogspot.com/')
    expect(await this.page.locator('h1')).toHaveText('Automation Testing Practice')
  }
}
