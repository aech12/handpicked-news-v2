import { serverSupabaseClient } from '#supabase/server'
import type { SavedArticle } from '~/types/savedArticles'

export default defineEventHandler(async event => {
  const { user } = getQuery(event)
  const client = serverSupabaseClient(event)

  const { data } = await client
    .from<SavedArticle>('savedArticles')
    .select('id, created_at, title, description, url, urlToImage')
    .eq('user', String(user))
    .order('created_at')

  return data
})
