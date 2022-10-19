<template>
  <nav class="bg-black px-2 sm:px-4 sm:py-2 border-2 border-cyan-500">
    <div
      class="w-full max-w-3xl container flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between items-center mx-auto"
    >
      <div class="">
        <NuxtLink to="/app">
          <img src="~/assets/logo.png" />
        </NuxtLink>
      </div>
      <div class="">
        <div class="ml-auto w-min">
          <div v-if="user" class="space-x-2 flex">
            <button
              class="w-24 h-8 border-2 border-white flex-none text-white bg-transparent hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-sm font-bold hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
            >
              <NuxtLink v-if="inRouteSaved" to="/"> News </NuxtLink>
              <NuxtLink v-else to="/saved"> Saved </NuxtLink>
            </button>
            <button
              @click="handleSignout"
              class="w-24 h-8 flex-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300 rounded-sm font-bold hover:bg-cyan-700 focus:outline-none focus:ring-cyan-800"
            >
              <NuxtLink to="/login"> Log out </NuxtLink>
            </button>
          </div>
          <button
            v-else
            class="w-24 h-8 flex-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300 rounded-sm font-bold hover:bg-cyan-700 focus:outline-none focus:ring-cyan-800"
          >
            <NuxtLink to="/login"> Login </NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()
const route = useRoute()

const inRouteSaved = computed(() => route.path === '/saved')

async function handleSignout() {
  await client.auth.signOut()
  router.push({ path: '/login' })
}
</script>
