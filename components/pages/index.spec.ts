import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Home from '~/pages/index.vue'

describe('Home page', () => {
  test('should render', () => {
    render(Home)

    const component = screen.getByTestId('h1')

    expect(component).toHaveTextContent('Home!')
  })
})
