import { test, expect } from '@playwright/test';

const validEmail = "aech-12@hotmail.com"
const validPass = ""
test('/app should redirect to /login, and have signout button', async ({ page }) => {
  await page.goto('http://localhost:3000/app');
  await expect(page).toHaveURL('http://localhost:3000/login');

  // fill inputs
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill(validEmail);

  await page.getByTestId('password').click();
  await page.getByTestId('password').fill(validPass);

  // submit form
  await page.getByTestId('submit').click();
  await expect(page).toHaveURL('http://localhost:3000/app');

  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('/app should redirect to /login, and have signout button', async ({ page }) => {
  await page.goto('http://localhost:3000/app');
  await expect(page).toHaveURL('http://localhost:3000/login');

  // fill inputs
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill(validEmail);

  await page.getByTestId('password').click();
  await page.getByTestId('password').fill(validPass);

  // submit form
  await page.getByTestId('submit').click();
  await expect(page).toHaveURL('http://localhost:3000/app');

  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('search fetches articles', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('aech-12@hotmail.com');

  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('test1234');

  await page.getByTestId('submit').click();
  await expect(page).toHaveURL('http://localhost:3000/app');

  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  await page.getByPlaceholder('search news').click();
  await page.getByPlaceholder('search news').fill('football argentina');

  await page.getByRole('button', { name: 'Find' }).click();
  await page.getByText('Fetching...').click();

  await page.getByRole('button', { name: 'Save' }).click();

});


test('select inputs fetch articles', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  await page.getByTestId('email').click();

  await page.getByTestId('email').fill('aech-12@hotmail.com');

  await page.getByTestId('password').click();

  await page.getByTestId('password').fill('test1234');

  await page.getByTestId('submit').click();
  await expect(page).toHaveURL('http://localhost:3000/app');

  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  await page.getByPlaceholder('search news').click();

  await page.getByPlaceholder('search news').fill('football argentina');

  await page.getByRole('button', { name: 'Find' }).click();

  await page.getByText('Fetching...').click();

  await page.locator('a:has-text("Ukraine joins Spain and Portugal\'s 2030 World Cup bid - Reuters.comUkraine has j")').getByRole('button', { name: 'Save' }).click();

  await page.locator('a:has-text("Ukraine joins Spain and Portugal\'s 2030 World Cup bid - Reuters.comUkraine has j")').click();

  await page.locator('select[name="country"]').selectOption('nl');

  await page.locator('select[name="category"]').selectOption('sports');

  await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('a:has-text("Alfred Schreuder gooit het roer niet om bij Ajax: \'Vasthouden aan eigen spelprin")').getByRole('button', { name: 'Save' }).click();

  await page.getByPlaceholder('search news').click();

});