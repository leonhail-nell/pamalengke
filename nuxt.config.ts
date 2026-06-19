import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  // Nuxt 4 uses the app/ directory as srcDir by default — source lives in app/.
  // Vercel is auto-detected at build time; no nitro preset required.

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint'
    // PWA: re-enable by reinstalling '@vite-pwa/nuxt' and adding it here.
    // Left out by default because workbox-build pulls legacy transitive deps.
  ],

  css: ['~/assets/css/main.css'],

  // Tailwind v4 is wired via its Vite plugin (the @nuxtjs/tailwindcss module
  // is still Tailwind v3 only). Config is CSS-first — see app/assets/css/main.css.
  vite: {
    plugins: [tailwindcss()]
  },

  // Runtime config replaces @nuxtjs/dotenv. Set NUXT_PUBLIC_API_BASE in Vercel.
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://app.pamalengke.ph'
    }
  },

  app: {
    head: {
      title: 'Pamalengke',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Panabo Public Online Market' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  }
})
