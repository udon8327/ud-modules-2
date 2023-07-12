<template lang="pug">
header
  .logo-area
    img(:src="Logo")
  p {{ route.params.id }}
  h1 {{ counterStore.name }}
  h1 {{ counterStore.count }}, {{ counterStore.doubleCount }}
  ud-button(@click="double") ++
  .wrapper
    HelloWorld(:msg="`${counterStore.name} You did it!`")
    ud-button.test(@click="toAbout") About
    ud-button(@click="changeName('UDON')" ) Name 
    br
    ud-button.sd(@click="test") TEST
    ud-button(@click="test" throttle) TEST(throttle)
    br
    p {{ title }}: {{ user.name }}: {{ computedName }}
    input(v-model="user.name" placeholder="name")
    ud-input(v-model="title" placeholder="name")
RouterView
</template>

<script setup>
import Logo from "@/assets/images/logo/logo.png"
import { ref, reactive, onMounted, nextTick, computed, watch, watchEffect } from "vue"
import { RouterView } from "vue-router"
import HelloWorld from "./components/HelloWorld.vue"
import { useCounterStore } from "@/stores/counter.js";
import { useRouter, useRoute } from "vue-router";

const counterStore = useCounterStore();
const router = useRouter();
const route = useRoute();

onMounted(() => init());

const init = () => {
  console.log("init");
  watchEffect(() => {
    console.log('route: ', route.params.id);
  })
}

const title = ref("Title")
const user = reactive({
  name: "bohan",
  gender: "male",
})

const toAbout = () => router.push("/about");
const changeName = (val) => {
  nextTick(() => {
    user.name = val;
  })
}
const test = (e) => {
  console.log('e: ', e);
  console.log(Date.now());
}
const computedName = computed(()=> {
  return user.name + "!!!";
});
watch(user, (val) => {
  console.log(val);
})

const double = () => {
  counterStore.count++
  counterStore.increment();
}
</script>

<style scoped lang="sass">
.logo-area
  background-color: $main
  height: 72px
  display: flex
  justify-content: center
  img
    height: 100%
</style>
