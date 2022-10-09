<template>
  <va-navbar color="dark">
    <template #left>
      <NuxtLink to="/app">
        <va-navbar-item class="text-lg hover:text-blue-400 transition">PickedNEWS</va-navbar-item>
      </NuxtLink>
    </template>
    <template #center>
      <va-navbar-item></va-navbar-item>
    </template>
    <template #right>
      <div v-if="user" class="space-x-2">
        <NuxtLink to="/saved">
          <va-button outline :rounded="false" color="white" text-color="white">
            Saved
          </va-button>
        </NuxtLink>
        <va-button :rounded="false" @click="handleSignout"> Log out </va-button>
      </div>
      <NuxtLink v-else to="/login">
        <va-button :rounded="false"> Login </va-button>
      </NuxtLink>
    </template>
  </va-navbar>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

async function handleSignout() {
  await client.auth.signOut();
  router.push({ path: "/login" });
}
</script>
