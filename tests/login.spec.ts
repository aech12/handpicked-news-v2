import { test, expect } from '@playwright/test';

test('form switches from Login to Signup', async ({ page }) => {
  // Click [data-testid="swapSignup"]
  await page.locator('[data-testid="swapSignup"]').click();
  // Click text=Sign up
  await page.locator('text=Sign up').click();
});

test('wrong mail/password fails login', async ({ page }) => {
  // Go to http://localhost:3000/login
  await page.goto('http://localhost:3000/login');

  // Fill [data-testid="email"]
  await page.locator('[data-testid="email"]').click();
  await page.locator('[data-testid="email"]').fill('fake@mail.com');
  // Fill [data-testid="password"]
  await page.locator('[data-testid="email"]').press('Tab');
  await page.locator('[data-testid="password"]').fill('fakepass1234');

  // Sub,ot
  await page.locator('[data-testid="submit"]').click();
  // Click text=Invalid login credentials
  await page.locator('text=Invalid login credentials').click();
});

test('correct login redirects to /app', async ({ page }) => {
  // form is in Login mode
  await page.locator('h1:has-text("Login")').click();

  // fill inputs
  await page.locator('[data-testid="email"]').click();
  await page.locator('[data-testid="password"]').click();
  await page.locator('[data-testid="email"]').fill('aech-12@hotmail.com');
  await page.locator('[data-testid="password"]').fill('test1234');

  // submit and redirect
  await page.locator('[data-testid="submit"]').click();
  await expect(page).toHaveURL('http://localhost:3000/app');
  // await expect(page).toHaveURL(/.*app/)
});