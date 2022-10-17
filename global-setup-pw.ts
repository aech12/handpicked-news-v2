import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/login')
  await page.getByTestId('email').fill('aech-12@hotmail.com')
  await page.getByTestId('password').fill('test1234')
  await page.getByTestId('submit').click()
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' })
  await browser.close()
}

export default globalSetup
