import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/style/all.sass";

import UdUi from "./components/ud-ui";
Vue.use(UdUi);

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
