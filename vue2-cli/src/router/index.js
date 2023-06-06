import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
    meta: { requiresAuth: true },
  },

  // 錯誤頁
  {
    path: "/404",
    name: "error404",
    component: () => import("@/views/error/404"),
    meta: {
      title: "404 Not Found",
    },
  },
  {
    path: "/422",
    name: "error422",
    component: () => import("@/views/error/422"),
    meta: {
      title: "422 Forbidden",
    },
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // console.log(`from: ${ from.path }, to: ${ to.path }`);
  next();
});

router.afterEach((to) => {
  // console.log(`from: ${ from.path }, to: ${ to.path }`);
  document.title = to.meta.title
    ? to.meta.title
    : process.env.VUE_APP_BRAND_NAME;
});

export default router;
