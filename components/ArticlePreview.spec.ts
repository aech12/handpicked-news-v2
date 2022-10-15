import { render, fireEvent } from '@testing-library/vue'
import Component from './ArticlePreview.vue'
import { faker } from '@faker-js/faker'
import { getRoles } from '@testing-library/dom'

const global = {
  stubs: {
    Spinner: {
      template: '<span />',
    },
  },
  config: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('va-'),
    },
  },
}

const randomTitle = faker.vehicle.vehicle()
const randomDesc = faker.vehicle.vehicle()

const articleMock = {
  source: {
    id: 1,
    name: 'YouTube',
  },
  title: randomTitle,
  url: 'https://www.youtube.com/watch?v=ytd0lTqYm9s',
  description: randomDesc,
  urlToImage: ' https://i.ytimg.com/vi/ytd0lTqYm9s/hqdefault.jpg',
  // urlToImage:" https://i.ytimg.com/vi/ytd0lTqYm9s/hqdefault.jpg",
  publishedAt: '2022-10-08T00:41:34Z',
  content: null,
}

test('renders props', async () => {
  const { getByText, getByAltText } = render(Component, {
    props: { article: articleMock, savedArticles: [] },
    global,
  })
  // Asserts renders
  expect(getByText(randomTitle)).toBeInTheDocument()
  expect(getByText(randomDesc)).toBeInTheDocument()
  expect(getByAltText('article poster')).toBeInTheDocument()
})

test('save button renders', async () => {
  const { queryByRole, getByRole, debug, container } = render(Component, {
    props: { article: articleMock, savedArticles: [] },
    global,
  })

  getByRole('button', { name: /save$/i })
  expect(await queryByRole('button', { name: /saved/i })).toBeNull()
  // debug(container)
})

test('if article has title included in savedArticles, Saved button renders', async () => {
  const { queryByRole, getByRole, getByText, getByDisplayValue, getByTestId } =
    render(Component, {
      props: { article: articleMock, savedArticles: [{ title: randomTitle }] },
      global,
    })

  getByRole('button', { name: /saved/i })
  expect(await queryByRole('button', { name: /save$/i })).toBeNull()
  // console.log(getRoles(getByTestId('saved')))
})
