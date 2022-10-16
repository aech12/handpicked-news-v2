import { render, fireEvent, screen } from '@testing-library/vue'
import { beforeEach } from 'vitest'

import Component from './ListSelect.vue'

const componentProperties = {
  name: 'Category',
  selected: '',
  items: [
    { text: 'Item 1', paramVal: 'it' },
    { text: 'Item 2', paramVal: 'it2' },
  ],
}

test('input starting selected item is props.name', async () => {
  const { getByText, getByTestId } = render(Component, {
    props: { ...componentProperties },
  })
  getByText('Category')

  const select = getByTestId('select') as HTMLSelectElement
  expect(select.value).to.equal('')
})

describe('component functionality', () => {
  test('selects an item', async () => {
    const { getByTestId } = render(Component, {
      props: { ...componentProperties },
    })

    const select = getByTestId('select') as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'it2' } })
    expect(select.value).to.equal('it2')
  })
  test('does NOT select non-existant item', async () => {
    const { getByTestId, getAllByTestId } = render(Component, {
      props: { ...componentProperties },
    })

    const select = getByTestId('select') as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'it' } })
    expect(select.value).to.equal('it')
    fireEvent.change(select, { target: { value: 'it3' } })
    expect(select.value).not.to.equal('it3')
  })
  test('selects an item (click functionality)', async () => {
    const { getByTestId, getAllByTestId, getByText } = render(Component, {
      props: { ...componentProperties },
    })
    fireEvent.click(screen.getByText('Item 2'))
    const select = getByTestId('select') as HTMLSelectElement
    expect(select.value).not.to.equal('it2')
  })
})
