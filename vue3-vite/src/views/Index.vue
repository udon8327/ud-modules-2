<template lang="pug">
#index
  ud-button(@click="toDemo") Demo
</template>

<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
    };
  },
  mounted() {},
  methods: {
    toDemo() {
      this.$router.push("/demo");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
