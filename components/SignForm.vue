<script>
export default {
  props: {
    login: Function,
    signUp: Function,
  },
  data: () => ({
    email: '',
    password: '',
    isSignUp: false,
    pending: false,
    error_auth: null,
    checkEmailMsg: false,
  }),
  methods: {
    async sign() {
      const signUpRoute = this.isSignUp === true
      this.pending = true

      const { user, error } =
        signUpRoute === true
          ? await this.signUp(this.email, this.password)
          : await this.login(this.email, this.password)
      if (error) this.error_auth = error.message

      if (signUpRoute) this.checkEmailMsg = true
      setTimeout(function () {
        this.checkEmailMsg = false
      }, 4000)

      this.pending = false
    },
  },
}
</script>

<template>
  <div class="max-w-lg mx-auto mt-8 flex flex-col text-center items-center">
    <h1 class="text-3xl w-full">
      {{ isSignUp ? 'Sign up' : 'Login' }}
    </h1>
    <form
      @submit.prevent="sign"
      class="flex flex-col gap-1 mt-4 w-80"
      data-testid="form"
    >
      <input
        type="email"
        label="Email"
        placeholder="Email"
        v-model="email"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        data-testid="email"
        required
      />
      <input
        type="password"
        label="Password"
        placeholder="Password"
        v-model="password"
        data-testid="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
        minLength="8"
      />
      <div>
        <p
          class="my-2 text-red-400 cursor-pointer"
          @click="() => (error_auth = null)"
        >
          {{ error_auth }}
        </p>
        <va-button
          text-color="secondary"
          flat
          class="mr-2 mb-2"
          @click="isSignUp = !isSignUp"
          data-testid="swapSignup"
        >
          <span v-if="isSignUp"> Log in instead </span>
          <span v-else> Create a new account </span>
        </va-button>
        <va-button class="mr-4 mb-2" type="submit" data-testid="submit">
          <Spinner v-if="pending" />
          <span v-else> Submit </span>
        </va-button>
      </div>
    </form>
    <p v-if="checkEmailMsg">Check your email!</p>
  </div>
</template>
