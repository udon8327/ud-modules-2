<template lang="pug">
#about
  .title-area
    h1 About Page
  .button-area
    ud-button(@click="toUrl('/home')") Home
</template>

<script>
export default {
  name: "About",
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
