<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <ProfileHeader class="mb-6" />
    <NuxtLink to="/orders" class="text-green-700 text-sm">&larr; Back to orders</NuxtLink>

    <div v-if="o" class="bg-white rounded-lg shadow mt-3 overflow-hidden">
      <div class="flex justify-between items-center bg-green-500 text-white p-4">
        <div>
          <h1 class="font-bold text-lg">{{ o.reference }}</h1>
          <p class="text-sm opacity-90">{{ o.date }} · {{ o.vendor }}</p>
        </div>
        <span class="bg-white text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{{ o.status }}</span>
      </div>

      <table class="w-full text-left">
        <thead class="border-b"><tr><th class="p-3">Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
        <tbody>
          <tr v-for="(it, i) in o.items" :key="i" class="border-b">
            <td class="p-3 flex items-center gap-2"><img :src="it.image" class="w-10 h-10 rounded object-cover">{{ it.name }}</td>
            <td>{{ it.quantity }}</td>
            <td>{{ moneyFormat(it.price) }}</td>
            <td>{{ moneyFormat(it.price * it.quantity) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="p-4 text-right space-y-1">
        <p>Subtotal: <span class="font-semibold">{{ moneyFormat(subtotal) }}</span></p>
        <p>Delivery: <span class="font-semibold">{{ moneyFormat(o.delivery_charge) }}</span></p>
        <p class="text-lg font-bold">Total: {{ moneyFormat(subtotal + o.delivery_charge) }}</p>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-16">Order not found.</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const order = useOrderStore()
const { moneyFormat } = useMoney()

await useAsyncData('order-' + route.params.id, async () => {
  if (!order.orders_by_user.length) await order.getAllOrdersByUser()
  order.selectOrder(Number(route.params.id))
  return true
})

const o = computed(() => order.order_details)
const subtotal = computed(() => (o.value ? o.value.items.reduce((s, i) => s + i.price * i.quantity, 0) : 0))
</script>
