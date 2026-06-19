import { defineStore } from 'pinia'
import { mockProducts, type Product } from '~/utils/mock'

// Ported from Vuex store/search.js. Mock search filters the mock catalog.
export const useSearchStore = defineStore('search', {
  state: () => ({
    search: '',
    products: [] as Product[],
    total_pages: 0
  }),

  actions: {
    setSearch(keyword: string) {
      this.search = keyword
    },

    async doSearch(payload: { search: string; page?: number }) {
      const api = useApi()
      this.search = payload.search
      try {
        const res: any = await api('api/public/search-product', {
          params: { page: payload.page ?? 1, limit: 20, search: payload.search, only_available: 1, include: 'image' }
        })
        this.total_pages = res.meta?.pagination?.total_pages ?? 1
        this.products = (res.data ?? [])
          .filter((o: any) => o.type === 'product')
          .map((el: any) => ({
            id: el.id, name: el.description, discount: el.discount,
            price: el.discount > 0 ? el.price - (el.discount / 100) * el.price : el.price,
            not_discouted_price: el.price,
            image_md: el.image?.data?.medium_image, image_sm: el.image?.data?.small_image,
            image_lg: el.image?.data?.large_image, stocks: el.stocks
          }))
      } catch {
        const q = payload.search.toLowerCase().trim()
        this.products = q
          ? mockProducts.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
          : mockProducts
        this.total_pages = 1
      }
    }
  }
})
