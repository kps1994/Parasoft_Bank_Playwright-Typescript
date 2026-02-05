import { test as base, chromium, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const sessionFile = path.join(process.cwd(), "user-data", "session.json");
export { expect };
export const test = base.extend({
  context: async ({}, use) => {
    const browser = await chromium.launch({ headless: false });
    const context = fs.existsSync(sessionFile)
      ? await browser.newContext({ storageState: sessionFile })
      : await browser.newContext();

    await use(context);

    // Save storageState only if you want to reuse it in a controlled way
    await context.storageState({ path: sessionFile });
    await context.close();
    await browser.close();
  },
});
