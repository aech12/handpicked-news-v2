export default defineNuxtRouteMiddleware(to => {
  const user = useSupabaseUser()

  // protected routes
  if (!user.value && to.path === '/saved') {
    return navigateTo('/login')
  }
  // invalid routes (if user is logged in)
  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }
})
