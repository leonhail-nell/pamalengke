<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <ProfileHeader class="mb-6" />

    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-xl font-bold text-green-700 mb-4">Shipping Address</h1>
      <form class="grid lg:grid-cols-2 gap-4" @submit.prevent="save">
        <div>
          <label class="block text-sm text-gray-600">Purok No. / Purok Name</label>
          <input v-model="form.purok" type="text" class="border rounded w-full p-2" placeholder="ex. Purok 1 Tambis">
        </div>
        <div>
          <label class="block text-sm text-gray-600">Barangay</label>
          <select v-model="form.barangay" class="border rounded w-full p-2">
            <option>New Visayas</option><option>San Francisco</option><option>Santo Nino</option><option>J.P. Laurel</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600">City</label>
          <input type="text" value="Panabo City" disabled class="border rounded w-full p-2 bg-gray-100">
        </div>
        <div>
          <label class="block text-sm text-gray-600">Mobile Number</label>
          <input v-model="form.mobile" type="text" class="border rounded w-full p-2" placeholder="ex. 0917...">
        </div>
        <div class="lg:col-span-2">
          <label class="block text-sm text-gray-600">Landmark / Notes</label>
          <textarea v-model="form.landmark" rows="2" class="border rounded w-full p-2" />
        </div>
        <div class="lg:col-span-2 flex gap-3">
          <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">Save Address</button>
          <NuxtLink to="/profile" class="px-6 py-2 rounded-full border">Cancel</NuxtLink>
        </div>
        <p v-if="saved" class="lg:col-span-2 text-green-600 text-sm">Shipping address saved.</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const saved = ref(false)
const form = reactive({
  purok: (auth.user.purok as string) || '',
  barangay: (auth.user.barangay as string) || 'New Visayas',
  mobile: (auth.user.phone as string) || '',
  landmark: (auth.user.landmark as string) || ''
})
const save = () => {
  auth.user = { ...auth.user, ...form, address: `${form.purok}, ${form.barangay}, Panabo City` }
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}
</script>
