<script setup lang="ts">
import { Saved } from "~/types/saves";

definePageMeta({
  middleware: "auth",
  layout: "base",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(null);

const { data: saves } = await useAsyncData("saves", async () => {
  const { data } = await client
    .from<Saved>("saves")
    .select("id, title")
    .eq("user", user.value.id)
    .order("created_at");

  return data;
});

async function addSaved() {
  if (newSaved.value.trim().length === 0) {
    return;
  }
  loading.value = true;

  const { data } = await client.from<Saved>("saves").upsert({
    user: user.value.id,
    title: newSaved.value,
  });
  saves.value.push(data[0]);
  newSaved.value = "";
  loading.value = false;
}

const removeSaved = async (saved: Saved) => {
  saves.value = saves.value.filter((t) => t.id !== saved.id);
  await client.from<Saved>("saves").delete().match({ id: saved.id });
};
</script>

<template>
  <div class="max-w-3xl mx-auto mt-2 flex flex-col text-center items-center">
    <h2 class="text-3xl text-black w-full">Saved</h2>
    <div class="w-full my-[50px]">
      <form class="flex gap-2 my-2" @submit.prevent="addSaved">
        <button type="submit" variant="white">
          {{ loading ? "SpinningIcon" : "Mock Add" }}
        </button>
      </form>
      <div v-if="saves.length > 0" body-class="px-6 py-2 overflow-hidden">
        <ul>
          <li
            v-for="saved of saves"
            :key="saved.id"
            class="border-b border-gray-200 divide-y divide-gray-200"
          >
            <div class="py-2">
              <div
                :label="saved.title"
                :name="String(saved.id)"
                wrapper-class="flex items-center justify-between w-full"
              >
                <p class="text-lg font-bold bg-gray-100 mx-4">
                  {{ saved.title }}
                </p>
                <va-button
                  @click="removeSaved(saved)"
                  flat
                  size="small"
                  class="mt-1"
                  >Remove</va-button
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
