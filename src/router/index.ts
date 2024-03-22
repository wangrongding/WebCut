import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/frame',
      name: 'frame',
      component: () => import('../views/video-frame.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about-page.vue')
    }
  ]
})

export default router
