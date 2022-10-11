import { render, fireEvent } from '@testing-library/vue'
import Component from './ListSelect.vue'
import { beforeEach } from 'vitest'

const componentProps = {
  name: 'Category',
  selected: '',
  items: [
    { text: 'Item 1', paramVal: 'it' },
    { text: 'Item 2', paramVal: 'it2' },
  ],
}

test('input starting selected item is props.name', async () => {
  const { getByText, getByTestId } = render(Component, {
    props: { ...componentProps },
  })
  getByText('Category')

  const select = getByTestId('select') as HTMLSelectElement
  expect(select.value).to.equal('')
})

describe('select functionality', () => {
  test('selects 2nd item', async () => {
    const { getByTestId, getAllByTestId } = render(Component, {
      props: { ...componentProps },
    })

    const select = getByTestId('select') as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'it2' } })
    expect(select.value).to.equal('it2')
    expect(select.value).to.not.equal('')
  })
})
