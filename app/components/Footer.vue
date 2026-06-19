<template>
  <div class="block clear-both">
    <div v-if="toast.show" :class="toast.cls" class="fixed shadow-2xl top-0 right-0 m-8 mt-24 z-50 max-w-sm flex items-center justify-between w-full p-4 rounded text-white">
      {{ toast.message }}
      <button class="ml-4" @click="toast.show = false">✕</button>
    </div>

    <div id="newsletter" class="w-full relative bg-gray-700 bg-no-repeat bg-cover">
      <div class="py-20 relative z-10 flex flex-col justify-center content-center">
        <div class="w-full px-10 py-4">
          <div class="text-3xl text-white text-center">Subscribe to our Newsletter!</div>
          <div class="text-xl text-white text-center">To get a chance to Receive Promos and Free Delivery</div>
          <form class="lg:w-1/2 w-full mx-auto mt-3 flex" @submit.prevent="subscribe">
            <input v-model="email" type="email" required class="flex-1 min-w-0 text-gray-600 p-3 border border-yellow-700 rounded-l-full focus:outline-none" placeholder="Email Address">
            <button type="submit" class="shrink-0 px-6 py-3 bg-yellow-700 border border-yellow-700 rounded-r-full text-white hover:bg-yellow-600">Subscribe</button>
          </form>
        </div>
      </div>
    </div>

    <div class="bg-black text-gray-500">
      <div class="container mx-auto flex flex-wrap lg:justify-around p-6">
        <div class="lg:w-1/4 w-1/2 p-4">
          <div class="font-bold text-lg">Information</div>
          <p><NuxtLink to="/terms" class="hover:text-white">Terms &amp; Conditions</NuxtLink></p>
          <p><NuxtLink to="/privacy" class="hover:text-white">Privacy Policy</NuxtLink></p>
        </div>
        <div class="lg:w-1/4 w-1/2 p-4">
          <div class="font-bold text-lg">Help</div>
          <p><NuxtLink to="/faqs" class="hover:text-white">FAQs</NuxtLink></p>
          <p><NuxtLink to="/return" class="hover:text-white">Return &amp; Exchange</NuxtLink></p>
        </div>
        <div class="lg:w-1/4 w-1/2 p-4">
          <div class="font-bold text-lg">Contact Us</div>
          <p class="hover:text-white"><a href="mailto:support@pamalengke.ph">support@pamalengke.ph</a></p>
          <p class="hover:text-white"><a href="tel:639173075883">+639173075883</a></p>
        </div>
        <div class="lg:w-1/4 w-1/2 p-4">
          <NuxtLink to="/"><img src="~/assets/images/logow.png" class="lg:w-64 w-full"></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const toast = reactive({ show: false, message: '', cls: 'bg-green-600' })

const subscribe = () => {
  // Backend offline → simulate success (was POST api/public/email-subscribe).
  toast.message = 'You have been subscribed to our Newsletter!'
  toast.cls = 'bg-green-600'
  toast.show = true
  email.value = ''
  setTimeout(() => (toast.show = false), 4000)
}
</script>

<style>
#newsletter::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
