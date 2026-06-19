<template>
  <div class="loading-page">
    <div class="center_loading">
      <div class="spinner" />
    </div>
  </div>
</template>

<script setup lang="ts">
// OAuth callback (old used vue-spinner FadeLoader). Redirects home after auth.
definePageMeta({ layout: 'blank' })
const router = useRouter()
onMounted(() => setTimeout(() => router.replace('/'), 600))
</script>

<style scoped>
.loading-page {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100000;
}
.center_loading {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 60px;
  height: 60px;
}
.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(72, 187, 120, 0.3);
  border-top-color: #48bb78;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
