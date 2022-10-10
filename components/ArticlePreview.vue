<template>
  <li class="row" v-if="article">
    <a
      :src="article.url"
      noreferrer
      noopener
      class="h-min m-4 max-w-xs rounded overflow-hidden shadow-lg cursor-pointer"
    >
      <!-- <img class="w-full" v-bind:src="article.urlToImage" alt="" /> -->
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ article.title }}</div>
        <p class="text-gray-700 text-base">
          {{ article.description }}
        </p>
      </div>
      <div class="px-6 pt-0 pb-4 space-x-2">
        <form class="flex gap-2 my-2" @submit.prevent="handleSubmit">
          <div v-if="fetching" class="w-full flex justify-center h-6">
            <Spinner />
          </div>
          <div v-else>
            <va-button type="submit" v-if="isArticleSaved" outline
              >Saved</va-button
            >
            <va-button type="submit" v-else> Save </va-button>
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
      return this.savedArticles.filter(
        item => item.title === this.article.title
      ).length > 0
        ? true
        : false
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
