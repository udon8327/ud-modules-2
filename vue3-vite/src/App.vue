<script setup>
import { ref, reactive, onMounted, nextTick, computed, watch } from "vue"
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "./components/HelloWorld.vue"

const title = ref("Title")
const user = reactive({
  name: "bohan",
  gender: "male",
})
onMounted(() => console.log(`${title.value}標題: ${user.name}`));

const toAbout = () => location.href = "https://www.google.com.tw/"
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
</script>

<template lang="pug">
header
  img.logo(alt="Vue logo", src="@/assets/logo.svg", width="125", height="125")
  .wrapper
    HelloWorld(msg="You did it!")
    nav
      RouterLink(to="/") Home
      RouterLink(to="/about") About
    ud-button(@click="toAbout") About
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

<style scoped lang="sass">
header
  line-height: 1.5
  max-height: 100vh

.logo
  display: block
  margin: 0 auto 2rem

nav
  width: 100%
  font-size: 12px
  text-align: center
  margin-top: 2rem

  a
    &.router-link-exact-active
      color: var(--color-text)

      &:hover
        background-color: transparent

    display: inline-block
    padding: 0 1rem
    border-left: 1px solid var(--color-border)

    &:first-of-type
      border: 0

@media (min-width: 1024px)
  header
    display: flex
    place-items: center
    padding-right: calc(var(--section-gap) / 2)

  .logo
    margin: 0 2rem 0 0

  header .wrapper
    display: flex
    place-items: flex-start
    flex-wrap: wrap

  nav
    text-align: left
    margin-left: -1rem
    font-size: 1rem
    padding: 1rem 0
    margin-top: 1rem
</style>
