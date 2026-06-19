<template>
  <div class="container mx-auto px-4 py-8">
    <form class="flex max-w-xl mx-auto mb-8" @submit.prevent="run">
      <input v-model="keyword" type="text" placeholder="Nangita ko og..." class="py-2 px-4 w-full text-gray-700 rounded-l-full border-2 border-yellow-600 outline-none">
      <button type="submit" class="px-6 text-white rounded-r-full bg-yellow-600 hover:shadow-lg">Search</button>
    </form>

    <h2 v-if="search.search" class="text-xl font-bold text-green-700 mb-4">
      Results for "{{ search.search }}" ({{ search.products.length }})
    </h2>

    <ProductGrid v-if="search.products.length" :items="search.products" />
    <div v-else class="w-full bg-gray-100 p-8 text-center rounded text-gray-600">
      No products found. Try another keyword.
    </div>
  </div>
</template>

<script setup lang="ts">
const search = useSearchStore()
const keyword = ref(search.search)

await useAsyncData('search', () => search.doSearch({ search: search.search, page: 1 }).then(() => true))

const run = () => search.doSearch({ search: keyword.value, page: 1 })
</script>
