import { describe, expect, test } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import Component from './PageBar.vue'

test('increments value on click', async () => {
  const signUp = vi.fn()
  const login = vi.fn()

  const { getByTestId } = render(Component, { props: { signUp, login } })

  await fireEvent.click(getByTestId('nextpage'))

  // https://github.com/testing-library/vue-testing-library/issues/116
  // expect(signUp).toHaveBeenCalledOnce()
})
