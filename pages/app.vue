<template>
  <div class="max-w-3xl mx-auto mt-2 flex flex-col text-center items-center">
    <h2 class="text-3xl text-black w-full">News</h2>
    <div
      class="my-2 w-full max-w-xl flex flex-col md:items-center md:flex-row md:space-between space-y-2 md:space-y-0"
    >
      <div class="flex space-x-2 mx-4">
        <ListSelect
          name="country"
          :selected="countrySelected"
          :options="countries"
          category="Country"
          @update="
            (event) => {
              countrySelected = event.target.value;
              onParamsShouldUpdate(event);
            }
          "
        />
        <ListSelect
          name="category"
          :selected="categorySelected"
          :options="categories"
          category="Category"
          @update="
            (event) => {
              categorySelected = event.target.value;
              onParamsShouldUpdate(event);
            }
          "
        />
      </div>
      <SearchForm
        name="search"
        :search="search"
        @update="(value) => (search = value)"
        :onParamsShouldUpdate="onParamsShouldUpdate"
      />
    </div>
    <NewsHeadlines :articles="data" :pending="pending" :error="error" />
    <PageBar :page="page" :previousPage="previousPage" :nextPage="nextPage" />
  </div>
</template>

<script setup>
const page = ref(1);
const params = ref("");
// inputs
const search = ref("");
const searchParams = ref("");
const countrySelected = ref("");
const countries = ref([
  { text: "China", paramVal: "cn" },
  { text: "Netherlands", paramVal: "nl" },
  { text: "Singapore", paramVal: "si" },
  { text: "USA", paramVal: "us" },
]);
const categorySelected = ref("");
const categories = ref([
  { text: "Business", paramVal: "business" },
  { text: "General", paramVal: "general" },
  { text: "Science", paramVal: "science" },
  { text: "Sports", paramVal: "sports" },
  { text: "Technology", paramVal: "technology" },
]);

const { data, pending, error } = await useAsyncData(
  "getArticles",
  () =>
    $fetch(`/api/getArticles`, {
      params: {
        page: page.value,
        search: searchParams.value,
        country: countrySelected.value,
        category: categorySelected.value,
      },
    }),
  {
    watch: [params],
    headers: useRequestHeaders(["cookie"]),
  }
);

// methods
function previousPage() {
  if (page.value > 0) {
    params.value = updatePageInParams(params.value, page.value, page.value - 1);
    page.value--;
  }
}

function nextPage() {
  params.value = updatePageInParams(params.value, page.value, page.value + 1);
  page.value++;
}

function onParamsShouldUpdate(e) {
  //   console.log(e.target.value, "name", e.target.name);
  if (e.target.value === "") return;
  // reset state (except input that changed)
  if (e.target.name !== "country") countrySelected.value = "";
  if (e.target.name !== "category") categorySelected.value = "";
  page.value = 1;
  // // search 1st page
  params.value =
    `&page=1&` +
    encodeURIComponent(e.target.name) +
    "=" +
    encodeURIComponent(e.target.value);
  // TEMP FIX pass search with params to empty input
  if (e.target.name === "search") {
    searchParams.value = search.value;
  } else {
    searchParams.value = "";
  }
  search.value = "";
}

function updatePageInParams(params, page, newPage) {
  return params.replace(page, newPage);
}

definePageMeta({
  middleware: ["auth"],
  layout: "base",
});
</script>

<style></style>
