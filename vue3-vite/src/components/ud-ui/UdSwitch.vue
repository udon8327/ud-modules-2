<template>
  <div class="ud-switch">
    <label>
      <input 
        type="checkbox"
        v-model="value"
        v-bind="$attrs"
      >
      <div class="switch-decorator">
        <div class="circle"></div>
      </div>
      <p><slot>開關</slot></p>
    </label>
  </div>
</template>

<script>
export default {
  name: 'UdSwitch',
  inheritAttrs: false,
  props: {
    modelValue: { default: false }, // value值
  },
  computed: {
    value: {
      get(){ return this.modelValue },
      set(val){ this.$emit('update:modelValue', val) }
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-switch
  label
    cursor: pointer
    display: flex
    align-items: center
    input
      position: absolute
      left: -999px
      opacity: 0
      pointer-events: none
      &:checked + .switch-decorator
        background: #000
        .circle
          margin-left: 20px
    .switch-decorator
      width: 40px
      height: 20px
      border-radius: 20px
      background: #ccc
      transition: all .2s ease
      padding-left: 2px
      margin-right: 6px
      display: flex
      align-items: center
      .circle
        width: 16px
        height: 16px
        border-radius: 50%
        background: #f7f7f7
        transition: all .2s ease
</style>
