<template>
  <div ref="lottieContainer" class="lottie-container"></div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';

// Dynamically import lottie-web and disable SSR
const LottieAnimation = defineAsyncComponent(() => import('lottie-web').then(module => module.default));

const props = defineProps({
  animationData: {
    type: Object,
    required: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});

const lottieContainer = ref(null);
let animationInstance = null;

onMounted(() => {
  if (typeof window !== 'undefined' && lottieContainer.value) {
    animationInstance = LottieAnimation.loadAnimation({
      container: lottieContainer.value,
      animationData: props.animationData,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
    });
  }
});

onBeforeUnmount(() => {
  if (animationInstance) {
    animationInstance.destroy(); // Clean up
  }
});
</script>

<style scoped>
.lottie-container {
  width: 100%;
  height: 100%;
}
</style>
