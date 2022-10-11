// https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
// })

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys are only available on the server
    NEWSAPI_KEY: process.env.NEWSAPI_KEY,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    // Public keys that are exposed to the client
    public: {
      apiBase: '/api',
    },
  },
  head: {
    title: 'HandPicked - Alex/newsapi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'pickedNEWS',
        content: 'pickedNEWS - Official Nuxt.js starter for CodeSandBox',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ssr: true,
  },
  modules: ['@nuxtjs/supabase', '@vuestic/nuxt', '@nuxtjs/tailwindcss'],
})
