import type { APIRequestContext } from "@playwright/test";

//this function fetch expected balance from API and used in Login.spec.ts 
export async function fetchExpectedBalance(
  request: APIRequestContext,
  accountId: Number,
): Promise<number> {
  const response = await request.get(
    `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
  );
  if (response.status() !== 200) {
    throw new Error(`Balance API failed with status ${response.status()}`);
  }
  const xml = await response.text();
  const m = xml.match(/<balance>(.*?)<\/balance>/);
  if (!m) throw new Error("Balance not found in XML");
  const value = parseFloat(m[1]);
  if (Number.isNaN(value))
    throw new Error(`Parsed balance is NaN from: "${m[1]}"`);
  return value; // convert to number type
}

