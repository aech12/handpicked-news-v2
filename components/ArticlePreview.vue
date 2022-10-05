<template>
  <li class="row">
    <div
      class="h-min m-4 max-w-xs rounded overflow-hidden shadow-lg cursor-pointer"
    >
      <img class="w-full" v-bind:src="imgUrl" alt="" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ title }}</div>
        <p class="text-gray-700 text-base">
          {{ description }}
        </p>
      </div>
      <div class="px-6 pt-0 pb-4 space-x-2">
        <form class="flex gap-2 my-2" @submit.prevent="addSaved(title)">
          <va-button
            @click="removeSavedArticle(title)"
            v-if="saves && saves.includes(title)"
            outline
            >Saved</va-button
          >
          <va-button type="submit" v-else> Save </va-button>
        </form>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  methods: {
    async isArticleSaved(title) {
      if (saves.length > 0) {
        const saved = saves.filter((item) => item.title === title);
        console.log("saved", saved);
        return saved ? true : false;
      }
    },

    async removeSavedArticle(title) {
      if (saves.length > 0) {
        const saved = saves.filter((item) => item.title === title);
        removeSaved(saved[0]);
      }
    },
  },
};
</script>

<script setup>
const props = defineProps({
  title: String,
  imgUrl: String,
  description: String,
  saves: [String],
  loading: String,
  addSaved: Function,
  removeSaved: Function,
});
</script>
