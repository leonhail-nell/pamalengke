<template>
  <div class="bg-gray-300">
    <div class="flex flex-wrap w-full justify-center items-center lg:px-10 px-0 py-10">
      <div class="flex w-3/4 bg-green-600 rounded-t-lg px-10 py-2" />
      <div class="flex flex-wrap w-3/4 shadow-xl justify-between items-center bg-green-100 rounded-b-lg lg:px-10 px-2 py-2">
        <div class="flex lg:w-3/4 w-full text-2xl font-bold text-green-600 lg:justify-start justify-center text-center">Apply as a Rider</div>
        <div class="flex lg:w-1/4 w-full justify-center items-center"><img src="~/assets/svg/bike.svg" class="w-1/2"></div>
      </div>
      <div class="flex w-3/4 shadow-xl justify-center items-center bg-green-100 rounded-lg lg:px-10 px-2 py-2 mt-4">
        <img src="~/assets/images/logo.png" class="lg:w-1/2 w-full">
      </div>

      <form class="flex flex-wrap w-3/4 mt-4" @submit.prevent="submit">
        <div class="w-full shadow-xl bg-green-100 rounded-lg lg:px-10 px-4 py-2">
          <p class="text-green-900"><b>Privacy Notice:</b> We will be collecting your personal information such as name, contact details, and other relevant data that will be used for our records. By checking this box, you agree to let the team store your information in our database.</p>
          <label class="flex items-center py-4"><input v-model="agreePrivacy" type="checkbox" class="w-4 h-4 mr-2"><span class="text-green-900">Yes, I Agree.</span></label>
        </div>
        <div class="w-full shadow-xl bg-green-100 rounded-lg px-10 py-2 mt-4">
          <p class="text-green-900"><b>Terms and Conditions:</b> If you do not agree to these Terms and Conditions, please do not use this site. We reserve the right to change or modify these Terms and Conditions at any time.</p>
          <label class="flex items-center py-4"><input v-model="agreeTerms" type="checkbox" class="w-4 h-4 mr-2"><span class="text-green-900">Yes, I Agree.</span></label>
        </div>

        <div class="flex flex-wrap w-full shadow-xl bg-green-100 rounded-lg lg:px-10 px-4 py-4 mt-4">
          <div class="block lg:w-1/2 w-full px-2 py-6">
            <label class="text-lg text-green-600 font-semibold">First Name</label>
            <input v-model="form.first_name" type="text" placeholder="ex. Jane" class="w-full bg-transparent border-b-2 border-green-600 px-3 py-1 text-gray-700 focus:outline-none">
          </div>
          <div class="block lg:w-1/2 w-full px-2 py-6">
            <label class="text-lg text-green-600 font-semibold">Last Name</label>
            <input v-model="form.last_name" type="text" placeholder="ex. Doe" class="w-full bg-transparent border-b-2 border-green-600 px-3 py-1 text-gray-700 focus:outline-none">
          </div>
          <div class="block lg:w-1/2 w-full px-2 py-6">
            <label class="text-lg text-green-600 font-semibold">Email Address</label>
            <input v-model="form.email" type="email" placeholder="ex. jane@mail.com" class="w-full bg-transparent border-b-2 border-green-600 px-3 py-1 text-gray-700 focus:outline-none">
          </div>
          <div class="block lg:w-1/2 w-full px-2 py-6">
            <label class="text-lg text-green-600 font-semibold">Mobile Number</label>
            <input v-model="form.mobile" type="text" placeholder="ex. 0917..." class="w-full bg-transparent border-b-2 border-green-600 px-3 py-1 text-gray-700 focus:outline-none">
          </div>

          <div class="block w-full py-6">
            <p class="text-lg text-green-600 font-semibold">Are you of Legal Age?</p>
            <div class="flex pt-4 gap-6">
              <label class="flex items-center"><input v-model="form.legalAge" type="radio" value="yes" class="h-4 w-4 mr-2"> Yes</label>
              <label class="flex items-center"><input v-model="form.legalAge" type="radio" value="no" class="h-4 w-4 mr-2"> No</label>
            </div>
          </div>
          <div class="block w-full py-6">
            <p class="text-lg text-green-600 font-semibold">Do you have a valid professional driver's license?</p>
            <div class="flex pt-4 gap-6">
              <label class="flex items-center"><input v-model="form.license" type="radio" value="yes" class="h-4 w-4 mr-2"> Yes</label>
              <label class="flex items-center"><input v-model="form.license" type="radio" value="no" class="h-4 w-4 mr-2"> No</label>
            </div>
          </div>

          <div class="flex w-full justify-center items-center py-8">
            <button type="submit" class="bg-yellow-600 text-white px-6 py-2 rounded-full hover:-translate-y-1 transition hover:shadow-lg">Register</button>
          </div>
          <p v-if="done" class="w-full text-center text-green-700 font-semibold pb-6">Thanks! Your rider application has been received.</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })
const agreePrivacy = ref(false)
const agreeTerms = ref(false)
const done = ref(false)
const form = reactive({ first_name: '', last_name: '', email: '', mobile: '', legalAge: '', license: '' })
const submit = () => { done.value = true }
</script>
