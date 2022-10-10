import { Response } from '~/types/getArticlesResponse'
import { getNewsUrlParams } from '~/helpers/getNewsUrlParams'
import resMock from '~/tests/mocks/getArticlesResponse.json'

const baseUrl = 'https://newsapi.org/v2/top-headlines'
const searchUrl = 'https://newsapi.org/v2/everything'

export default defineEventHandler(async event => {
  //   throw new Error();
  //   return "test error";

  const config = useRuntimeConfig()
  const { page, search, country, category } = getQuery(event)
  console.log(
    page,
    'SEARCH',
    search,
    typeof search,
    'C',
    country,
    'C',
    category
  )

  let url = getNewsUrlParams({
    baseUrl,
    searchUrl,
    search,
    country,
    category,
  })

  console.log('URL', url)
  url += `&page=${page}&apiKey=${config.NEWSAPI_KEY}`

  return resMock.articles

  // const res = await $fetch(encodeURIComponent(url))
  // .then((response: Response) => response)
  // .catch(error => error)

  // return res.articles
})