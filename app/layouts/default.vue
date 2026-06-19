<template>
  <div>
    <Searchbar />
    <!-- spacer for the fixed header -->
    <div class="pt-20">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Components in app/components are auto-imported in Nuxt 4.
</script>
