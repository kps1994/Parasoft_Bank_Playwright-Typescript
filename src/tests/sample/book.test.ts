import {test, Page,expect} from '@playwright/test'
let pickDate: string = '16'
test('select date', async({page}: {page: Page})=>{
await page.goto('https://www.abhibus.com/')
await page.waitForLoadState('load')
// await page.getByRole('combobox', {has-text: 'Select Date of Journey. Current date:'}).click({timeou: 2000})
await page.locator("h3:has-text('Departure')").click();
await page.getByRole('button', {name: pickDate}).click()
// await page.locator('.date___dc26ca.available___97413b.calendarDate > span').click()
await page.getByPlaceholder('Going To').click()
const list = await page.locator('.text-neutral-800.col small').count()
const li =await page.locator('div.text-neutral-800.col > small').locator('..')
  .allInnerTexts();
console.log(li)
console.log(list)

await page.waitForTimeout(5000)

})