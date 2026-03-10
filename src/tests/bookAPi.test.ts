import { test, expect } from '@playwright/test';

let token: string;
test.describe.serial('authenticated delete workflow', () => {
  test('generate Token', async ({ request }) => {
    const res = await request.post('https://restful-booker.herokuapp.com/auth', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: 'admin',
        password: 'password123',
      },
    });
    const json = await res.json();
    token = json.token;
    console.log('token generated for auth test', token);
  });

  test('Delete API with Auth', async ({ request }) => {
    // rely on token produced by previous test
    const res = await request.delete('https://restful-booker.herokuapp.com/booking/203', {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
    });
    console.log(res.status());
    expect(res.status()).toBeLessThan(205);
  });
});


test('get API', async ({ request }) => {
  const res = await request.get('https://restful-booker.herokuapp.com/booking/203');
  const resJson = await res.json();
  console.log(resJson);
});

test('get max id', async ({ request }) => {
  const res = await request.get('https://restful-booker.herokuapp.com/booking/');
  const resJson = await res.json();
  console.log(resJson)
  const maxId = resJson.map((item: { bookingid: number }) => item.bookingid).reduce((max: number, current: number) => Math.max(max, current), 0);
  console.log('Max ID:', maxId);

});

test('Delete API without Auth', async ({ request }) => {
  const res = await request.delete('https://restful-booker.herokuapp.com/booking/203');
  console.log(res.status());
  expect(res.status()).toBe(403);
});

test('post API', async ({ request }) => {
  const res = await request.post('https://restful-booker.herokuapp.com/booking',
    {
        headers: {
            'Content-Type': 'application/json',
        },data: {
    "firstname" : "Balasiva",
    "lastname" : "Kamalaselvan",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-03-10",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}
    }
  );
  const resJson = await res.json();
    console.log(resJson);
expect(resJson).toHaveProperty('bookingid');
expect(resJson.bookingid).toEqual(expect.any(Number));
expect(resJson.booking).toEqual(expect.any(Object));
expect(resJson.booking).toHaveProperty('firstname', 'Balasiva');
expect(resJson.booking.firstname).toContain('siva');
expect(resJson.booking).toHaveProperty('lastname', 'Kamalaselvan');
expect(resJson.booking).toHaveProperty('totalprice', 111);
expect(resJson.booking.bookingdates).toHaveProperty('checkin');
expect(resJson.booking.bookingdates).toHaveProperty('checkout', '2019-01-01');
expect.soft(Date.parse(resJson.booking.bookingdates.checkin)).toBeLessThan(Date.now());
console.log('Current Date:', new Date().toISOString().split('T')[0]);
console.log('Check-in Date:', Date.parse(resJson.booking.bookingdates.checkin));
console.log('Today time:', new Date().getTime());

expect(resJson.booking.depositpaid).toBe(true);
  console.log(res.status());
  expect(res.status()).toBe(200);
});