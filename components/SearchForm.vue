<template>
  <form
    :name="name"
    @submit.prevent="
      $emit('handleSubmit', $event)
    "
    class="h-full mx-16 md:mx-0 flex items-center"
  >
    <input
      type="text"
      :value="search"
      placeholder="search news"
      class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
    />
    <va-button type="submit" :rounded="false">Find</va-button>
  </form>
</template>

<script>
export default {
  props: {
    // modelValue: String,
    search: String,
    name: String,
  },
  // emits: ['update:modelValue'],
}
</script>
