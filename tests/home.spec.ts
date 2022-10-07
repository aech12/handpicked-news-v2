import { test, expect } from '@playwright/test'

test('home page renders a title', async ({
  page,
}) => {
  await page.goto('./')
  
  const title =  await page.locator('data-testid=h1');
  await expect(title).toHaveText("Home!")
})