import { serverSupabaseClient } from '#supabase/server'
import type { SavedArticle } from '~/types/savedArticles'

export default defineEventHandler(async event => {
  // title, description, url, urlToImage, user
  const body = await useBody(event)
  const client = serverSupabaseClient(event)

  return await client.from<SavedArticle>('savedArticles').upsert({ ...body })
})
