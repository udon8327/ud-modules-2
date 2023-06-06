<template lang="pug">
#home
  .title-area
    h1 Home Page
  .button-area
    ud-button(@click="toUrl('/about')") About
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toUrl(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="sass" scoped>
.title-area
  h1
    font-size: 30px
    padding: 20px 0

.button-area
  padding: 0 30%
</style>
