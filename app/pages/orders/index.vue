<template>
  <div class="container mx-auto px-4 py-8 max-w-5xl">
    <ProfileHeader class="mb-6" />

    <div class="flex items-center bg-green-500 text-white py-3 px-4 rounded-t-lg">
      <h1 class="font-bold text-lg">My Orders</h1>
    </div>

    <div v-if="order.orders_by_user.length" class="bg-white rounded-b-lg shadow divide-y">
      <NuxtLink
        v-for="o in order.orders_by_user"
        :key="o.id"
        :to="'/orders/' + o.id"
        class="flex flex-wrap items-center justify-between p-4 hover:bg-green-50"
      >
        <div>
          <p class="font-bold text-green-700">{{ o.reference }}</p>
          <p class="text-sm text-gray-500">{{ o.date }} · {{ o.vendor }}</p>
        </div>
        <div class="text-right">
          <span :class="statusCls(o.status)" class="px-3 py-1 rounded-full text-xs font-semibold">{{ o.status }}</span>
          <p class="font-bold mt-1">{{ moneyFormat(total(o)) }}</p>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="bg-white rounded-b-lg shadow p-12 text-center text-gray-500">
      You have no orders yet.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/utils/mock'

const order = useOrderStore()
const { moneyFormat } = useMoney()

await useAsyncData('orders', () => order.getAllOrdersByUser().then(() => true))

const total = (o: Order) => o.items.reduce((s, i) => s + i.price * i.quantity, 0) + o.delivery_charge

const statusCls = (s: string) =>
  ({
    Delivered: 'bg-green-100 text-green-700',
    Processing: 'bg-blue-100 text-blue-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700'
  }[s] || 'bg-gray-100 text-gray-700')
</script>
