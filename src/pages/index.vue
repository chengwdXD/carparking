<script setup lang="ts">
import { onMounted} from 'vue'
  import { useApiCar } from '../store/apicar.ts'
  import { useApiMoto } from '../store/apimoto.ts'
  import Swiperpic from '../components/Indexforswiper.vue'
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
  <div>
    <div class="">
      <Swiperpic/>
    </div>
    <h1>我是首頁</h1>
<div>電動汽車充電站總數:{{ apiCarStore.fixedData?.result?.count }}</div>
<div>電動機車換電站總數:{{ apiMotoStore.fixedData?.result?.count }}</div>
  </div>
</template>