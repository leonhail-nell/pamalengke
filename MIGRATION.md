# Migration guide: Nuxt 2 → Nuxt 4

This scaffold gives you a working **Nuxt 4** foundation (verified: `npm run build`
passes). The remaining work is porting the **23 pages**, **40 components**,
**8 Vuex stores**, **14 plugins**, and **6 layouts** from the old repo. Below is
the pattern for each.

> **Nuxt 4 paths:** all source now lives under `app/` (the new default
> `srcDir`). So old `components/` → `app/components/`, `pages/` → `app/pages/`,
> `store/` → `app/stores/`, etc. `nuxt.config.ts`, `public/`, and `server/`
> stay at the project root.
>
> **Core flow already ported (mock data):** the browse → cart → checkout path
> is live and verified (`npm run build` passes). Done so far:
> - Layout: `Searchbar` (header), `Navbar`, `Footer`, `Logo`, mobile drawer
> - Stores (Pinia): `main` (menus), `products`, `cart`, `popup`, `search`, `auth`
> - Components: `ProductGrid`, `Steps`, `VendorList`, `BasketModal`, `AddToCartPopUp`
> - Pages: home, `products/[slug]`, `products/[category]/[id]`, `search`,
>   `vendor/[slug]`, `vendor/product/[slug]`, `checkout`, `login`, `profile`,
>   plus stubs (terms, privacy, faqs, return, merchant_form, rider_form)
> - Mock data in `app/utils/mock.ts` powers everything while the backend is down.
>   When the API returns, each store's `try/catch` already falls back to live data.
>
> **Simplified vs. the original (revisit when needed):**
> - Checkout is a single page (old was a multi-step wizard under `checkout/`).
> - Login is a mock form (old used OAuth hash + `auth-details`).
> - Product filter is a simple price range (old used `vue-slider-component`).
> - Static page bodies (terms/privacy/faqs/return) are placeholders.
>
> **PWA:** left out by default — `@vite-pwa/nuxt` pulls legacy transitive deps
> (`workbox-build`) that break the build in some environments. To re-add:
> `npm i -D @vite-pwa/nuxt`, add `'@vite-pwa/nuxt'` to `modules`, and restore the
> `pwa: { manifest: {...} }` block in `nuxt.config.ts`.

## Golden rules

1. **Vue 2 Options API still works in Vue 3.** Most components will run with
   small tweaks; you do not have to rewrite everything into `<script setup>`.
2. **Migrate per route.** Bring over one page + its components, get it
   rendering, then move on. Don't big-bang it.
3. **Auto-imports.** Components in `/components`, composables in `/composables`,
   and stores in `/stores` are auto-imported. Delete manual `import` lines.

## Components (`components/`)

- Copy the `.vue` file over as-is.
- Remove `import X from '~/components/X.vue'` + the `components: { X }` block —
  auto-import handles it.
- `<nuxt-link>` → `<NuxtLink>`. `<Nuxt />` → `<slot />` (layouts only).
- `.native` event modifiers are gone; bind the event directly.
- Filters (`{{ x | money }}`) are removed in Vue 3 — convert to a method or
  composable (see plugins below).

## Pages (`pages/`)

- Dynamic routes rename: `_slug.vue` → `[slug].vue`,
  `_category/_id.vue` → `[category]/[id].vue`, catch-all `*` → `[...slug].vue`.
- `asyncData()` / `fetch()` → `useAsyncData()` / `useFetch()` in `<script setup>`,
  or keep Options API and use the `setup()` return. See `pages/index.vue`.
- `head()` → `useHead({ ... })`.
- `middleware: 'auth'` → `definePageMeta({ middleware: 'auth' })`.
- `layout: 'checkout'` → `definePageMeta({ layout: 'checkout' })`.

| Old page                     | New path                          |
| ---------------------------- | --------------------------------- |
| `pages/products/_slug.vue`   | `pages/products/[slug].vue`       |
| `pages/products/_category/_id.vue` | `pages/products/[category]/[id].vue` |
| `pages/promo/_slug.vue`      | `pages/promo/[slug].vue`          |
| `pages/vendor/_slug.vue`     | `pages/vendor/[slug].vue`         |
| `pages/vendor/product/_slug.vue` | `pages/vendor/product/[slug].vue` |
| router catch-all `*`         | handled by `error.vue` (done)     |

## Stores (Vuex `store/` → Pinia `stores/`)

`index.ts` and `auth.ts` are already ported as the reference pattern. For the
rest (`cart`, `checkout`, `order`, `pop_up`, `products`, `search`):

- `state()` → `state: () => ({...})` (same).
- `getters` → `getters` (same, but `state => ...` becomes `(state) => ...`).
- `mutations` → delete them; mutate state directly inside actions.
- `actions` → `actions`, but `this.$axios` → `const api = useApi()`,
  and `commit('x', v)` → `this.x = v`.
- Usage: `this.$store.dispatch('cart/add', p)` → `useCartStore().add(p)`.
- Add `persist: true` to any store that needs localStorage (was the old
  `nuxt-vuex-localstorage` list: `index`, `auth`).
- `nuxtServerInit` → already replaced by `plugins/init.server.ts`.

## Plugins (`plugins/`)

| Old plugin                     | New approach                                            |
| ------------------------------ | ------------------------------------------------------ |
| `auth.js` (token from hash)    | route middleware or `plugins/auth.client.ts`           |
| `date.js` (moment)             | composable using `dayjs` (installed)                   |
| `money.js` (currency filter)   | `composables/useMoney.ts` — filters don't exist in v3  |
| `vee-validate.js`              | replaced by `@vee-validate/nuxt` module                |
| `notification.js`             | swap `vue-notification` for a v3 lib (e.g. `vue-toastification@next` or `@kyvg/vue3-notification`) |
| `spinner.js`, `vue-rate.js`, `vue-slider-component.js`, `vue-magnifier.js`, `vue-social-sharing.js`, `vue-paginate.js`, `vue-fb-customer-chat.js`, `vue-viewport.js` | each needs a Vue 3 compatible replacement — see note below |
| `cart.js`                      | move logic into the Pinia cart store                   |

### Vue 2-only libraries that need replacing

These do **not** support Vue 3 and have no drop-in upgrade; pick a v3 equivalent:

- `vue-notification` → `@kyvg/vue3-notification`
- `vuejs-paginate` → `@hennge/vue3-pagination` or build a small component
- `vue-rate` → `vue3-star-ratings`
- `vue-slider-component` → `vue-slider-component@next` (v4 supports Vue 3)
- `@bachdgvn/vue-otp-input` → `vue3-otp-input`
- `@chenfengyuan/vue-carousel` → `vue3-carousel`
- `vue-magnifier`, `vue-check-view`, `vue-fb-customer-chat` → find v3 forks or reimplement

## Layouts (`layouts/`)

- `<Nuxt />` → `<slot />` (done in `default.vue`).
- Remove component imports (auto-imported).
- `default`, `blank` are scaffolded; port `checkout`, `orders`, `profile` the
  same way.

## Suggested order

1. `npm install` and `npm run dev` — confirm the scaffold boots.
2. Port the global pieces: `Footer`, `Searchbar`/`Navbar`, layouts.
3. Port `pages/index.vue` content + the `Product` components.
4. Auth flow: `login`, `callback`, auth store + middleware.
5. Cart → checkout → orders.
6. Remaining static pages (`faqs`, `terms`, `privacy`, `return`, etc.) — easy.
