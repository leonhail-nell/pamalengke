import { defineStore } from 'pinia'
import { mockProducts, mockPromos, mockVendors, type Product } from '~/utils/mock'

// Ported from Vuex store/products.js. Falls back to mock data when offline.
export const useProductsStore = defineStore('products', {
  state: () => ({
    promos: [] as Product[],
    products: [] as Product[],
    vendors_profile: [] as any[],
    filtered_products: [] as Product[],
    product_detail: null as Product | null
  }),

  actions: {
    async getProducts() {
      const api = useApi()
      try {
        const res: any = await api('api/public/product', {
          params: { include: 'vendor,image,product_sub_category.product_category', limit: 24, page: 1 }
        })
        this.products = mapProducts(res.data)
      } catch {
        this.products = mockProducts
      }
    },

    async getPromos() {
      const api = useApi()
      try {
        const res: any = await api('api/public/promo-product', {
          params: { include: 'image,promo_product_category', ppc: 'hot-promos', limit: 12, page: 1, only_available: 1 }
        })
        this.promos = mapProducts(res.data)
      } catch {
        this.promos = mockPromos
      }
    },

    async getVendors() {
      const api = useApi()
      try {
        const res: any = await api('api/public/vendor-product', {
          params: { include: 'products.image,products.product_sub_category.product_category' }
        })
        this.vendors_profile = res.data.map((el: any) => ({
          id: el.id, company_name: el.company_name, slug: el.slug,
          avatar: el.avatar, address: el.address, building_photo: el.building_photo
        }))
      } catch {
        this.vendors_profile = mockVendors
      }
    },

    async getFilteredProducts(payload: { category_slug?: string } = {}) {
      const api = useApi()
      try {
        const res: any = await api('api/public/product', {
          params: { include: 'image,product_sub_category.product_category', limit: 24, page: 1, only_available: 1, ...payload }
        })
        this.filtered_products = mapProducts(res.data)
      } catch {
        // Mock: filter by category slug if given, else show all.
        this.filtered_products = payload.category_slug
          ? mockProducts.filter((p) => p.category_slug === payload.category_slug)
          : mockProducts
        if (this.filtered_products.length === 0) this.filtered_products = mockProducts
      }
    },

    setProductDetail(p: Product) {
      this.product_detail = p
    }
  }
})

// Mirrors the field mapping the old API actions did.
function mapProducts(rows: any[]): Product[] {
  return (rows ?? []).map((el: any) => ({
    id: el.id,
    vendor_id: el.vendor_id,
    name: el.description ?? el.name,
    desc: el.description,
    discount: el.discount,
    price: el.discount > 0 ? el.price - (el.discount / 100) * el.price : el.price,
    not_discouted_price: el.price,
    image_md: el.image?.data?.medium_image,
    image_sm: el.image?.data?.small_image,
    image_lg: el.image?.data?.large_image,
    stocks: el.stocks,
    slug: el.slug
  }))
}
