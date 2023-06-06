<template>
  <div class="ud-input">
    <input
      ref="input"
      v-model="modelValue"
      v-bind="$attrs"
      v-on="inputListeners"
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
    value: null,
    center: Boolean // 是否置中
  },
  computed: {
    modelValue: {
      get(){ return this.value == null ? "" : this.value },
      set(val){ this.$emit('input', val) }
    },
    inputListeners() {
      return Object.assign({},
        this.$listeners,
        { input: event => {} }
      )
    }
  },
  mounted() {
  },
  methods: {
    onInput() {
      this.$parent.$emit('validate'); // 通知FormItem校驗
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
    border-radius: 0px
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
