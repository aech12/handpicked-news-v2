<template>
  <div class="bg-gray-800 text-white min-h-screen">
    <!-- <NuxtLink to="/">home </NuxtLink>
    <NuxtLink to="app">app </NuxtLink>
    <NuxtLink to="login">login </NuxtLink>
    <NuxtLink to="saved">saved </NuxtLink> -->
    <AuthNavbar />
    <NuxtPage />
    <!-- <div class="h-screen bg-gray-600"></div> -->
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
