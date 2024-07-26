import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('@/views/TreeDemo.vue')
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
    },
    {
      path: '/tree-demo',
      name: 'TreeDemo',
      component: () => import('@/views/TreeDemo.vue')
    },

    // 錯誤頁
    {
      path: "/404",
      name: "error404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "404 Not Found",
      },
    },
    {
      path: "/422",
      name: "error422",
      component: () => import("@/views/error/422.vue"),
      meta: {
        title: "422 Forbidden",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(`from: ${ from.path }, to: ${ to.path }`);
  next()
})

router.afterEach(() => {
  // console.log('to: ', to);
});

export default router
