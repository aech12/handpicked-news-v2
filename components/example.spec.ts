import { render, fireEvent, prettyDOM } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import Component from './Example.vue'

test('properly handles v-model', async () => {
  const { getByLabelText, getByText } = render(Component)

  // Asserts initial state.
  expect(getByText('Hi, my name is Alice')).toBeInTheDocument()

  // Get the input DOM node by querying the associated label.
  const usernameInput = getByLabelText(/username/i)

  // Updates the <input> value and triggers an `input` event.
  // fireEvent.input() would make the test fail.
  await fireEvent.update(usernameInput, 'Bob')

  getByText('Hi, my name is Bob')
})

test('other value', async () => {
  const wrapper = render(Component)
  const { getByTestId, getByDisplayValue } = wrapper

  // Asserts initial state.
  const usernameInput = getByTestId('other')

  await fireEvent.update(usernameInput, 'changedOther')

  expect(getByDisplayValue('changedOther')).toBeInTheDocument()
})

test('button clicks', async () => {
  const wrapper = render(Component)
  const { getByTestId } = wrapper

  const button = getByTestId('num-btn')
  await fireEvent.click(button)

  expect(getByTestId('num-p')).toHaveTextContent('2')

  const user = userEvent.setup()
  await user.click(button)
  expect(getByTestId('num-p')).toHaveTextContent('3')
  // console.log(prettyDOM(getByTestId('num-p')))
})
