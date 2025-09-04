<script setup lang="ts">
 import { onMounted} from 'vue'
 import { useApiCar } from '../store/apicar.ts'
 import { useApiMoto } from '../store/apimoto.ts'
 import {RouterView} from "vue-router"
  const apiCarStore = useApiCar()
  const apiMotoStore = useApiMoto()

    onMounted(async () => {//頁面一載入執行api
  await apiCarStore.cardata('') 
  await apiMotoStore.motodata('') 
  console.log('API 回傳資料:', apiCarStore.data)
  // console.log('API 總數:', apiCarStore.data.result.count)
  // console.log('總頁數',totalpages.value);
})
</script>
<template>
  <div class="flex flex-col justify-center items-center px-4 py-[20px]">

 <div class="container mx-auto px-4">
  <div class="p-6 rounded-[24px] shadow-xl bg-slate-200/90 backdrop-blur-xl lg:w-[800px] md:w-[440px] mx-auto">
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- 電動汽車充電站 -->
      <RouterLink to="/car" class="block w-full">
      <div class="flex items-center gap-4 bg-white hover:bg-zinc-300 rounded-xl p-6 shadow-md flex-1 justify-center">
        <div>
          <div class="text-4xl font-black text-blue-500">
            {{ apiCarStore.fixedData?.result?.count }}
          </div>
          <div class="text-sm text-slate-500 mt-1">台北市電動汽車充電站</div>
        </div>
      </div>
      </RouterLink>

      <!-- 電動機車換電站 -->
      <RouterLink to="/car" class="block w-full  ">
      <div class="flex items-center gap-4 bg-white hover:bg-zinc-300 rounded-xl p-6 shadow-md flex-1 justify-center ">
        <div>
          <div class="text-4xl font-black text-green-500">
            {{ apiMotoStore.fixedData?.result?.count }}
          </div>
          <div class="text-sm text-slate-500 mt-1">台北市電動機車換電站</div>
        </div>
      </div>
      </RouterLink>
    </div>
  </div>
</div>

  </div>
</template>