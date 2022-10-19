<template lang="pug">
#app
  .container
    router-view
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="sass">
.container
  max-width: 540px
  margin: 0 auto
  min-height: 100%
  background-color: #fff
  text-align: center
</style>
