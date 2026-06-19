<template>
  <div>
    <div class="flex flex-wrap w-full mx-auto justify-center bg-green-100">
      <div class="flex flex-wrap lg:w-3/4 w-full mx-auto justify-center rounded-lg px-4 my-8 z-20">
        <div class="flex w-full bg-green-500 bg-circle shadow-2xl mx-auto justify-center py-2">
          <div class="flex w-1/2 px-4 py-4 text-white">
            <h1 class="flex lg:text-xl text-sm font-bold items-center">Let's Get Started</h1>
          </div>
          <div class="flex w-1/2 px-4 justify-end">
            <img src="~/assets/images/logo.png" class="h-16 object-scale-down">
          </div>
        </div>
        <div class="flex w-full bg-green-200 shadow-2xl py-2">
          <div class="flex w-1/2 px-4"><label class="font-bold text-base text-gray-700">Profile Information</label></div>
          <div class="flex w-1/2"><label class="font-bold text-base text-gray-700">Shipping Address</label></div>
        </div>

        <form class="w-full bg-white py-2" @submit.prevent="submit">
          <div class="flex w-full py-1">
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">First Name</label>
              <input v-model="form.first_name" class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="text" placeholder="Jane">
            </div>
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">Email</label>
              <input v-model="form.email" class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="email" placeholder="ex. janedoe@mail.com">
            </div>
          </div>
          <div class="flex w-full py-1">
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">Middle Name</label>
              <input v-model="form.middle_name" class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="text" placeholder="---">
            </div>
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">Purok No. / Purok Name</label>
              <input v-model="form.purok" class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="text" placeholder="ex. Purok 1 Tambis">
            </div>
          </div>
          <div class="flex w-full py-1">
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">Last Name</label>
              <input v-model="form.last_name" class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="text" placeholder="Doe">
            </div>
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">Barangay</label>
              <select v-model="form.barangay" class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white">
                <option>New Visayas</option><option>San Francisco</option><option>Santo Nino</option>
              </select>
            </div>
          </div>
          <div class="flex w-full py-1">
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">Mobile Number</label>
              <input v-model="form.mobile" class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="text" placeholder="ex. 09958272465">
            </div>
            <div class="flex flex-wrap w-1/2 px-8">
              <label class="block uppercase text-gray-700 text-xs font-bold mb-2">City</label>
              <input disabled class="block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none" type="text" value="Panabo City">
            </div>
          </div>
          <div class="flex w-full mx-auto justify-center pb-2">
            <label class="block text-gray-700 font-bold">
              <input v-model="form.agree" class="mr-2" type="checkbox">
              <span class="lg:text-sm text-xs">I agree to the terms and conditions.</span>
            </label>
          </div>
          <div class="flex w-full bg-green-600 shadow-2xl mx-auto justify-center py-2">
            <button type="submit" class="rounded-full bg-yellow-700 hover:bg-yellow-600 text-white px-8 py-2">Submit</button>
          </div>
          <p v-if="done" class="text-center text-green-700 font-semibold py-3">Profile saved! Welcome to Pamalengke.</p>
        </form>
      </div>
    </div>
    <div class="lg:w-1/4 absolute z-40 bottom-0 right-0 lg:block py-4 lg:mr-2 hidden">
      <img src="~/assets/images/bg_shop.png" class="w-full">
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })
const done = ref(false)
const form = reactive({ first_name: '', middle_name: '', last_name: '', email: '', mobile: '', purok: '', barangay: 'New Visayas', agree: false })
const submit = () => { done.value = true }
</script>

<style scoped>
.bg-circle {
  background: linear-gradient(90deg, rgba(56,161,105,1) 0%, rgba(133,218,173,1) 35%, rgba(255,255,255,1) 100%);
}
</style>
