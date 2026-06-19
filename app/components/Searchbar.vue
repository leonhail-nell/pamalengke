<template>
  <div class="navigation">
    <div :class="atTop ? 'bg-black opacity-90' : 'bg-white'" class="w-full z-30 transition duration-700 ease-in-out fixed top-0 shadow-md">
      <nav class="flex justify-between w-full items-center px-2">
        <!-- burger + logo -->
        <div class="flex lg:w-1/6 w-3/6 items-center">
          <button class="z-40 lg:hidden block px-2 py-6" @click="catModal = !catModal">
            <svg class="fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" /></svg>
          </button>
          <NuxtLink to="/"><img class="h-16 object-scale-down" src="~/assets/images/logo.png" alt="Pamalengke"></NuxtLink>
        </div>

        <!-- search -->
        <div class="flex w-3/6 justify-center items-center">
          <form class="hidden lg:flex" @submit.prevent="doSearch">
            <input v-model="keyword" type="text" placeholder="Nangita ko og..." class="py-2 px-4 w-64 text-gray-700 rounded-l-full border-2 border-yellow-600 outline-none focus:bg-white">
            <button type="submit" class="px-8 py-2 rounded-r-full bg-yellow-600 text-white hover:shadow-lg">
              <svg class="fill-current inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782z" /></svg>
            </button>
          </form>
          <button class="lg:hidden text-green-600 px-2" @click="popup.toggleSearch()">
            <svg class="fill-current h-8 inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782z" /></svg>
          </button>
        </div>

        <!-- account + basket -->
        <div class="flex w-1/3 justify-end items-center px-4 gap-3">
          <NuxtLink v-if="!auth.isLoggedIn" to="/login" class="flex text-green-600 items-center">
            <svg class="fill-current h-8 inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" /></svg>
            <span class="hidden lg:block ml-1">Login</span>
          </NuxtLink>
          <template v-else>
            <NuxtLink to="/profile" class="flex text-green-600 items-center">
              <svg class="fill-current h-8 inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" /></svg>
              <span class="hidden lg:block ml-1 font-bold">{{ auth.user.first_name || 'Account' }}</span>
            </NuxtLink>
            <button class="text-green-600" @click="logout">
              <svg class="fill-current h-7 inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z" /></svg>
            </button>
          </template>
          <button class="relative flex text-green-600 items-center" @click="popup.toggleModal(true)">
            <span v-if="cart.count > 0" class="absolute -top-2 -right-2 bg-red-500 h-5 w-5 rounded-full text-white text-xs flex items-center justify-center">{{ cart.count }}</span>
            <svg class="fill-current h-7 inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" /></svg>
            <span class="hidden lg:block ml-1">Basket</span>
          </button>
        </div>
      </nav>
      <Navbar />
    </div>

    <AddToCartPopUp />

    <!-- mobile category drawer -->
    <div v-if="catModal" class="flex w-full h-screen fixed z-50 inset-0 overflow-hidden">
      <div class="w-3/4 bg-white h-screen overflow-auto">
        <div class="bg-green-700 w-full flex justify-between px-4 py-3 sticky top-0">
          <img src="~/assets/images/logow.png" class="h-12">
          <button @click="catModal = false">
            <svg class="fill-current text-white mt-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
          </button>
        </div>
        <NuxtLink to="/" class="block px-4 py-3 font-bold text-green-700" @click="catModal = false">HOME</NuxtLink>
        <div class="px-2">
          <div v-for="menu in main.menus" :key="menu.id" class="p-1 rounded">
            <div class="font-bold bg-green-600 text-white flex justify-between cursor-pointer px-4 py-2" @click="openId = openId === menu.id ? null : menu.id">
              <span>{{ menu.name }}</span>
            </div>
            <template v-if="menu.id === openId">
              <NuxtLink v-for="cat in menu.product_categories" :key="cat.id" :to="'/products/' + cat.slug" class="block text-gray-900 mt-2 px-3 text-base" @click="catModal = false">{{ cat.name }}</NuxtLink>
            </template>
          </div>
        </div>
      </div>
      <div class="w-1/4 bg-black opacity-60" @click="catModal = false" />
    </div>

    <!-- basket modal -->
    <div v-if="popup.modal" class="flex w-full h-full fixed z-50 bg-black bg-opacity-70 inset-0 overflow-hidden" @click.self="popup.toggleModal(false)">
      <div class="ml-auto bg-white lg:w-1/3 md:w-2/3 w-full h-screen overflow-auto">
        <BasketModal />
      </div>
      <button class="absolute top-0 right-0 pt-2 px-4 text-white" @click="popup.toggleModal(false)">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const main = useMainStore()
const popup = usePopupStore()
const cart = useCartStore()
const auth = useAuthStore()
const search = useSearchStore()
const router = useRouter()
const route = useRoute()

const keyword = ref('')
const atTop = ref(true)
const catModal = ref(false)
const openId = ref<number | null>(null)

const onScroll = () => (atTop.value = window.scrollY <= 0)
onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const doSearch = () => {
  search.setSearch(keyword.value)
  if (route.path !== '/search') router.push('/search')
  else search.doSearch({ search: keyword.value, page: 1 })
}

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>
