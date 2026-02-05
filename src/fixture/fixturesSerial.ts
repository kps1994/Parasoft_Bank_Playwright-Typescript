import {
  test as base,
  expect,
  chromium,
  BrowserContext,
  Page,
} from "@playwright/test";
import path from "path";

type Fixtures = {
  context: BrowserContext;
  page: Page;
};

const userDataDir = path.join(__dirname, "../user-data");

let sharedContext: BrowserContext | null = null;
let sharedPage: Page | null = null;

export const test = base.extend<Fixtures>({
  context: async ({}, use) => {
    if (!sharedContext) {
      try {
        sharedContext = await chromium.launchPersistentContext(userDataDir, {
          headless: false,
          args: ["--start-maximized"],
          viewport: null,
        });
      } catch (error) {
        console.error("Failed to launch persistent context:", error);
        throw error;
      }
    }
    await use(sharedContext);
  },

  page: async ({ context }, use) => {
    if (!sharedPage) {
      sharedPage = context.pages().length
        ? context.pages()[0]
        : await context.newPage();
    }
    await use(sharedPage);
  },
});

export { expect };

// Ensure browser closes after all tests
base.afterAll(async () => {
  if (sharedContext) {
    await sharedContext.close();
    sharedContext = null;
    sharedPage = null;
  }
});