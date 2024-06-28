import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      name: "Index",
      component: () => import("@/views/Index.vue"),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/Demo.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('to: ', to);
  console.log('from: ', from);
  next()
})

export default router
