import { test, expect } from '@playwright/test'

test('if user is NOT logged-in, show /login page', async ({ page }) => {
  await page.goto('./')
  await expect(page.url()).toContain('/login')
  // await expect(page.url()).not.toContain('/')
})

test.describe('inputs functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./login')
    await page.getByTestId('email').fill('aech-12@hotmail.com')
    await page.getByTestId('password').fill('test1234')
    await page.getByTestId('submit').click()
  })

  test('/ renders', async ({ page }) => {
    await page.getByRole('heading', { name: 'News' }).click()
    await expect(page.url()).not.toContain('/login')
    await expect(page.url()).toContain('/')
  })

  test('inputs render', async ({ page }) => {
    await page.getByPlaceholder('search news')
    await page.getByText('Business')
    await page.getByText('China')
    // await page.locator('select[name="category"]').selectOption('business')
    // await page.locator('select[name="country"]').selectOption('cn')
  })
})

test.describe('inputs functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./login')
    await page.getByTestId('email').fill('aech-12@hotmail.com')
    await page.getByTestId('password').fill('test1234')
    await page.getByTestId('submit').click()
  })

  test('/index renders with global setup login', async ({ page }) => {
    await page.getByPlaceholder('search news').fill('some string')
    await page.getByRole('button', { name: 'Find' }).click()

    // fetch message should show before results show
    await page.getByText('Fetching...')
    await page.getByRole('button', { name: 'Save' })
  })

  test('input click fetches articles', async ({ page }) => {
    // test search, then select inputs
    await page.getByPlaceholder('search news').fill('some string')
    await page.getByRole('button', { name: 'Find' }).click()
    await page.getByText('Fetching...')
    await page.getByRole('button', { name: 'Save' })

    await page.locator('select[name="category"]').selectOption('business')
    await page.getByText('Fetching...')
    await page.getByRole('button', { name: 'Save' })

    await page.locator('select[name="country"]').selectOption('cn')
    await page.getByText('Fetching...')
    await page.getByRole('button', { name: 'Save' })
  })

  // test('articles can be saved', async ({ page }) => {
  //   await page.getByRole('button', { name: 'Save' }).click()
  //   await screen.getByText('button', { name: 'Saved' }).click()
  // })

  // currently  articles dont redirect, they open a new page
  //  test('click on an article redirects', async ({ page }) => {
  //   await page.getByTestId("article-a").click();
  //   await expect(page.url()).toContain('/')
  // })
})
