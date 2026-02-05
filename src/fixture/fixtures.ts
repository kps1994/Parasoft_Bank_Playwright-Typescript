import { test as base, chromium, BrowserContext, Page } from "@playwright/test";
import * as path from "path";

type MyFixtures = {
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<MyFixtures>({
  context: async ({}, use) => {
    const userDataDir = path.join(process.cwd(), "user-data-dir");
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: "msedge",
      headless: false,
      // viewport: { width: 1280, height: 720 },
      //recordVideo: { dir: "videos/" },
      acceptDownloads: true,
    });
    await use(context);
    // Don't close the context to maintain the session
  },

  page: async ({ context }, use) => {
    const [page] = context.pages().length
      ? context.pages()
      : [await context.newPage()];
    await use(page);
  },
});

export { expect, Page } from "@playwright/test";
