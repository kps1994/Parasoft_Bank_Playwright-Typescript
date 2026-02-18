import { test, expect } from "@playwright/test";

test.afterAll("Clean Database", async ({ request }) => {
  const url = "https://parabank.parasoft.com/parabank/services/bank/cleanDB";
  const response = await request.post(url, {
    headers: {
      accept: "application/xml",
      "content-type": "application/json",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(204);
  console.log("Database cleaned up after tests");
});

test.describe("Parabank Bill Pay API- XML type", () => {
  test("Positive Scenario POST /billpay should return XML with expected fields", async ({
    request,
  }) => {
    const url = "https://parabank.parasoft.com/parabank/services/bank/billpay";

    const response = await request.post(url, {
      params: {
        accountId: "13344",
        amount: "50000",
      },
      headers: {
        accept: "application/xml",
        "content-type": "application/json",
      },
      data: {
        name: "Balasiva",
        address: {
          street: "SAP NAgar",
          city: "Palladam",
          state: "TN",
          zipCode: "641662",
        },
        phoneNumber: "9191232923",
        accountNumber: 0,
      },
    });

    // Basic HTTP assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const ct = response.headers()["content-type"] || "";
    expect(ct).toContain("application/xml");
    console.log("content-type:" + ct);

    const body = await response.text();
    console.log(body);
    const balanceMatch = body.match(/<payeeName>Balasiva<\/payeeName>/); // validate response xml
  });

  test("Negative Scenario POST /billpay with invalid amount", async ({
    request,
  }) => {
    const res = await request.post(
      "https://parabank.parasoft.com/parabank/services/bank/billpay",
      {
        params: { accountId: "13344", amount: "INVALID" },
        headers: {
          accept: "application/xml",
          "content-type": "application/json",
        },
        data: {
          name: "string",
          address: { street: "x", city: "y", state: "z", zipCode: "00000" },
          phoneNumber: "000",
          accountNumber: 0,
        },
      },
    );

    // The exact status depends on the API; adjust after observing actual behavior
    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  test("Parasoft get name from api", async ({ request }) => {
    const response = await request.get(
      "https://parabank.parasoft.com/parabank/services/bank/customers/12212",
    );
    expect(response.status()).toBe(200);
    const xml = await response.text();
    console.log(xml);
    expect(xml).toContain("<firstName>John</firstName>");
  });

  test("Parasoft get balance from api", async ({ request }) => {
    const response = await request.get(
      "https://parabank.parasoft.com/parabank/services/bank/accounts/13344",
    );
    expect(response.status()).toBe(200);
    const xml = await response.text();
    console.log(xml);
    const balanceMatch = xml.match(/<balance>(.*?)<\/balance>/);
    if (!balanceMatch) {
      throw new Error("Balance not found in XML");
    }
    const expected_balance = parseFloat(balanceMatch[1]);
    console.log(expected_balance);
  });
});

test("api get json example", async ({ request }) => {
  const response = await request.get(
    "https://conduit-api.bondaracademy.com/api/tags",
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data.tags[2]);
  expect(data).toHaveProperty("tags");
  expect(data.tags).toHaveLength(10);
  expect(data.tags[2]).toEqual("Git");
});
