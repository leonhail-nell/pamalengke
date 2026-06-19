<template>
  <div class="container mx-auto px-4 py-10 max-w-4xl">
    <h1 class="text-3xl font-bold text-green-700 mb-6">Checkout</h1>

    <div v-if="placed" class="bg-green-100 border border-green-400 text-green-800 rounded-lg p-8 text-center">
      <h2 class="text-2xl font-bold">Salamat! Order placed.</h2>
      <p class="mt-2">Your order is being processed and will be delivered soon.</p>
      <NuxtLink to="/" class="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">Continue Shopping</NuxtLink>
    </div>

    <div v-else-if="cart.allOrders.length === 0" class="text-center py-16 text-gray-500">
      <p>Your basket is empty.</p>
      <NuxtLink to="/" class="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">Start Shopping</NuxtLink>
    </div>

    <div v-else class="flex flex-wrap gap-8">
      <!-- items -->
      <div class="flex-1 min-w-[300px]">
        <table class="w-full text-left">
          <thead class="border-b">
            <tr><th class="py-2">Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.allOrders" :key="item.id" class="border-b">
              <td class="py-3 flex items-center gap-2">
                <img :src="item.image_sm || item.src" class="w-12 h-12 rounded object-cover"><span>{{ item.name }}</span>
              </td>
              <td>
                <input type="number" :value="item.quantity" min="0" class="border rounded w-16 text-center py-1"
                       @input="cart.setQuantity(item, parseInt(($event.target as HTMLInputElement).value))">
              </td>
              <td>{{ moneyFormat(item.price) }}</td>
              <td>{{ moneyFormat(item.price * item.quantity) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- summary -->
      <div class="w-full lg:w-80">
        <div class="bg-white rounded-lg shadow p-6 sticky top-24">
          <h3 class="font-bold text-lg mb-4">Order Summary</h3>
          <div class="flex justify-between py-1"><span>Subtotal</span><span>{{ moneyFormat(cart.grand_total) }}</span></div>
          <div class="flex justify-between py-1"><span>Delivery</span><span>{{ moneyFormat(cart.delivery_charge) }}</span></div>
          <div class="flex justify-between py-2 mt-2 border-t font-bold text-lg">
            <span>Total</span><span>{{ moneyFormat(cart.grand_total + cart.delivery_charge) }}</span>
          </div>
          <button class="w-full mt-6 bg-yellow-600 text-white py-3 rounded-full hover:bg-yellow-700" @click="placeOrder">
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simplified single-page checkout (old flow was a multi-step wizard:
// checkout/ShipContactInfo -> ShipConfirmed -> ShipFinalDetails).
const cart = useCartStore()
const { moneyFormat } = useMoney()

const placed = ref(false)

const placeOrder = () => {
  // Backend offline → simulate order placement.
  placed.value = true
  cart.clear()
}
</script>
