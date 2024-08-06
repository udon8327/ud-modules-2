<template lang="pug">
#index
  ud-input(v-model="test")
  p {{ test }}
  ud-button(@click="toUrl('/demo')") ud-modules
  ud-button(@click="toUrl('/tree-demo')") 漸進式訊息demo
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const test = ref("");
const toUrl = (url) => {
  router.push(url);
}
</script>

<style lang="sass" scoped>
</style>
