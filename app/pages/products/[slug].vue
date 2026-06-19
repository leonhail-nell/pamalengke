<template>
  <div class="container mx-auto lg:mt-8 px-4">
    <div class="flex flex-wrap py-8">
      <!-- filter sidebar -->
      <aside class="lg:w-1/4 w-full lg:pr-6 mb-6">
        <div class="bg-white rounded-lg shadow p-4 sticky top-24">
          <h3 class="font-bold text-green-700 mb-3">Filter</h3>
          <label class="block text-sm text-gray-600">Min price</label>
          <input v-model.number="minPrice" type="number" class="border rounded w-full p-2 mb-3">
          <label class="block text-sm text-gray-600">Max price</label>
          <input v-model.number="maxPrice" type="number" class="border rounded w-full p-2 mb-3">
          <button class="w-full bg-green-600 text-white rounded-full py-2 hover:bg-green-700" @click="reset">Reset</button>
        </div>
      </aside>

      <!-- products -->
      <section class="lg:w-3/4 w-full">
        <h2 class="text-2xl font-bold text-green-700 capitalize mb-4">{{ title }}</h2>
        <ProductGrid v-if="visible.length" :items="visible" />
        <div v-else class="w-full bg-red-600 p-5 text-center rounded">
          <h2 class="text-white font-bold text-xl">Sorry, No Products Found!</h2>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const products = useProductsStore()

const slug = computed(() => String(route.params.slug))
const title = computed(() => slug.value.replace(/-/g, ' '))

const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const reset = () => { minPrice.value = null; maxPrice.value = null }

await useAsyncData('products-' + slug.value, () =>
  products.getFilteredProducts({ category_slug: slug.value }).then(() => true)
)

const visible = computed(() =>
  products.filtered_products.filter((p) => {
    if (minPrice.value != null && p.price < minPrice.value) return false
    if (maxPrice.value != null && p.price > maxPrice.value) return false
    return true
  })
)
</script>
