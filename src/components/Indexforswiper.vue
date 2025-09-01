<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  '/images/pic1.png',
  '/images/pic2.png',
  '/images/pic3.png',
]
</script>
<template>
   <swiper
   :modules="[Autoplay, Pagination, Navigation]"
    :slides-per-view="1" 
    :loop="true"
    :autoplay="{ delay: 3000 }"
    :pagination="{ clickable: true }"
    :navigation="true"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in images" :key="index">
  <div class="relative w-full aspect-[21/9]"> 
    <img :src="item" class="absolute top-0 left-0 w-full h-full object-cover" />
  </div>
</swiper-slide>
  </swiper>
  
</template>
<style >
.swiper-pagination-bullet-active{
background-color: white; 
}
.swiper-button-prev{
  display:none
}
.swiper-button-next{
 display:none
}
</style>