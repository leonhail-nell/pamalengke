import type { $Fetch } from 'ofetch'

/**
 * Replacement for the old @nuxtjs/axios module.
 *
 * Old:  this.$axios.get('api/public/...')      (baseURL set in nuxt.config)
 * New:  const api = useApi(); api('api/public/...')
 *
 * The bearer token is read from the auth store and attached automatically.
 */
export function useApi(): $Fetch {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      // Attach auth token if present (client + SSR via cookie).
      const token = useCookie<string>('token').value
      if (token) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${token}`)
      }
    }
  })
}
