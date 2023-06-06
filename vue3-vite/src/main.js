import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "@/style/all.sass";

// import UdUi from "./components/ud-ui";
// Vue.use(UdUi);

const app = createApp(App)

import UdButton from './components/ud-ui/UdButton.vue';
app.component("UdButton", UdButton)
import UdInput from './components/ud-ui/UdInput.vue';
app.component("UdInput", UdInput)

app.use(createPinia())
app.use(router)

app.mount('#app')
