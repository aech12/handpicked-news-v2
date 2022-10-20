import { describe, expect, test } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'

import Component from './PageBar.vue'

describe('component functionality', () => {
  test('next page prop fn is called', async () => {
    let page = 1
    const previousPage = vi.fn(() => page--)
    const nextPage = vi.fn(() => page++)

    render(Component, {
      props: { previousPage, nextPage, page },
    })

    await fireEvent.click(screen.getByTestId('nextpage'))
    expect(nextPage).toHaveBeenCalledOnce()
    expect(previousPage).not.toHaveBeenCalled()
  })

  test('page is updated with prop functions', async () => {
    let page = 1
    const previousPage = vi.fn(() => page--)
    const nextPage = vi.fn(() => page++)

    render(Component, {
      props: { previousPage, nextPage, page },
    })

    expect(page).toBe(1)

    await fireEvent.click(screen.getByTestId('nextpage'))
    expect(nextPage).toHaveBeenCalledOnce()
    expect(page).toBe(2)

    await fireEvent.click(screen.getByTestId('prevpage'))
    expect(previousPage).toHaveBeenCalledOnce()
    expect(page).toBe(1)
  })
})
