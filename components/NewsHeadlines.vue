<template>
  <div>
    <p v-if="pending" class="pb-4 pt-2">Fetching...</p>
    <div v-else-if="error" class="pb-4 pt-2">
      <p>Error fetching</p>
    </div>
    <ul v-else class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ArticlePreview
        v-for="article in articles"
        :key="article.title"
        :article="article"
        :savedArticles="savedArticles"
        :saveArticle="saveArticle"
        :removeSavedArticle="removeSavedArticle"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { SavedArticle } from '~/types/savedArticles'

defineProps({
  pending: null,
  error: null,
  articles: Array<SavedArticle>,
})

const client = useSupabaseClient()
const user = useSupabaseUser()

// initial saved articles fetch
const { data: savedArticles } = await useAsyncData(
  'saves',
  async (): Promise<SavedArticle[]> =>
    $fetch(`/api/savedArticles`, {
      method: 'get',
      params: {
        user: user.value.id,
      },
      headers: useRequestHeaders(['cookie']),
    })
)

const saveArticle = async (article): Promise<any> => {
  if (article.title.trim().length === 0) {
    return
  }
  const { title, description, url, urlToImage } = article

  const { data, error } = await useFetch('/api/saveArticle', {
    method: 'post',
    body: { title, description, url, urlToImage, user: user.value.id },
  })

  if (!error.value) savedArticles.value.push(article)

  return { data: data.value, error: error.value }
}

const removeSavedArticle = async (article): Promise<any> => {
  savedArticles.value = savedArticles.value.filter(
    item => item.title !== article.title
  )
  const { data,error } = await client
    .from<SavedArticle>('savedArticles')
    .delete()
    .match({ title: article.title })
  return { data, error }
}
</script>
