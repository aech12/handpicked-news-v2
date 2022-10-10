<script setup lang="ts">
import { Saved } from '~/types/saves'
import { SavedArticle } from '~/types/savedArticles'

definePageMeta({
  middleware: 'auth',
  layout: 'base',
})

const client = useSupabaseClient()
const user = useSupabaseUser()

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


const removeSaved = async (article: Saved) => {
  savedArticles.value = savedArticles.value.filter(t => t.id !== article.id)
  await client.from<Saved>('saves').delete().match({ id: article.id })
}
</script>

<template>
  <div class="max-w-3xl mx-auto mt-2 flex flex-col text-center items-center">
    <h2 class="text-3xl text-black w-full">Saved</h2>
    <div class="w-full my-[50px]">
      <div
        v-if="savedArticles.length > 0"
        body-class="px-6 py-2 overflow-hidden"
      >
        <ul>
          <li
            v-for="article of savedArticles"
            :key="article.id"
            class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100"
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
                <p class="text-lg font-bold bg-gray-100 mx-4">
                  {{ article.title }}
                </p>
                <va-button
                  @click="removeSaved(article)"
                  flat
                  size="small"
                  class="mt-1"
                  >Remove</va-button
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
