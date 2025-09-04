<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
  <header class="bg-gray-800 text-white sticky top-0 z-50">
    <div class="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
       <RouterLink to="/"><p class="text-xl font-bold text-gray-300">Chargeing</p></RouterLink>

      <!-- 漢堡選單按鈕 (手機用) -->
      <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- 導覽連結（桌機版） -->
      <nav class="hidden md:flex space-x-4">
        <RouterLink to="/" ><p class="hover:text-green-300 text-gray-300" >首頁</p></RouterLink>
        <RouterLink to="/car" ><p class="hover:text-green-300 text-gray-300" >電動車停車場</p></RouterLink>
        <RouterLink to="/moto" ><p class="hover:text-green-300 text-gray-300" >電動機車停車場</p></RouterLink>
      </nav>
    </div>

    <!-- 手機版導覽選單（滑動過渡動畫） -->
    <div
      :class="[
        'transition-all duration-300 ease-in-out overflow-hidden md:hidden bg-gray-700 px-4',
        isOpen ? 'max-h-40 py-3' : 'max-h-0 py-0'
      ]"
    >
        <RouterLink to="/" class="block " @click="isOpen = false"><p class="hover:text-green-300 text-gray-300" >首頁</p></RouterLink>
        <RouterLink to="/car" class="block" @click="isOpen = false"><p class="hover:text-green-300 text-gray-300" >電動車停車場</p></RouterLink>
        <RouterLink to="/moto" class="block" @click="isOpen = false"><p class="hover:text-green-300 text-gray-300" >電動機車停車場</p></RouterLink>
      </div>
  </header>
</template>


