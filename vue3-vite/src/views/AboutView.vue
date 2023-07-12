<template lang="pug">
.about
  h6 This is an about page
  ud-button(@click="toHome") Home
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const toHome = () => router.push("/");
</script>

<style scoped lang="sass">
h6
  font-size: 30px
  margin-top: 50px
  text-align: center
</style>
