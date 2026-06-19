import { defineStore } from 'pinia'
import { mockOrders, type Order } from '~/utils/mock'

// Ported from Vuex store/order.js. Falls back to mock orders when offline.
export const useOrderStore = defineStore('order', {
  state: () => ({
    orders_by_user: [] as Order[],
    order_details: null as Order | null
  }),

  actions: {
    async getAllOrdersByUser() {
      const api = useApi()
      try {
        const res: any = await api('api/authorized/order')
        this.orders_by_user = res.data ?? []
      } catch {
        this.orders_by_user = mockOrders
      }
    },
    selectOrder(id: number) {
      this.order_details = this.orders_by_user.find((o) => o.id === id) ?? null
    }
  }
})
