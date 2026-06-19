<template>
  <div class="flex flex-wrap w-full justify-center">
    <div v-for="vendor in items" :key="vendor.id" class="lg:w-1/4 md:w-1/3 w-1/2 p-4">
      <NuxtLink :to="'/vendor/' + vendor.slug" class="block rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
        <img :src="vendor.building_photo || vendor.avatar" loading="lazy" class="w-full h-32 object-cover" :alt="vendor.company_name">
        <div class="p-3 text-center">
          <p class="font-bold text-green-700">{{ vendor.company_name }}</p>
          <p class="text-gray-500 text-sm">{{ vendor.address }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: any[] }>()
</script>
