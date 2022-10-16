<template>
  <div class="my-2">
    <va-button data-testid="prevpage" @click="previousPage()" outline class="mr-2 mb-2"
      >&lt;</va-button
    >
    <va-button outline class="mr-2 mb-2">{{ page }}</va-button>
    <va-button data-testid="nextpage" @click="nextPage()" outline class="mb-2"
      >&gt;</va-button
    >
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    previousPage: Function,
    nextPage: Function,
  },
}
</script>
