<template>
  <div class="w-full">
    <div class="sticky top-0 bg-white">
      <div class="h-16 w-full bg-green-200 flex justify-between items-center">
        <div class="font-bold pl-8 py-4 flex items-center">
          <svg class="fill-current text-grey-darkest h-8 inline mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" /></svg>
          My Basket
        </div>
        <div class="mr-6 my-4">
          <NuxtLink v-if="cart.allOrders.length > 0" to="/checkout" class="flex justify-center py-2 px-4 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white" @click="popup.toggleModal(false)">
            Checkout
          </NuxtLink>
        </div>
      </div>
      <div class="flex justify-between border-b p-4">
        <p class="text-sm font-bold">{{ cart.allOrders.length ? 'TOTAL AMOUNT' : 'No items in your Basket!' }}</p>
        <p class="font-bold pr-4">{{ moneyFormat(cart.grand_total, '₱ ') }}</p>
      </div>
    </div>

    <div v-if="cart.allOrders.length === 0" class="my-10">
      <div class="flex justify-center"><div class="w-32"><img alt="" class="w-full" src="~/assets/images/logo.png"></div></div>
      <div class="px-10 py-6">
        <div v-for="menu in main.menus" :key="menu.id" class="p-1 rounded text-gray-700">
          <div class="font-bold text-sm hover:border-green-600 border-b flex justify-between cursor-pointer" @click="toggle(menu.id)">
            <span class="py-1 text-green-600">{{ menu.name }}</span>
          </div>
          <template v-if="menu.id === openId">
            <div v-for="cat in menu.product_categories" :key="cat.id" class="hover:bg-green-600 hover:text-white px-2 text-sm cursor-pointer rounded">
              <NuxtLink :to="'/products/' + cat.slug" class="w-full inline-block" @click="popup.toggleModal(false)">{{ cat.name }}</NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div v-else class="p-4 overflow-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr><th>Product</th><th>Name</th><th>Qty</th><th>Unit</th><th>Total</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.allOrders" :key="item.id" class="border-b">
            <td class="py-2"><img :src="item.image_sm || item.src" loading="lazy" class="w-10 rounded"></td>
            <td>{{ item.name }}</td>
            <td>
              <input type="number" :value="item.quantity" min="0" class="rounded border py-1 w-14 text-center border-gray-400"
                     @input="cart.setQuantity(item, parseInt(($event.target as HTMLInputElement).value))">
            </td>
            <td>{{ moneyFormat(item.price) }}</td>
            <td>{{ moneyFormat(item.price * item.quantity) }}</td>
          </tr>
        </tbody>
      </table>
      <NuxtLink to="/checkout" class="flex w-full justify-center mt-6 py-2 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white" @click="popup.toggleModal(false)">
        Checkout
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const cart = useCartStore()
const popup = usePopupStore()
const main = useMainStore()
const { moneyFormat } = useMoney()

const openId = ref<number | null>(null)
const toggle = (id: number) => (openId.value = openId.value === id ? null : id)
</script>
