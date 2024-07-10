import { createApp } from "vue"
import { createPinia } from "pinia"
import mitt from "mitt"

import App from "./App.vue"
import router from "./router"

import "@/style/all.sass";

const app = createApp(App)

import UdUi from "./components/ud-ui";
app.use(UdUi);

app.config.globalProperties.$mitt = mitt();
app.use(createPinia())
app.use(router)

app.mount('#app')
