<template>
  <div>
    <select
      :name="name"
      v-model="selected"
      @input="$emit('updateInput', $event)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
      data-testid="select"
    >
      <option disabled value="">{{ capitalize(name) }}</option>
      <option
        v-for="item in items"
        v-bind:value="item.paramVal"
        data-testid="option"
      >
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    selected: String,
    // items: [{ text: String, paramVal: String }],
    items: Array,
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>
