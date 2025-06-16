<script setup lang="ts">
import {RouterLink} from "vue-router"
</script>
<template>
  <div>
    <p>測試header</p>
     <RouterLink to="/">回首頁</RouterLink>
     <br/>
     <RouterLink to="/car">回車車頁面</RouterLink>
     <br/>
     <RouterLink to="/moto">回機車頁面</RouterLink>
  </div>
</template>