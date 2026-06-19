<template>
  <div class="container mx-auto px-4 py-10">
    <div v-if="vendor" class="mb-8">
      <img :src="vendor.building_photo || vendor.avatar" class="w-full h-48 object-cover rounded-lg" :alt="vendor.company_name">
      <h1 class="text-3xl font-bold text-green-700 mt-4">{{ vendor.company_name }}</h1>
      <p class="text-gray-500">{{ vendor.address }}</p>
    </div>
    <h2 class="text-xl font-bold text-green-700 mb-4">Products</h2>
    <ProductGrid :items="vendorProducts" />
  </div>
</template>

<script setup lang="ts">
import { mockVendors, mockProducts } from '~/utils/mock'

const route = useRoute()
const vendor = computed(() => mockVendors.find((v) => v.slug === route.params.slug) ?? null)
const vendorProducts = computed(() =>
  vendor.value ? mockProducts.filter((p) => p.vendor_id === vendor.value!.id) : []
)
</script>
