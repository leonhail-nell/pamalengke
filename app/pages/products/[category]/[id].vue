<template>
  <div class="container mx-auto lg:mt-8 px-4 py-8">
    <h2 class="text-2xl font-bold text-green-700 capitalize mb-4">{{ title }}</h2>
    <ProductGrid v-if="products.filtered_products.length" :items="products.filtered_products" />
    <div v-else class="w-full bg-red-600 p-5 text-center rounded">
      <h2 class="text-white font-bold text-xl">Sorry, No Products Found!</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
// Sub-category listing (old pages/products/_category/_id.vue).
const route = useRoute()
const products = useProductsStore()

const title = computed(() => String(route.params.category).replace(/-/g, ' '))

await useAsyncData('subcat-' + route.params.category + '-' + route.params.id, () =>
  products.getFilteredProducts({ category_slug: String(route.params.category) }).then(() => true)
)
</script>
