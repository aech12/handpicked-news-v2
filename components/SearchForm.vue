<template>
  <form
    :name="name"
    @submit.prevent="$emit('handleSubmit', $event)"
    class="h-full mx-8 md:mx-0 flex items-center"
  >
    <input
      type="text"
      :value="search"
      placeholder="search news"
      class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-cyan-500 focus:border-cyan-500"
      data-testid="search-input"
    />
    <button
      class="px-3.5 py-2.5 text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-center"
      type="submit"
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
