<template>
  <li class="row" v-if="article">
    <a
      :href="article.url"
      noreferrer
      noopener
      class="h-min m-4 max-w-xs bg-gray-900 rounded overflow-hidden shadow-lg cursor-pointer"
      data-testid="article-a"
    >
      <img
        v-if="article?.urlToImage"
        class="w-full"
        v-bind:src="article.urlToImage"
        alt="article poster"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ article.title }}</div>
        <p class="text-gray-300 text-base">
          {{ article.description }}
        </p>
      </div>
      <div class="px-6 pt-0 pb-4 space-x-2">
        <form class="flex gap-2 my-2" @submit.prevent="handleSubmit">
          <div v-if="fetching" class="w-full flex justify-center h-6">
            <Spinner />
          </div>
          <div v-else>
            <button
              class="text-white border border-gray-200 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-4 py-2 text-center mr-2 mb-2"
              type="submit"
              v-if="isArticleSaved"
              outline
            >
              Saved
            </button>
            <button
              class="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-4 py-2 text-center mr-2 mb-2"
              type="submit"
              v-else
            >
              Save
            </button>
          </div>
        </form>
        <p v-if="error" class="text-red-400">ERROR! {{ error.message }}</p>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  data: () => ({
    fetching: false,
    error: null,
  }),
  computed: {
    isArticleSaved: function () {
      if (this.savedArticles && this.savedArticles.length) {
        return this.savedArticles.filter(
          item => item.title === this.article.title
        ).length > 0
          ? true
          : false
      } else return false
    },
  },
  methods: {
    async handleSubmit() {
      this.error = null
      this.fetching = true

      // call addArticle() if it's not saved, else delete
      const { data, error } = this.isArticleSaved
        ? await this.removeSavedArticle(this.article)
        : await this.saveArticle(this.article)

      if (error) this.error = error

      this.fetching = false
    },
  },
  props: {
    article: Object,
    savedArticles: Array,
    saveArticle: Function,
    removeSavedArticle: Function,
  },
}
</script>
