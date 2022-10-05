<template>
  <div>
    <select
      :name="name"
      v-model="selected"
      @input="handleChange($event)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option disabled value="">{{ category }}</option>
      <option v-for="option in options" v-bind:value="option.paramVal">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    selected: String,
    options: [String],
    category: String,
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleChange(e) {
      //   console.dir(e.target.value);
      //   console.dir(e.target.name);
      this.$emit("update", e);
    },
  },
};
</script>
