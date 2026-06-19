import { defineStore } from 'pinia'
import type { BasketItem } from '~/stores/cart'

// Ported from Vuex store/pop_up.js — UI toggles for basket modal,
// search overlay, and the transient "added to cart" toast items.
export const usePopupStore = defineStore('popup', {
  state: () => ({
    item: [] as BasketItem[],
    search_toggle: false,
    modal: false
  }),

  actions: {
    toggleModal(value?: boolean) {
      this.modal = value ?? !this.modal
    },
    toggleSearch() {
      this.search_toggle = !this.search_toggle
    },
    addItem(item: BasketItem) {
      this.item.push(item)
      setTimeout(() => this.removeItem(), 3000)
    },
    removeItem() {
      this.item.shift()
    }
  }
})
