<template lang="pug">
#demo
  ud-button(@click="toIndex") Index
  ud-input.test(v-model="name" placeholder="請輸入姓名" @change="onChange" @blur="onBlur" @focus="onFocus")
  p {{ name }}
</template>

<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
      name: "",
    };
  },
  mounted() {},
  methods: {
    toIndex() {
      this.$router.push("/index");
    },
    onChange() {
      console.log("onChange", this.name); 
    },
    onBlur(e) {
      console.log("onBlur", e); 
    },
    onFocus(e) {
      console.log("onFocus", e); 
    }
  },
};
</script>

<style lang="sass" scoped>
</style>