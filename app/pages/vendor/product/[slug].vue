<template>
  <div class="container mx-auto px-4 py-10">
    <div v-if="product" class="flex flex-wrap bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="lg:w-1/2 w-full">
        <img :src="product.image_lg || product.image_md" class="w-full object-cover h-96" :alt="product.name">
      </div>
      <div class="lg:w-1/2 w-full p-8">
        <h1 class="text-3xl font-bold text-green-700 uppercase">{{ product.name }}</h1>
        <p class="text-gray-600 mt-3">{{ product.desc }}</p>

        <div class="mt-6">
          <span v-if="product.discount > 0" class="line-through text-red-600 mr-3">{{ moneyFormat(product.not_discouted_price) }}</span>
          <span class="text-3xl font-bold text-green-800">{{ moneyFormat(product.price) }}</span>
        </div>
        <p class="mt-2 text-sm" :class="product.stocks > 0 ? 'text-green-600' : 'text-red-600'">
          {{ product.stocks > 0 ? product.stocks + ' in stock' : 'Out of stock' }}
        </p>

        <button
          :disabled="product.stocks < 1"
          :class="product.stocks < 1 ? 'opacity-50 cursor-not-allowed bg-red-400' : 'bg-green-600 hover:bg-green-700'"
          class="mt-6 w-full py-3 text-white rounded-full uppercase"
          @click="add"
        >
          Add to cart
        </button>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-500">Product not found.</div>
  </div>
</template>

<script setup lang="ts">
import { mockProducts } from '~/utils/mock'

const route = useRoute()
const products = useProductsStore()
const cart = useCartStore()
const popup = usePopupStore()
const { moneyFormat } = useMoney()

// Prefer the product already selected; fall back to mock lookup by slug.
const product = computed(
  () => products.product_detail ?? mockProducts.find((p) => p.slug === route.params.slug) ?? null
)

const add = () => {
  if (!product.value) return
  cart.addToBasket(product.value)
  popup.addItem({ ...product.value, quantity: 1, total: product.value.price, src: product.value.image_md })
}
</script>
