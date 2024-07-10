<template>
  <div class="ud-input">
    <input
      ref="input"
      v-model="value"
      v-bind="$attrs"
      :class="{ 'is-center': center }"
      @input="onInput"
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UdInput',
  inheritAttrs: false,
  props: {
    modelValue: null,
    center: Boolean, // 是否置中
  },
  computed: {
    value: {
      get(){ return this.modelValue },
      set(val){ this.$emit('update:modelValue', val) }
    },
  },
  mounted() {
  },
  methods: {
    onInput() {
      this.$mitt.emit("validate"); // 通知FormItem校驗
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-input
  input
    appearance: none
    width: 100%
    padding: 5px 10px
    min-height: 40px
    font-size: 14px
    color: #000
    border: 1px solid #ccc
    border-radius: 4px
    background-color: #fff
    transition: all 0.2s ease
    &.is-center
      text-align: center
    &::placeholder
      color: #aaa
    &:focus
      outline: 0
      border: 1px solid #000
    &:disabled
      background-color: #efefef
      cursor: not-allowed
</style>
