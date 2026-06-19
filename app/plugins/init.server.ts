// Replaces the old Vuex `nuxtServerInit` action from store/index.js.
// Runs on the server during initial render to preload the category menu.
export default defineNuxtPlugin(async () => {
  const store = useMainStore()
  await store.getMenus()
})
