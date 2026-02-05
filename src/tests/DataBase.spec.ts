import { neon } from "@neondatabase/serverless";
import { test, expect } from "@playwright/test";

test("Database validation from neon db", async ({ page }) => {
  const sql = neon(process.env.DATABASE_URL || "");
  const [resut] =
    await sql`select name from users where id = ${process.env.ACCOUNT_ID}`;
  console.log(resut.name);
  expect(resut.name).toBe(process.env.USERNAME);
  await page.screenshot({ path: "db_test.png" });
});
