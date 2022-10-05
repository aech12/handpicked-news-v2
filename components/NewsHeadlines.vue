<template>
  <div>
    <p v-if="pending" class="pb-4 pt-2">Fetching...</p>
    <div v-else-if="error" class="pb-4 pt-2">
      <p>Error fetching</p>
    </div>
    <ul v-else class="w-full grid grid-cols-1 md:grid-cols-2 md:grid-cols-3">
      <ArticlePreview
        v-for="article in articles"
        :key="article.title"
        :title="article.title"
        :imgUrl="article.urlToImage"
        :description="article.description"
        :saves="saves"
        :loading="loading"
        :addSaved="addSaved"
        :removeSaved="removeSaved"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Saved } from "~/types/saves";

const props = defineProps({
  pending: null,
  error: null,
  articles: [],
});

// SAVED ARTICLES
const client = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(null);
// const newSaved = ref("SOME TITLE");

// initial fetch
const { data: saves } = await useAsyncData("saves", async () => {
  const { data } = await client
    .from<Saved>("saves")
    .select("id, title")
    .eq("user", user.value.id)
    .order("created_at");

  // TEMP FiX: adding this map to filter more easily on ArticlePreview
  return data.map((saved) => saved.title);
});

async function addSaved(title) {
  if (title.trim().length === 0) {
    return;
  }
  loading.value = true;

  const { data } = await client.from<Saved>("saves").upsert({
    user: user.value.id,
    title,
  });
  console.log("e", data);

  saves.value.push(data[0]);
  loading.value = false;
}

const removeSaved = async (saved: Saved) => {
  saves.value = saves.value.filter((t) => t.id !== saved.id);
  await client.from<Saved>("saves").delete().match({ id: saved.id });
};
// SAVED ARTICLES END
</script>
