import { defineStore } from 'pinia'

// Ported from old Vuex store/auth.js -> Pinia.
// Old: this.$store.commit('auth/setLogin', true)
// New: const auth = useAuthStore(); auth.isLoggedIn = true
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    bearerToken: '',
    expiresIn: '',
    user: {} as Record<string, unknown>
  }),

  getters: {
    token: (s) => s.bearerToken
  },

  actions: {
    setSession(payload: { token: string; user: Record<string, unknown>; expiresIn: string }) {
      this.bearerToken = payload.token
      this.user = payload.user
      this.expiresIn = payload.expiresIn
      this.isLoggedIn = true
    },
    logout() {
      this.$reset()
      const token = useCookie('token')
      const user = useCookie('user')
      token.value = null
      user.value = null
    }
  },

  // Replaces nuxt-vuex-localstorage. Persisted to localStorage on the client.
  persist: true
})
