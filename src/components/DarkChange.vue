<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

// 載入時檢查 localStorage 是否曾經切換過模式
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

// 切換暗模式
const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <button
    @click="toggleDark"
    class="px-4 py-2 rounded-xl transition bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:shadow cursor-pointer"
  >
    {{ isDark ? '暗黑模式' : '光亮模式' }}
  </button>
</template>
