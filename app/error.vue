<template>
  <main class="mx-auto max-w-2xl p-12 text-center">
    <h1 class="text-6xl font-bold">{{ error?.statusCode }}</h1>
    <p class="mt-4 text-gray-600">{{ error?.statusMessage || 'Something went wrong.' }}</p>
    <button class="mt-6 rounded bg-black px-4 py-2 text-white" @click="handleError">
      Go home
    </button>
  </main>
</template>

<script setup lang="ts">
// Replaces the old components/error/404.vue + router catch-all.
defineProps<{ error: { statusCode: number; statusMessage?: string } | null }>()
const handleError = () => clearError({ redirect: '/' })
</script>
