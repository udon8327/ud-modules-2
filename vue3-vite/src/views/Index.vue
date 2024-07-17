<template lang="pug">
#index
  ud-button(@click="toDemo") Demo
  ud-input(v-model="test")
  p {{ test }}
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const test = ref("");
const toDemo = () => {
  router.push("/demo");
}
</script>

<!-- <script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
      test: "",
    };
  },
  mounted() {},
  methods: {
    toDemo() {
      this.$router.push("/demo");
    },
  },
};
</script> -->

<style lang="sass">
.container
  max-width: 100% !important
</style>
<style lang="sass" scoped>
</style>
