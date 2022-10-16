<template>
  <form
    :name="name"
    @submit.prevent="$emit('handleSubmit', $event)"
    class="h-full mx-16 md:mx-0 flex items-center"
  >
    <input
      type="text"
      :value="search"
      placeholder="search news"
      class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
    />
    <!-- <button type="submit" :rounded="false">Find</button> -->
    <button
      class="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-4 py-2 text-center mr-2 mb-2"
      type="submit"
      :rounded="false"
    >
      Find
    </button>
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
