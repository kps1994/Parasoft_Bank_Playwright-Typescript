import { Page, expect } from "playwright/test";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  userName: string;
  password: string;
}
export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Fieds
  registerLink = () => this.page.getByRole("link", { name: "Register" });
  header = () => this.page.locator(".title");
  firstName = () => this.page.locator('[id="customer.firstName"]');
  lastName = () => this.page.locator('[id="customer.lastName"]');
  address = () => this.page.locator('[id="customer.address.street"]');
  city = () => this.page.locator('[id="customer.address.city"]');
  state = () => this.page.locator('[id="customer.address.state"]');
  zipCode = () => this.page.locator('[id="customer.address.zipCode"]');
  phoneNumber = () => this.page.locator('[id="customer.phoneNumber"]');
  ssn = () => this.page.locator('[id="customer.ssn"]');
  userName = () => this.page.locator('[id="customer.username"]');
  password = () => this.page.locator('[id="customer.password"]');
  repeatedPassword = () => this.page.locator('[id="repeatedPassword"]');
  sumbit = () => this.page.locator("input[value='Register']");
  successTitle = () => this.page.locator("#rightPanel > h1");
  successMsg = () => this.page.locator("#rightPanel > p");

  //errors
  firstNameError = () => this.page.locator('[id="customer.firstName.errors"]');
  lastNameError = () => this.page.locator('[id="customer.lastName.errors"]');
  addressError = () =>
    this.page.locator('[id="customer.address.street.errors"]');
  cityError = () => this.page.locator('[id="customer.address.city.errors"]');
  stateError = () => this.page.locator('[id="customer.address.state.errors"]');
  zipCodeError = () =>
    this.page.locator('[id="customer.address.zipCode.errors"]');
  phoneNumberError = () =>
    this.page.locator('[id="customer.phoneNumber.errors"]');
  ssnError = () => this.page.locator('[id="customer.ssn.errors"]');
  userNameError = () => this.page.locator('[id="customer.username.errors"]');
  passwordError = () => this.page.locator('[id="customer.password.errors"]');

  repeatedPasswordError = () =>
    this.page.locator('[id="repeatedPassword.errors"]');

  //Action Methods
  async registerNavigation() {
    await this.registerLink().click();
    expect(
      this.page.url().includes("register"),
      "Navigation to Register Page Failed",
    );
  }

  async registerNewDataJson(data: RegistrationData) {
    await this.registerNavigation();
    await this.firstName().fill(data.firstName);
    await this.lastName().fill(data.lastName);
    await this.address().fill(data.address);
    await this.city().fill(data.city);
    await this.state().fill(data.state);
    await this.zipCode().fill(data.zipCode);
    await this.phoneNumber().fill(data.phoneNumber);
    await this.ssn().fill(data.ssn);
    await this.userName().fill(data.userName);
    await this.password().fill(data.password);
    await this.repeatedPassword().fill(data.password);
    await this.sumbit().click();
  }

  async registerNewDataRandom(random: RegistrationData) {
    await this.registerNavigation();
    await this.firstName().fill(random.firstName);
    await this.lastName().fill(random.lastName);
    await this.address().fill(random.address);
    await this.city().fill(random.city);
    await this.state().fill(random.state);
    await this.zipCode().fill(random.zipCode);
    await this.phoneNumber().fill(random.phoneNumber);
    await this.ssn().fill(random.ssn);
    await this.userName().fill(random.userName);
    await this.password().fill(random.password);
    await this.repeatedPassword().fill(random.password);
    await this.sumbit().click();
  }
}
