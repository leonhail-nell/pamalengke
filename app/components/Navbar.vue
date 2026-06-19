<template>
  <div class="w-full">
    <div :class="atTop ? 'hidden' : 'block'" class="w-full transition duration-500 ease-in-out">
      <div class="w-full text-left text-gray-700">
        <div class="text-black bg-green-600 w-full px-2 py-2 hidden lg:block md:block">
          <div class="w-full flex-grow lg:flex lg:items-center">
            <div class="text-sm lg:flex-grow">
              <NuxtLink to="/" class="lg:inline-block text-teal-200 hover:text-white mr-4">
                <span class="lg:font-semibold tracking-tight ml-2 text-white">Home</span>
              </NuxtLink>
              <div v-for="menu in main.menus" :key="menu.id" class="group inline-block">
                <span class="mt-4 lg:inline-block text-green-100 hover:text-white ml-4 cursor-pointer">{{ menu.name }}</span>
                <ul class="demo cursor-pointer mt-1 bg-smoke-green text-white rounded-sm transform list-none scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 z-50">
                  <li v-for="cat in menu.product_categories" :key="cat.id" class="rounded-sm relative px-3 py-1 hover:bg-green-100 hover:text-black">
                    <NuxtLink :to="'/products/' + cat.slug" class="w-full flex items-center">
                      <span class="flex-1">{{ cat.name }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="popup.search_toggle" class="w-screen h-screen style-black fixed inset-0 z-50">
      <div class="flex justify-end p-2">
        <button class="font-bold px-2 border-b text-white" @click="popup.toggleSearch()">X</button>
      </div>
      <div class="py-48 flex justify-center">
        <form class="lg:w-1/2 w-full px-4 flex" @submit.prevent="doSearch">
          <input v-model="keyword" type="text" class="text-gray-600 w-full p-3 border border-yellow-700 rounded-l-full focus:outline-none" placeholder="Nangita ko ug...">
          <button type="submit" class="p-3 bg-yellow-700 border border-yellow-700 rounded-r-full text-white hover:bg-yellow-600">Search</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const main = useMainStore()
const popup = usePopupStore()
const search = useSearchStore()
const router = useRouter()
const route = useRoute()

const keyword = ref('')
const atTop = ref(true)

const onScroll = () => (atTop.value = window.scrollY <= 0)
onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const doSearch = () => {
  search.setSearch(keyword.value)
  popup.toggleSearch()
  if (route.path !== '/search') router.push('/search')
  else search.doSearch({ search: keyword.value, page: 1 })
}
</script>

<style>
.style-black { background: rgba(0, 0, 0, 0.8); }
.bg-smoke-green { background: rgba(56, 161, 105, 0.95); }
.group:hover .group-hover\:scale-100 { transform: scale(1); }
.scale-0 { transform: scale(0); }
.min-w-32 { min-width: 8rem; }
ul.demo { list-style: none; }
</style>
