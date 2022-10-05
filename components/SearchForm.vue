<template>
  <form
    :name="name"
    @submit.prevent="onParamsShouldUpdate($event)"
    class="h-full mx-16 md:mx-0 flex items-center"
  >
    <input
      type="text"
      :value="search"
      @input="$emit('update', $event.target.value)"
      placeholder="search news"
      class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
    />
    <va-button type="submit" :rounded="false">Find</va-button>
  </form>
</template>

<script>
export default {
  emits: ["update:modelValue"],
};
</script>

<script setup>
const props = defineProps({
  modelValue: String,
  search: String,
  onParamsShouldUpdate: Function,
  name: String,
});
</script>
