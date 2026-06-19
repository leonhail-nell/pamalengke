<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <ProfileHeader class="mb-6" />

    <div v-if="auth.isLoggedIn" class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold text-green-700">My Profile</h1>
        <div class="flex gap-2">
          <NuxtLink to="/profile/edit" class="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700">Edit Profile</NuxtLink>
          <NuxtLink to="/profile/shipEdit" class="border border-green-600 text-green-700 px-4 py-1.5 rounded-full text-sm hover:bg-green-50">Address</NuxtLink>
        </div>
      </div>
      <dl class="space-y-2">
        <div class="flex justify-between border-b py-2"><dt class="text-gray-500">First name</dt><dd>{{ auth.user.first_name || '—' }}</dd></div>
        <div class="flex justify-between border-b py-2"><dt class="text-gray-500">Email</dt><dd>{{ auth.user.email || '—' }}</dd></div>
        <div class="flex justify-between border-b py-2"><dt class="text-gray-500">Phone</dt><dd>{{ auth.user.phone || '—' }}</dd></div>
        <div class="flex justify-between py-2"><dt class="text-gray-500">Address</dt><dd>{{ auth.user.address || '—' }}</dd></div>
      </dl>
      <button class="mt-6 text-red-600 text-sm" @click="logout">Logout</button>
    </div>

    <p v-else class="text-gray-600">You are not logged in. <NuxtLink to="/login" class="text-green-700 underline">Login</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()
const logout = () => { auth.logout(); router.push('/') }
</script>
