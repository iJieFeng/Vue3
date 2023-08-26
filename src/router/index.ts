import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/v-model',
      name: 'v-model',
      component: () => import('@/views/v-model/VModelView.vue')
    },
    {
      path: '/v-directive',
      name: 'v-directive',
      component: () => import('@/views/v-directive/VDirectiveView.vue')
    }
  ]
})

export default router
