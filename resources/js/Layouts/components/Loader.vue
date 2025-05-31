<template>
  <div v-if="show" class="global-loader">
    <!-- Your loader animation here -->
    <div class="spinner"></div>
  </div>
</template>

<script setup>
defineProps({ show: Boolean });
</script>
