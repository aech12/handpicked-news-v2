interface Article {
  source: {
    id: number
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string | null
}

interface Response {
  status: string
  totalResults: number
  articles: Article[]
}

export { Response }
