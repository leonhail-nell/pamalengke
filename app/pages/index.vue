<template>
  <div>
    <!-- hero -->
    <div class="bg-cover bg-center" :style="{ backgroundImage: `url(${banner})` }">
      <div class="flex w-full justify-center px-4 bg-smoke-green">
        <div class="lg:py-48 py-24 flex flex-wrap w-full justify-center text-center">
          <h1 class="w-full lg:text-6xl md:text-5xl text-4xl text-white font-bold">Gusto Mamalengke pero walay Time?</h1>
          <p class="w-full px-10 mt-2 lg:text-lg text-base text-white font-semibold">
            Walay Problema, Ania na ang solusyon. Ihatud sa inyung balay ang mga pagkaon og mga butang nga gikinahanglan nimo!
          </p>
          <form class="flex w-full max-w-xl mt-4 px-4" @submit.prevent="doSearch">
            <input v-model="keyword" type="text" placeholder="Nangita ko og..." class="py-2 px-4 w-full text-gray-700 rounded-l-full border-2 border-yellow-600 outline-none focus:bg-white">
            <button type="submit" class="px-6 text-white rounded-r-full bg-yellow-600 hover:shadow-lg">Search</button>
          </form>
        </div>
      </div>
    </div>

    <Steps />

    <!-- promos -->
    <div class="py-10">
      <h1 class="text-green-600 lg:text-4xl text-3xl text-center pb-6">Our Hot Promos</h1>
      <ProductGrid :items="products.promos" />
    </div>

    <!-- partners -->
    <div class="flex flex-wrap w-full justify-center items-center pt-2 pb-10">
      <h1 class="w-full text-green-600 lg:text-4xl text-3xl text-center">Our Partners</h1>
      <VendorList :items="products.vendors_profile" class="w-full" />
    </div>

    <!-- CTAs -->
    <div class="flex flex-wrap w-full lg:px-10 px-4 py-10 bg-gray-200">
      <div class="lg:w-1/2 w-full px-4 mb-4 lg:mb-0">
        <div class="w-full px-6 py-8 bg-white border-2 rounded-lg hover:bg-green-100 hover:shadow-2xl transition">
          <h2 class="text-3xl font-bold text-green-600">Become a Vendor</h2>
          <p class="text-green-700 mt-2">Ikaw ba usa ka negosyo nga nanginahanglan pagpadala? Pwede mahimong usa ka Partner Vendor!</p>
          <NuxtLink to="/merchant_form"><button class="bg-green-600 text-white px-4 py-2 rounded-full mt-6 hover:-translate-y-1 transition">Sign Up Now</button></NuxtLink>
        </div>
      </div>
      <div class="lg:w-1/2 w-full px-4">
        <div class="w-full px-6 py-8 bg-white border-2 rounded-lg hover:bg-green-100 hover:shadow-2xl transition">
          <h2 class="text-3xl font-bold text-green-600">Apply as Rider</h2>
          <p class="text-green-700 mt-2">Ang tanan nga mga bikers nag-agi sa higpit nga mga tseke ug pagbansay sa kaluwasan.</p>
          <NuxtLink to="/rider_form"><button class="bg-green-600 text-white px-4 py-2 rounded-full mt-6 hover:-translate-y-1 transition">Sign Up Now</button></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import banner from '~/assets/images/banner.jpg'

const products = useProductsStore()
const search = useSearchStore()
const router = useRouter()

const keyword = ref('')

// SSR-safe data load (replaces asyncData).
await useAsyncData('home', async () => {
  await Promise.all([products.getPromos(), products.getVendors()])
  return true
})

const doSearch = () => {
  search.setSearch(keyword.value)
  router.push('/search')
}
</script>

<style scoped>
.bg-smoke-green { background: rgba(22, 63, 41, 0.8); }
</style>
