<script setup lang="ts">
import { ref, onMounted , onBeforeUnmount } from 'vue'
const fullText = '影響充電速度的因素'
const displayText = ref('')
const showCard = ref(false);//預設一開始隱藏
const showcharge=ref(false);//預設一開始隱藏

//充電動畫
const percent = ref(0) // 當前%數
const targetPercent = 85 // 目標百分比
const dashArray = 2 * Math.PI * 45 // 圓周長 (半徑45)
const dashOffset = ref(dashArray)
let intervalId: number | null = null
onMounted(() => {
  let index = 0 //紀錄目前字出現的位置
  const interval = setInterval(() => {
    if (index < fullText.length) {
      displayText.value += fullText[index]
      index++
    } else {
      clearInterval(interval)
    }
  }, 150) // 出現速度
setTimeout(() => {
    showCard.value = true;
   showcharge.value = true; 
  }, 500);// 載入後觸發顯示

   //充電動畫
  intervalId = setInterval(() => {
    if (percent.value < targetPercent) {
      percent.value++
    } else {
      // 到達目標後歸零重新開始
      setTimeout(() => {
         percent.value = 0
  }, 500);
    }
    dashOffset.value = dashArray * (1 - percent.value / 100)
  }, 100) //85%之前一直充電
})
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

</script>
<template>
   <div class="">
      <div class="bg-slate-300 h-[550px]">
         <div class="container mx-auto pt-[30px] lg:pt-[60px] lg:px-0 px-4  pb-[30px] lg:pb-[60px] ">
               <div class="  flex flex-col lg:flex-row ">
                  <div class="relative lg:w-[40%]   p-4    ">
                     <h2 class="text-[28px]  font-medium  text-slate-500 leading-[28px] min-h-[28px] "  >{{displayText}}</h2>
                     <div class="lg:ml-[80px] text-[16px] text-[#707070]">電動車目前充電分為快充和慢充</div>  
                     <!-- 充電動態 st -->
                      <div v-if="showcharge" class="absolute bottom-[80px] left-[200px] w-50 h-50 lg:block hidden">
                        <!-- 背景圓 -->
                        <svg class="" viewBox="0 0 100 100">
                           <circle
                           cx="50"
                           cy="50"
                           r="45"
                           stroke="#e2e8f0"
                           stroke-width="10"
                           fill="none"
                           />
                           <circle
                           cx="50"
                           cy="50"
                           r="45"
                           stroke="#38bdf8"
                           stroke-width="10"
                           fill="none"
                           :stroke-dasharray="dashArray"
                           :stroke-dashoffset="dashOffset"
                           stroke-linecap="round"
                           transform="rotate(-90 50 50)"
                           style="transition: stroke-dashoffset 0.05s linear"
                           />
                        </svg>

                        <!-- 百分比文字 -->
                        <div class=" absolute bottom-[80px] left-[80px]  text-2xl font-bold text-slate-700">
                           {{ percent }}%
                        </div>

                     </div>
                      <!-- 充電動態 ed-->
               </div>
                  <div class="lg:w-[60%]   p-4 ">
                     <div class="flex flex-col items-center  text-white">
                         <Transition name="fade">
                            <div   v-if="showCard" class="md:w-[400px] w-[330px] h-[175px]  rounded-xl shadow-2xl border  md:mb-[30px] mb-[10px]  bg-gray-600 ">
                               <div class="mt-[10px] mb-[10px] text-[26px] font-medium  border-b-2 border-dotted border-gray-100  ">AC交流電 ～</div>
                               <div class="text-left ml-[10px]">
                                  <div>被稱為慢速充電</div>
                                  <div>充電時間較長，可能須8到12小時</div>
                                  <div>適合安裝在住家、飯店可能會長時間停留的區域</div>
                               </div>
                            </div>
                         </Transition>
                         <Transition name="fade">
                        <div v-if="showCard" class="md:w-[400px] w-[330px] h-[175px]  rounded-xl shadow-2xl border bg-gray-600">
                           <div class="mt-[10px] mb-[10px] text-[26px] font-medium border-b-2 border-dotted border-gray-100">DC直流電 —</div>
                           <div class="text-left ml-[10px]">
                              <div>被稱為快速充電</div>
                              <div>可以短時間高功率充電</div>
                              <div>適合安裝在高速公路服務區等短暫休息的區域</div>
                           </div>
                        </div>
                        </Transition>
                     </div>
                  </div>
               </div>
            </div>
      </div>
  
      <div class=" lg:p-8 lg:text-3xl text-blue-500 font-medium text-2xl p-4 flex justify-center">
         <img src="/images/chargepic.png"  class="w-[30px] pr-1">電動車充電規格   
      </div>
      <div class="container mx-auto hidden lg:block">
         <div class="flex mb-[48px]">
           
         <div class="w-[40%] flex flex-col  justify-center">
          <div class="text-left bline">
            <span class="text-[56px] font-medium bg-blue-500 px-[15px] text-white rounded-md ">1.</span>
          </div>
            <div class="flex justify-center">
               <img src="/images/j1772.png">
            </div>
         </div>
         <div class="w-[60%] flex justify-center">
            <div class="w-[550px] h-[300px] bg-[lightblue] rounded-[64px] hover:scale-105 transition">
               <div class="  titlefont">J1772充電接口</div>
               <div class="text-left mx-[25px] text-[22px] ">J1772提供提供3.7 kW至19.2 kW的充電功率，充電接口有 5 個接點，充電功率每小時約7度電，J1772 也是目前台灣慢充充電站最普遍的充電規格。</div>
            </div>
         </div>
         </div>
            <div class="flex mb-[48px]">
         <div class="w-[60%] flex justify-center">
            <div class="w-[550px] h-[300px] bg-[lightblue] rounded-[64px] hover:scale-105 transition">
               <div class="  titlefont">CCS1充電接口</div>
               <div class="text-left mx-[25px] text-[22px] ">CCS1 是 J1772 的延伸改版，屬於直流電充電規格最大功率為， 240kW，下半部則多了2個直流電的正負極端子，可與 J1772 慢充共用。</div>
            </div>
         </div>
          <div class="w-[40%] flex flex-col  justify-center">
          <div class="text-left bline">
            <span class="text-[56px] font-medium bg-blue-500 px-[15px] text-white rounded-md ">2.</span>
          </div>
            <div class="flex justify-center">
               <img src="/images/ccs1.png">
            </div>
         </div>
         </div>
         <div class="flex mb-[48px]">  
            <div class="w-[40%] flex flex-col  justify-center">
            <div class="text-left bline">
               <span class="text-[56px] font-medium bg-blue-500 px-[15px] text-white rounded-md ">3.</span>
            </div>
               <div class="flex justify-center">
                  <img src="/images/type2.png">
               </div>
            </div>
            <div class="w-[60%] flex justify-center">
               <div class="w-[550px] h-[300px] bg-[lightblue] rounded-[64px] hover:scale-105 transition">
                  <div class="  titlefont">type2充電接口</div>
                  <div class="text-left mx-[25px] text-[22px] ">充電接口有 7 個接點，充電站較J1772少，可提供3.7 kW至22 kW的交流充電，每小時約可充20度電。</div>
               </div>
            </div>
         </div>
        <div class="flex mb-[48px]">
         <div class="w-[60%] flex justify-center">
            <div class="w-[550px] h-[300px] bg-[lightblue] rounded-[64px] hover:scale-105 transition">
               <div class="  titlefont">CCS2充電接口</div>
               <div class="text-left mx-[25px] text-[22px] ">CCS2最大功率為 350kW，下半部新增 2 個正負兩極接點，可以向下相容 Type2 規格的充電槍</div>
            </div>
         </div>
          <div class="w-[40%] flex flex-col  justify-center">
          <div class="text-left bline">
            <span class="text-[56px] font-medium bg-blue-500 px-[15px] text-white rounded-md ">4.</span>
          </div>
            <div class="flex justify-center">
               <img src="/images/ccs2.png">
            </div>
         </div>
         </div>
      </div>
      <div class="container mx-auto lg:hidden  flex flex-col items-center  justify-center ">
         
         <div class="flex-col mb-[30px] border-4 border-gray-400 p-4 rounded-2xl">
            <div class="flex items-center  justify-center  h-[190px]"> <img src="/images/j1772.png" class="max-h-full object-contain"></div>
               <div class="md:w-[400px]  w-[330px] h-[220px]  rounded-xl shadow-lg  bg-[lightblue] ">
                     <div class="  titlefontrwd">J1772充電接口</div>
                     <div class="text-left text-[18px] mx-[10px]">J1772提供提供3.7 kW至19.2 kW的充電功率，充電接口有 5 個接點，充電功率每小時約7度電，J1772 也是目前台灣慢充充電站最普遍的充電規格。</div>
               </div>
         </div>
     
         <div class="flex-col border-4 border-gray-400 p-4 rounded-2xl mb-[30px]">
            <div class="flex items-center  justify-center  h-[190px]"> <img src="/images/ccs1.png" class="max-h-full object-contain"></div>
               <div class="md:w-[400px]  w-[330px] h-[220px]  rounded-xl shadow-lg  bg-[lightblue] ">
                     <div class="  titlefontrwd">CCS1充電接口</div>
                     <div class="text-left text-[18px] mx-[10px]">CCS1 是 J1772 的延伸改版，屬於直流電充電規格最大功率為， 240kW，下半部則多了2個直流電的正負極端子，可與 J1772 慢充共用。</div>
               </div>
         </div>
            <div class="flex-col mb-[30px] border-4 border-gray-400 p-4 rounded-2xl">
            <div class="flex items-center  justify-center h-[190px] "> <img src="/images/type2.png" class="max-h-full object-contain"></div>
               <div class="md:w-[400px] w-[330px] h-[220px]  rounded-xl shadow-lg  bg-[lightblue] ">
                     <div class="  titlefontrwd">type2充電接口</div>
                     <div class="text-left text-[18px] mx-[10px]">充電接口有 7 個接點，充電站較J1772少，可提供3.7 kW至22 kW的交流充電，每小時約可充20度電。</div>
               </div>
         </div>
            <div class="flex-col mb-[30px] border-4 border-gray-400 p-4 rounded-2xl">
            <div class="flex items-center  justify-center  h-[190px]"> <img src="/images/ccs2.png" class="max-h-full object-contain"></div>
               <div class="md:w-[400px]  w-[330px] h-[220px]  rounded-xl shadow-lg  bg-[lightblue]">
                     <div class="  titlefontrwd">CCS2充電接口</div>
                     <div class="text-left text-[18px] mx-[10px]">CCS2最大功率為 350kW，下半部新增 2 個正負兩極接點，可以向下相容 Type2 規格的充電槍</div>
               </div>
         </div>
      </div>
      <hr class="border-t border-black/10">
      
    </div>
</template>
<style scoped>
/* 漸變特效 class fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.bline{
   position: relative;
}
.bline:after{
   content: "";
   position: absolute;
    width: calc(70% + 35px);
    height: 5px;
    border-bottom: 5px dotted oklch(0.623 0.214 259.815);
    bottom: 9px;
}
.titlefont{
   padding-top: 40px;
   padding-bottom: 40px;
   font-size: 28px;
   font-weight: 900;
   background-image: url('/images/titlefontbg.png');
    background-repeat: no-repeat; 
  background-size: cover;       
  background-position: center;  
}
.titlefontrwd{
   padding-top: 20px;
   padding-bottom: 20px;
   font-size: 28px;
   font-weight: 900;
   background-image: url('/images/titlefontbg.png');
    background-repeat: no-repeat; 
  background-size: cover;       
  background-position: center;  
}
</style>