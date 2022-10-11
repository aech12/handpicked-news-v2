export default defineNuxtRouteMiddleware(to => {
  const user = useSupabaseUser()

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  } else if (user.value && to.path === '/login') {
    return navigateTo('app')
  } else if (user.value && to.path === '/home') {
    return navigateTo('app')
  }
})
