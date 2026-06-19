<template>
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-green-600 lg:text-4xl text-3xl text-center pb-8">How It Works</h1>
    <div class="flex flex-wrap justify-center">
      <div v-for="(step, i) in steps" :key="i" class="lg:w-1/3 w-full p-4 text-center">
        <div class="rounded-lg p-6 h-full bg-white shadow-lg hover:shadow-2xl transition">
          <img :src="step.img" class="h-32 mx-auto" :alt="step.title">
          <h3 class="text-xl font-bold text-green-600 mt-4">{{ step.title }}</h3>
          <p class="text-gray-600 mt-2">{{ step.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import shop from '~/assets/svg/shop.svg'
import order from '~/assets/svg/process-order.svg'
import delivery from '~/assets/svg/delivery.svg'

const steps = [
  { img: shop, title: '1. Browse & Shop', text: 'Pili sa mga lab-as nga produkto gikan sa mga lokal nga tindera sa Panabo.' },
  { img: order, title: '2. Place Your Order', text: 'Idugang sa basket ug i-checkout. Sayon ra kaayo!' },
  { img: delivery, title: '3. Get It Delivered', text: 'Ihatud namo direkta sa inyong balay. Walay hassle!' }
]
</script>
