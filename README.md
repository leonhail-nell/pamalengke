# Pamalengke — Nuxt 4

Panabo Public Online Market, rebuilt on the latest Nuxt 4 / Vue 3 stack. This
replaces the Nuxt 2 / Vue 2 codebase, both of which reached end-of-life in 2024.

Source lives in the **`app/`** directory (Nuxt 4's default `srcDir`).

## Stack (all latest as of build)

| Concern        | Old (Nuxt 2)              | New                                     |
| -------------- | ------------------------- | --------------------------------------- |
| Framework      | Nuxt 2 / Vue 2            | **Nuxt 4** / Vue 3.5 / vue-router 5     |
| HTTP           | `@nuxtjs/axios`           | `$fetch` via `app/composables/useApi.ts`|
| State          | Vuex (`store/`)           | **Pinia 3** (`app/stores/`) + persist   |
| Local storage  | `nuxt-vuex-localstorage`  | `pinia-plugin-persistedstate` 4         |
| Env vars       | `@nuxtjs/dotenv`          | built-in `runtimeConfig`                |
| Cookies        | `cookie-universal-nuxt`   | built-in `useCookie`                    |
| Validation     | vee-validate 3            | `@vee-validate/nuxt` 4                   |
| CSS            | `@nuxtjs/tailwindcss` v3  | **Tailwind v4** via `@tailwindcss/vite` |
| Lint           | `@nuxtjs/eslint-*`        | `@nuxt/eslint` + ESLint 10              |
| PWA            | `@nuxtjs/pwa`             | `@vite-pwa/nuxt`                        |

> Tailwind v4 is CSS-first: theme customization lives in
> `app/assets/css/main.css` (`@theme { ... }`), not a `tailwind.config.js`.

## Local dev

```bash
npm install
cp .env.example .env   # adjust NUXT_PUBLIC_API_BASE if needed
npm run dev            # http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → import the repo.**
3. Vercel auto-detects Nuxt — leave build settings default.
4. Add env var **`NUXT_PUBLIC_API_BASE`** = `https://app.pamalengke.ph`.
5. Deploy. SSR runs as Vercel serverless functions automatically.

No `nitro.preset` is needed on Vercel — it is detected at build time. If you
ever deploy elsewhere, set `nitro: { preset: 'vercel' }` in `nuxt.config.ts`.

> **Heads up:** the frontend depends on the backend API at
> `https://app.pamalengke.ph`. If that backend is offline, pages render but
> show no data. Confirm the backend is live before relying on the deploy.

See `MIGRATION.md` for how to port the remaining pages and components.
