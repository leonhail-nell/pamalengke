import { defineStore } from 'pinia'
import { mockMenus } from '~/utils/mock'

// Root store (was Vuex store/index.js). Loads the category menu tree.
export const useMainStore = defineStore('main', {
  state: () => ({
    menus: [] as any[],
    baranggays: [] as any[]
  }),

  getters: {
    menuTree: (state) => state.menus
  },

  actions: {
    async getMenus() {
      const api = useApi()
      try {
        const res: any = await api('api/public/product-department', {
          params: {
            include: 'product_categories.product_sub_categories',
            sort_by: 'created_at',
            sort_desc: 1
          }
        })
        this.menus = (res.data ?? []).map((d: any) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          product_categories: d.product_categories.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            product_sub_categories: (c.product_sub_categories?.data ?? []).map((s: any) => ({
              id: s.id,
              name: s.name,
              slug: s.slug
            }))
          }))
        }))
      } catch {
        // Backend offline → use mock so the UI still works.
        this.menus = mockMenus
      }
    }
  },

  persist: true
})
