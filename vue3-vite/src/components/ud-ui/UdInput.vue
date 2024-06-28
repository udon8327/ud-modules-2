<template>
  <div class="ud-input">
    <input
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
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
    modelValue: "", // 綁定值
    center: Boolean, // 是否置中
  },
  mounted() {
  },
  methods: {
    onInput($event) {
      this.$parent.$emit('validate'); // 通知FormItem校驗
      this.$emit('update:modelValue', $event.target.value);
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
