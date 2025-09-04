 <script setup lang="ts">
  import {  defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{ 
    modelValue: string;
    placeholder?: string;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  const clearSearch = () => {//清空
    emit('update:modelValue', '');
  };
  </script>
  <template>
    <div class="w-full max-w-md  flex items-center">
      <div class="relative flex-1">
   
        <!-- ($event.target as HTMLInputElement).value) ts 判斷input的型別是value  -->
        <input
          :value="props.modelValue"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          :props.placeholder="props.placeholder || '搜尋...'"
          class="w-full p-2 pl-10 pr-10 border rounded-lg shadow-sm   dark:bg-gray-800 dark:text-white dark:border-gray-600 focus-visible:outline-none"
        />
  
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.1-5.65a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    
        <button
          v-if="modelValue"
          @click="clearSearch"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  </template>