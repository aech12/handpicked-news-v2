<script setup lang="ts">
import { SavedArticle } from '~/types/savedArticles'

definePageMeta({
  middleware: 'auth',
  layout: 'base',
})

const client = useSupabaseClient()
const user = useSupabaseUser()

const { data: savedArticles } = await useAsyncData(
  'savedArticles',
  async (): Promise<SavedArticle[]> =>
    $fetch(`/api/savedArticles`, {
      method: 'get',
      params: {
        user: user.value.id,
      },
      headers: useRequestHeaders(['cookie']),
    })
)

const removeSavedArticle = async (article): Promise<any> => {
  savedArticles.value = savedArticles.value.filter(
    item => item.title !== article.title
  )
  const { data, error } = await client
    .from<SavedArticle>('savedArticles')
    .delete()
    .match({ title: article.title })
  return { data, error }
}
</script>

<template>
  <div class="max-w-5xl mx-auto mt-2 flex flex-col text-center items-center">
    <h2 class="my-2 text-3xl w-full">Saved</h2>
    <div class="my-2 w-full">
      <div
        v-if="savedArticles.length > 0"
        body-class="px-6 py-2 overflow-hidden"
      >
        <ul
          class="w-full px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <li v-for="article of savedArticles" :key="article.id">
            <a
              src="article.url"
              noreferrer
              noopener
              class="bg-gray-900 flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-800 cursor-pointer"
            >
              <img
                v-bind:src="article.urlToImage"
                class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                :title="article.title"
              />
              <div
                class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-40 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
              >
                <div
                  :label="article.title"
                  :name="String(article.id)"
                  wrapper-class="flex items-center justify-between w-full"
                >
                  <p class="text-lg font-bold mx-4">
                    {{ article.title }}
                  </p>
                  <va-button
                    @click="removeSavedArticle(article)"
                    flat
                    size="small"
                    class="mt-1"
                    >Remove</va-button
                  >
                </div>
              </div></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
