<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 30
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    v-if="showButton"
    @click="scrollToTop"
    class="fixed bottom-[100px] right-[60px] bg-gray-600 text-white px-4 py-2 rounded-full shadow-lg  transition hidden md:flex hover:scale-110 cursor-pointer"
  >
    ↑ 
  </button>
</template>

<style scoped>

</style>