// Ported from old middleware/auth.js.
// Usage in a page:  definePageMeta({ middleware: 'auth' })
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  if (!auth.isLoggedIn) {
    return navigateTo('/login')
  }
})
