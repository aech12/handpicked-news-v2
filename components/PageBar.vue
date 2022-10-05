<template>
  <div class="">
    <va-button @click="previousPage()" outline class="mr-2 mb-2"
      >&lt;</va-button
    >
    <va-button outline class="mr-2 mb-2">{{ page }}</va-button>
    <va-button @click="nextPage()" outline class="mb-2">&gt;</va-button>
  </div>
</template>

<script setup>
const props = defineProps({
  page: Number,
  previousPage: Function,
  nextPage: Function,
});
</script>
