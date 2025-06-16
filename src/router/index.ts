import { createRouter, createWebHistory } from 'vue-router'
import index from '../pages/index.vue'
import Car from '../pages/car.vue'
import Moto from '../pages/moto.vue'

const routes = [
  { path: '/', component: index },
  { path: '/car', component: Car },
  { path: '/moto', component: Moto },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
