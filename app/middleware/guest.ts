// Ported from old middleware/guest.js — keep logged-in users off guest pages.
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  if (auth.isLoggedIn) {
    return navigateTo('/')
  }
})
