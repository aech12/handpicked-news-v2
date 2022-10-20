import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

// const email = process.env.TEST_EMAIL
// const password = process.env.TEST_PASSWORD
const email = 'aech-12@hotmail.com'
const password = 'test1234'

test('initial form state is for Login', async ({ page }) => {
  await page.goto('./login')

  await page.getByRole('heading', { name: 'Login' }).click()
})

test('form starts at Login and switches to Signup', async ({ page }) => {
  await page.goto('./login')

  await page.getByText('Create a new account').click()
  await page.getByRole('heading', { name: 'Sign up' })
})

test.describe('form wrong submit attempts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./login')
  })

  test('form does NOT submit if email is empty', async ({ page }) => {
    await page.getByRole('heading', { name: 'Login' })
    await page.getByTestId('email').fill('')
    await page.getByTestId('password').fill('')

    await page.getByText('Submit').click()
    expect(page.url()).toContain('/login')
  })

  test('form does NOT submit if password is empty', async ({ page }) => {
    await page.getByRole('heading', { name: 'Login' })
    await page.getByTestId('email').fill(faker.datatype.string(16))
    await page.getByTestId('password').fill('')

    await page.getByText('Submit').click()
    expect(page.url()).toContain('/login')
  })

  test('form does NOT submit if credentials are incorrect', async ({
    page,
  }) => {
    const invalidEmail = faker.datatype.string(16)
    const invalidPass = faker.datatype.string(16)

    await page.getByRole('heading', { name: 'Login' })
    await page.getByTestId('email').fill(invalidEmail)
    await page.getByTestId('password').fill(invalidPass)

    await page.getByText('Submit').click()
    expect(page.url()).toContain('/login')
  })
})

test.describe('form succesful functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./login')
  })

  test('login form submits and redirects to app', async ({ page }) => {
    await page.getByTestId('email').fill('aech-12@hotmail.com')
    await page.getByTestId('password').fill('test1234')
    await page.getByTestId('submit').click()
    await page.getByRole('heading', { name: 'News' }).click()
    // await expect(page).toHaveURL('http://localhost:3000/app')
    await expect(page.url()).not.toContain('/login')
    await expect(page.url()).toContain('/app')
  })

  test('form shows Check mail message on signup', async ({ page }) => {
    const randomEmail = faker.datatype.string(16)
    const randomPass = faker.datatype.string(16)

    await page.getByText('Create a new account').click()
    await page.getByRole('heading', { name: 'Sign up' })
    await page.getByTestId('email').fill(randomEmail)
    await page.getByTestId('password').fill(randomPass)

    await page.getByText('Submit').click()
    await page.getByText('Check your email!')
  })
})
