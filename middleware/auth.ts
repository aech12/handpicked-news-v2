export default defineNuxtRouteMiddleware(to => {
  const user = useSupabaseUser()

  // if user is NOT logged-in, show all pages
  // if (!user.value && to.path !== '/login') {
  //   return navigateTo('/login')
  // }
  // if user is logged-in, don't show /login page
  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }
})
