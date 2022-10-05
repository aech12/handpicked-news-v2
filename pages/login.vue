<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "base",
});

const email = ref("");
const password = ref("");
const isSignUp = ref(false);
const client = useSupabaseClient();

const signUp = async () => {
  console.log("signup");
  const { user, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  console.log("user", user);
  console.log("error", error);
};

const login = async () => {
  console.log("login");
  const { user, error } = await client.auth.signIn({
    email: email.value,
    password: password.value,
  });
  console.log("user", user);
  console.log("error", error);
};

const user = useSupabaseUser();
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo("/app");
    }
  });
});
</script>

<template>
  <div class="max-w-lg mx-auto mt-8 flex flex-col text-center items-center">
    <h1 class="text-3xl text-black w-full">Login</h1>
    <form
      @submit.prevent="() => (isSignUp ? signUp() : login())"
      class="flex flex-col gap-1 mt-4 w-80"
    >
      <va-input
        type="email"
        label="Email"
        v-model="email"
        class="mt-3"
        required
      />
      <va-input
        type="password"
        label="Password"
        v-model="password"
        class=""
        required
      />
      <div class="mt-2">
        <va-button
          text-color="dark"
          flat
          class="mr-2 mb-2"
          @click="isSignUp = !isSignUp"
        >
          <span v-if="isSignUp"> Log in instead </span>
          <span v-else> Create a new account </span>
        </va-button>
        <va-button class="mr-4 mb-2" type="submit">
          <span v-if="isSignUp"> Sign up </span>
          <span v-else> Log in </span>
        </va-button>
      </div>
    </form>
  </div>
</template>
