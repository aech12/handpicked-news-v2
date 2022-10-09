interface Query {
  baseUrl: string
  searchUrl: string
  search?: string | any // any should be QueryValue
  country?: string | any
  category?: string | any
}

function getNewsUrlParams({
  baseUrl,
  searchUrl,
  search,
  country,
  category,
}: Query): string {
  // only use search url if :search.len > 0
  if (search && search !== '') {
    return searchUrl + `?sortBy=relevancy&q=${search}`
  } else {
    if (country && country !== '') baseUrl += `?country=${country}`
    if (category && category !== '') {
      baseUrl += country !== '' ? '&' : '?' // add symbol based on past param
      baseUrl += `category=${category}`
    }
    return baseUrl
  }
}

export { getNewsUrlParams }
