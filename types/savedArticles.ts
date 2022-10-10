export interface SavedArticle {
  id: number;
  created_at?: Date;
  title: string
  description: string
  url: string
  urlToImage: string
  user: string
}
