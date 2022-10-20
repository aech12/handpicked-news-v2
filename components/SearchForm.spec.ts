import { render, fireEvent } from '@testing-library/vue'
import Component from './SearchForm.vue'
import { faker } from '@faker-js/faker'

const componentProps = {
  name: '',
  search: '',
}

test('input renders and is interactive', async () => {
  const { getByDisplayValue, getByPlaceholderText } = render(Component, {
    props: { ...componentProps },
  })

  const input = getByPlaceholderText('search news')

// update input
  const randomSearch = faker.datatype.string(12)
  await fireEvent.update(input, randomSearch)
  expect(getByDisplayValue(randomSearch)).toBeInTheDocument()
})

test('if article has title included in savedArticles, Saved button renders', async () => {
  const { emitted, getByRole, getByPlaceholderText } = render(Component, {
    props: { ...componentProps },
  })

  // update input
  const input = getByPlaceholderText('search news')
  await fireEvent.update(input, faker.datatype.string(12))

  // Find button emmits event
  await fireEvent.click(getByRole('button', { name: /find/i }))
  expect(emitted()).toHaveProperty('handleSubmit')
})
