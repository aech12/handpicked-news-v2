<script setup lang="ts">
import { definePageMeta } from '#imports'
import SignForm from '../components/SignForm.vue'

definePageMeta({
  middleware: ['auth'],
  layout: 'base',
  pageTransition: { name: 'fade', mode: 'out-in' },
  layoutTransition: { name: 'slide', mode: 'out-in' },
})

const client = useSupabaseClient()

const signUp = async (email: string, password: string) =>
  await client.auth.signUp({ email, password })

const login = async (email: string, password: string) =>
  await client.auth.signIn({ email, password })

const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo('/')
    }
  })
})
</script>

<template>
  <SignForm :signUp="signUp" :login="login" />
</template>
