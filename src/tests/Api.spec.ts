import { test, expect } from "playwright/test";

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
  const balance = parseFloat(balanceMatch[1]);
  console.log(balance);
});

test("api get example", async ({ request }) => {
  const response = await request.get(
    "https://conduit-api.bondaracademy.com/api/tags",
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data.tags[2]);
  expect(data).toHaveProperty("tags");
  expect(data.tags).toHaveLength(10);
  expect(data.tags[2]).toEqual("YouTube");
});

interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

// test("api post example", async ({ request }) => {
//   const response = await request.post(
//       "https://restful-booker.herokuapp.com/booking",
//       headers: {
//           Authorization: "abc123xyz"},

//    data: Booking = {
//     firstname: "John",
//     lastname: "Doe",
//     totalprice: 150,
//     depositpaid: true,
//     bookingdates: {
//       checkin: "2023-10-01",
//       checkout: "2023-10-10",
//     },
//     additionalneeds: "Breakfast",
//   };
// });
