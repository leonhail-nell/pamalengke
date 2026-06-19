<template>
  <div class="w-full bg-white rounded-lg shadow flex items-center gap-4 p-4">
    <div class="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
      {{ initial }}
    </div>
    <div class="flex-1">
      <p class="font-bold text-lg text-green-700">{{ auth.user.first_name || 'Guest' }}</p>
      <p class="text-gray-500 text-sm">{{ auth.user.email || 'Not logged in' }}</p>
    </div>
    <nav class="flex gap-2">
      <NuxtLink to="/profile" class="px-3 py-1 rounded-full text-sm" :class="linkCls('/profile')">Profile</NuxtLink>
      <NuxtLink to="/orders" class="px-3 py-1 rounded-full text-sm" :class="linkCls('/orders')">Orders</NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const route = useRoute()
const initial = computed(() => (auth.user.first_name?.[0] ?? 'G').toUpperCase())
const linkCls = (path: string) =>
  route.path.startsWith(path) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-100'
</script>
