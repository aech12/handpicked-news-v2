<template>
  <div class="max-w-3xl mx-auto mt-2 flex flex-col text-center items-center">
    <h2 class="text-3xl text-black w-full">News</h2>
    <div
      class="my-2 w-full max-w-xl flex flex-col md:items-center md:flex-row md:space-between space-y-2 md:space-y-0"
    >
      <div class="flex space-x-2 mx-2">
        <ListSelect
          name="country"
          :selected="countrySelected"
          :items="countries"
          @updateInput="
            event => {
              countrySelected = event.target.value
              onParamsShouldUpdate(event)
            }
          "
        />
        <ListSelect
          name="category"
          :selected="categorySelected"
          :items="categories"
          @updateInput="
            event => {
              categorySelected = event.target.value
              onParamsShouldUpdate(event)
            }
          "
        />
      </div>
      <SearchForm
        name="search"
        :search="search"
        @input="e => (search = e.target.value)"
        @handleSubmit="e => onParamsShouldUpdate(e)"
      />
    </div>
    <NewsHeadlines :articles="articles" :pending="pending" :error="error" />
    <PageBar :page="page" :previousPage="previousPage" :nextPage="nextPage" />
  </div>
</template>

<script setup>
const page = ref(1)
// inputs state
const search = ref('argentina football')
const countrySelected = ref('')
const countries = ref([
  { text: 'China', paramVal: 'cn' },
  { text: 'Netherlands', paramVal: 'nl' },
  { text: 'Singapore', paramVal: 'si' },
  { text: 'USA', paramVal: 'us' },
])
const categorySelected = ref('')
const categories = ref([
  { text: 'Business', paramVal: 'business' },
  { text: 'General', paramVal: 'general' },
  { text: 'Science', paramVal: 'science' },
  { text: 'Sports', paramVal: 'sports' },
  { text: 'Technology', paramVal: 'technology' },
])

const {
  data: articles,
  pending,
  error,
  refresh,
} = await useAsyncData(
  'getArticles',
  () =>
    $fetch(`/api/getArticles`, {
      params: {
        page: page.value,
        search: encodeURIComponent(search.value.toLocaleLowerCase()),
        country: encodeURIComponent(countrySelected.value),
        category: encodeURIComponent(categorySelected.value),
      },
    }),
  {
    watch: [page],
    headers: useRequestHeaders(['cookie']),
  }
)

// methods
function previousPage() {
  if (page.value > 0) {
    page.value--
  }
}

function nextPage() {
  page.value++
}

function onParamsShouldUpdate(e) {
  // console.log(e.target.name)
  // console.log(e.target.value)

  if (e.target.value === '') return

  // set fetch params for null EITHER search OR select
  if (e.target.name === 'search') {
    countrySelected.value = ''
    categorySelected.value = ''
  } else {
    search.value = ''
  }
  page.value = 1
  refresh()
}

definePageMeta({
  middleware: ['auth'],
  layout: 'base',
})
</script>

<style></style>
