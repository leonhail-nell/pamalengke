<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap w-full justify-center items-stretch">
      <div v-for="(product, i) in items" :key="i" class="flex lg:w-1/4 md:w-1/3 w-1/2 justify-center p-4">
        <div class="flex flex-col justify-between p-3 rounded-lg shadow-lg w-full transition duration-300 hover:bg-green-100 hover:shadow-2xl transform hover:-translate-y-1">
          <div class="rounded relative overflow-hidden">
            <img :src="product.image_local || product.image_md" loading="lazy" class="w-full rounded cursor-pointer object-cover h-40" @click="openDetail(product)" @error="onError($event, product.image_md)">
            <div v-if="product.discount > 0" class="ribbon bg-red-600 text-sm font-bold text-white px-4">{{ product.discount + '%' }}</div>
            <p class="uppercase text-sm text-gray-900 font-bold text-center mt-2">{{ product.name }}</p>
          </div>

          <div class="text-center text-green-900 mt-2">
            <div v-if="product.discount > 0" class="flex justify-around">
              <p class="line-through text-red-600">{{ moneyFormat(product.not_discouted_price) }}</p>
              <p class="font-bold text-xl">{{ moneyFormat(product.price) }}</p>
            </div>
            <p v-else class="font-bold text-xl">{{ moneyFormat(product.price) }}</p>

            <div v-if="cart.inCart(product)" class="flex justify-around items-center mt-2">
              <button class="bg-green-600 px-3 text-white rounded text-lg" @click="cart.decrement(product)">-</button>
              <input
                type="number"
                :value="cart.quantityOf(product)"
                min="0"
                class="rounded border py-1 w-16 text-center border-gray-400"
                @input="cart.setQuantity(product, parseInt(($event.target as HTMLInputElement).value))"
              >
              <button class="bg-green-600 px-3 text-white rounded text-lg" @click="cart.increment(product)">+</button>
            </div>
            <button
              v-else
              :disabled="product.stocks < 1"
              :class="product.stocks < 1 ? 'opacity-50 cursor-not-allowed bg-red-400 line-through' : 'hover:bg-green-800 bg-green-500'"
              class="w-full mt-2 p-2 uppercase text-white rounded-full focus:outline-none text-sm"
              @click="add(product)"
            >
              {{ product.stocks > 0 ? 'Add to cart' : 'Out of stock' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/utils/mock'

defineProps<{ items: Product[] }>()

const cart = useCartStore()
const popup = usePopupStore()
const products = useProductsStore()
const router = useRouter()
const { moneyFormat } = useMoney()
const { onError } = useImg()

const add = (product: Product) => {
  cart.addToBasket(product)
  popup.addItem({ ...product, quantity: 1, total: product.price, src: product.image_md })
}

const openDetail = (product: Product) => {
  products.setProductDetail(product)
  router.push('/vendor/product/' + product.slug)
}
</script>

<style scoped>
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  width: 114px;
  text-align: center;
  margin-right: -28px;
  margin-top: 16px;
  transform: rotate(45deg);
}
</style>
