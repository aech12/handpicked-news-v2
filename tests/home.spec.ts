import { test } from '@playwright/test'

test('home page renders a title', async ({ page }) => {
  await page.goto('./')
  await page.getByText('Home!')
})
