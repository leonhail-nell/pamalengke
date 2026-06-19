<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <ProfileHeader class="mb-6" />

    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-xl font-bold text-green-700 mb-4">Edit Profile</h1>
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="block text-sm text-gray-600">First name</label>
          <input v-model="form.first_name" type="text" class="border rounded w-full p-2">
        </div>
        <div>
          <label class="block text-sm text-gray-600">Email</label>
          <input v-model="form.email" type="email" class="border rounded w-full p-2">
        </div>
        <div>
          <label class="block text-sm text-gray-600">Phone</label>
          <input v-model="form.phone" type="text" class="border rounded w-full p-2">
        </div>
        <div>
          <label class="block text-sm text-gray-600">Address</label>
          <textarea v-model="form.address" rows="2" class="border rounded w-full p-2" />
        </div>
        <div class="flex gap-3">
          <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">Save</button>
          <NuxtLink to="/profile" class="px-6 py-2 rounded-full border">Cancel</NuxtLink>
        </div>
        <p v-if="saved" class="text-green-600 text-sm">Profile saved.</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const saved = ref(false)

const form = reactive({
  first_name: (auth.user.first_name as string) || '',
  email: (auth.user.email as string) || '',
  phone: (auth.user.phone as string) || '',
  address: (auth.user.address as string) || ''
})

const save = () => {
  // Backend offline → update the local auth store (was a PUT to the API).
  auth.user = { ...auth.user, ...form }
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}
</script>
