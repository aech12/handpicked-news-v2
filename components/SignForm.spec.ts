import { describe, expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

import SignForm from './SignForm.vue'

describe('Login page', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('should render', () => {
    render(SignForm)
  })
  test('inputs should render and change value', async () => {
    const { getByText, getByTestId, getByDisplayValue } = await render(SignForm)
    const email = getByTestId('email')
    const password = getByTestId('password')

    // inputs render
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(getByText('Submit')).toBeInTheDocument()

    // inputs should change value
    const emailMock = faker.internet.email()
    const passwordMock = faker.internet.password()

    await fireEvent.update(email, emailMock)
    await fireEvent.update(password, passwordMock)
    // const user = userEvent.setup()
    // await user.type(email, emailMock)
    // await user.type(password, passwordMock)

    expect(getByDisplayValue(emailMock)).toBeInTheDocument()
    expect(getByDisplayValue(passwordMock)).toBeInTheDocument()
  })
  test('should NOT submit if email is empty', async () => {
    const signUp = vi.fn()
    const login = vi.fn()

    // const { getByTestId, getByText } = render(SignForm, {
    //   props: { signUp, login },
    // })
    const { getByTestId, getByText } = render(SignForm, {
      props: { signUp, login },
    })

    // empty email input
    const email = getByTestId('email')
    await fireEvent.change(email, { target: { value: '' } })

    // click submit
    // const user = userEvent.setup()
    // await user.click(getByTestId('submit'))
    await fireEvent.click(getByTestId('submit'))

    // const sign = vi.spyOn(wrapper.vm, 'sign').mockImplementation()
    // const sign = vi.spyOn(SignForm.methods, 'sign').mockImplementation()

    expect(signUp).toHaveBeenCalledTimes(0)
    expect(login).toHaveBeenCalledTimes(0)

    // expect(getByText('Please fill out this field.')).toBeInTheDocument()
    // expect(getByText('Please lengthen this field to 8 characters')).toBeInTheDocument()
  })
  test('form switches from login to sign up', async () => {
    const user = userEvent.setup()

    const { getByText, getByTestId } = render(SignForm)

    expect(getByText('Login')).toBeInTheDocument()

    await user.click(getByTestId('swapSignup'))
    expect(getByText('Sign up')).toBeInTheDocument()
  })
  test('form submits login()', async () => {
    const signUp = vi.fn()
    const login = vi.fn()

    const user = userEvent.setup()

    // const sign = vi.spyOn(SignForm.methods, 'sign')

    const { getByLabelText, getByText, getByTestId, getByDisplayValue } =
      render(SignForm, { props: { signUp, login } })
    // fill inputs
    const emailMock = faker.internet.email()
    const passwordMock = faker.internet.password()
    const email = getByTestId('email')
    const password = getByTestId('password')
    await user.type(email, emailMock)
    await user.type(password, passwordMock)

    expect(getByDisplayValue(emailMock)).toBeInTheDocument()

    // submit form
    await user.click(getByTestId('submit'))
    // await fireEvent.click(getByTestId("submit"))

    expect(signUp).toHaveBeenCalledTimes(0)
    // expect(login).toHaveBeenCalledTimes(1)
  })
})
