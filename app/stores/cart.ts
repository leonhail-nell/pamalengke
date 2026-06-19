import { defineStore } from 'pinia'
import type { Product } from '~/utils/mock'

export interface BasketItem extends Product {
  quantity: number
  total: number
  src?: string
}

// Ported from Vuex store/cart.js. Mutations became plain actions.
// Persisted to localStorage (was nuxt-vuex-localstorage).
export const useCartStore = defineStore('cart', {
  state: () => ({
    promos: [] as BasketItem[],
    non_promos: [] as BasketItem[],
    delivery_charge: 65,
    vendor_id: null as number | null
  }),

  getters: {
    allOrders: (s): BasketItem[] => [...s.promos, ...s.non_promos],
    count(): number {
      return this.allOrders.reduce((n, i) => n + i.quantity, 0)
    },
    grand_total(): number {
      return this.allOrders.reduce((sum, i) => sum + i.total, 0)
    }
  },

  actions: {
    addToBasket(product: Product) {
      // One vendor per basket (old behavior).
      if (this.non_promos.length && this.non_promos[0].vendor_id !== product.vendor_id) {
        this.non_promos = []
      }
      const existing = this.non_promos.find((el) => el.id === product.id)
      if (existing) {
        existing.quantity++
        existing.total = existing.price * existing.quantity
      } else {
        this.non_promos.push({
          ...product,
          quantity: 1,
          src: product.image_md,
          total: product.price
        })
      }
      this.vendor_id = product.vendor_id
    },

    increment(item: Product) {
      const it = this.non_promos.find((el) => el.id === item.id)
      if (it) {
        it.quantity++
        it.total = it.price * it.quantity
      }
    },

    decrement(item: Product) {
      const idx = this.non_promos.findIndex((el) => el.id === item.id)
      if (idx === -1) return
      const it = this.non_promos[idx]
      it.quantity--
      it.total = it.price * it.quantity
      if (it.quantity <= 0) this.non_promos.splice(idx, 1)
    },

    setQuantity(item: Product, qty: number) {
      const idx = this.non_promos.findIndex((el) => el.id === item.id)
      if (idx === -1) return
      const it = this.non_promos[idx]
      if (qty <= 0) {
        this.non_promos.splice(idx, 1)
      } else {
        it.quantity = Math.min(qty, item.stocks || qty)
        it.total = it.price * it.quantity
      }
    },

    inCart(item: Product) {
      return this.non_promos.some((el) => el.id === item.id)
    },

    quantityOf(item: Product) {
      return this.non_promos.find((el) => el.id === item.id)?.quantity ?? 0
    },

    clear() {
      this.promos = []
      this.non_promos = []
      this.vendor_id = null
    }
  },

  persist: true
})
