<template>
  <div class="container mx-auto px-4 py-16 max-w-md">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <div class="flex justify-center mb-6"><img src="~/assets/images/logo.png" class="h-20"></div>
      <h1 class="text-2xl font-bold text-green-700 text-center mb-6">Login</h1>
      <form @submit.prevent="login">
        <label class="block text-sm text-gray-600">Email</label>
        <input v-model="email" type="email" required class="border rounded w-full p-2 mb-4">
        <label class="block text-sm text-gray-600">First name</label>
        <input v-model="firstName" type="text" required class="border rounded w-full p-2 mb-6">
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700">Sign in</button>
      </form>
      <p class="text-xs text-gray-400 mt-4 text-center">Demo login — backend auth is offline.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simplified mock login (old flow used OAuth hash + api/authorized/auth-details).
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const firstName = ref('')

const login = () => {
  auth.setSession({
    token: 'mock-token',
    user: { email: email.value, first_name: firstName.value },
    expiresIn: ''
  })
  router.push('/')
}
</script>
