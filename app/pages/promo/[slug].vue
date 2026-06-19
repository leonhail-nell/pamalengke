<template>
  <div class="flex flex-wrap w-full lg:px-10 px-2 bg-gray-200 py-8">
    <!-- breadcrumb -->
    <nav class="w-full hidden lg:block text-black font-bold my-4">
      <ol class="list-none p-0 inline-flex gap-2">
        <li><NuxtLink to="/">Home</NuxtLink> /</li>
        <li class="text-gray-500 uppercase">{{ product?.name }}</li>
      </ol>
    </nav>

    <div v-if="product" class="flex flex-wrap w-full rounded bg-white lg:p-4 p-2">
      <div class="lg:w-1/3 w-full p-2">
        <img :src="product.image_local || product.image_lg" class="w-full rounded object-cover" :alt="product.name" @error="onError($event, product.image_lg)">
      </div>
      <div class="lg:w-2/3 w-full">
        <div class="w-full bg-greensmoke py-4 px-10 text-white font-bold text-2xl uppercase">{{ product.name }}</div>

        <div class="flex flex-wrap w-full lg:px-10 px-2 py-4 gap-y-2">
          <div v-if="product.discount > 0" class="w-1/2">Before: <span class="text-2xl line-through text-red-600">{{ moneyFormat(product.not_discouted_price) }}</span></div>
          <div class="w-1/2">Available Stocks: <span class="text-2xl font-bold text-gray-400">{{ product.stocks }}</span></div>
          <div class="w-1/2">Now: <span class="text-2xl font-bold">{{ moneyFormat(product.price) }}</span></div>
          <div v-if="product.discount > 0" class="w-1/2">Discount: <span class="text-sm font-bold text-white rounded-full bg-red-600 px-2 py-1">{{ product.discount }}% off</span></div>
        </div>

        <div class="w-full lg:px-10 px-2 py-4">
          <div v-if="cart.inCart(product)" class="flex items-center gap-3">
            <button class="bg-green-600 px-3 text-white rounded text-lg" @click="cart.decrement(product)">-</button>
            <input type="number" :value="cart.quantityOf(product)" min="0" class="rounded border py-1 w-24 text-center border-gray-400"
                   @input="cart.setQuantity(product, parseInt(($event.target as HTMLInputElement).value))">
            <button class="bg-green-600 px-3 text-white rounded text-lg" @click="cart.increment(product)">+</button>
            <span class="px-3">Total: <b class="text-red-600 text-2xl">{{ moneyFormat(product.price * cart.quantityOf(product)) }}</b></span>
          </div>
          <button
            v-else
            :disabled="product.stocks < 1"
            :class="product.stocks < 1 ? 'opacity-50 cursor-not-allowed bg-red-400' : 'hover:bg-green-800 bg-green-500'"
            class="w-full p-4 uppercase text-white rounded-full"
            @click="add"
          >
            {{ product.stocks > 0 ? 'Add to cart' : 'Out of stock' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="w-full text-center py-20 text-gray-500">Promo not found.</div>

    <div v-if="product" class="w-full bg-white rounded p-4 mt-2">
      <h2 class="w-full text-center py-8 text-green-600 text-2xl">Recommended For You</h2>
      <ProductGrid :items="related" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockPromos } from '~/utils/mock'

const route = useRoute()
const cart = useCartStore()
const popup = usePopupStore()
const { moneyFormat } = useMoney()
const { onError } = useImg()

const product = computed(() => mockPromos.find((p) => p.slug === route.params.slug) ?? mockPromos[0] ?? null)
const related = computed(() => mockPromos.filter((p) => p.slug !== product.value?.slug).slice(0, 4))

const add = () => {
  if (!product.value) return
  cart.addToBasket(product.value)
  popup.addItem({ ...product.value, quantity: 1, total: product.value.price, src: product.value.image_md })
}
</script>

<style scoped>
.bg-greensmoke { background: linear-gradient(90deg, rgba(56,161,105,1) 0%, rgba(56,161,105,1) 56%, rgba(56,161,105,0) 100%); }
</style>
