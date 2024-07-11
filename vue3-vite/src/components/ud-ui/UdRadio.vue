<template>
  <div class="ud-radio" :class="{'is-flex': flex}">

    <label v-if="option">
      <input
        ref="radio"
        type="radio"
        v-model="value"
        v-bind="$attrs"
        :value="option"
        @change="onChange"
      >
      <div class="radio-decorator"
        :style="{'border-radius': radius}"
      ></div>
      <p v-if="combine">{{ option }}</p>
    </label>

    <label v-for="option in options" :key="option.value" v-if="options" :class="{'is-disabled': option.disabled}">
      <input
        ref="radio"
        type="radio"
        v-model="value"
        v-bind="$attrs"
        :value="option.value"
        :disabled="option.disabled"
        @change="onChange"
      >
      <div class="radio-decorator"
        :style="{'border-radius': radius}"
      ></div>
      <p>{{ combine ? option.value : option.label }}</p>
    </label>

  </div>
</template>

<script>
export default {
  name: 'UdRadio',
  inheritAttrs: false,
  props: {
    modelValue: null, // value值
    option: null, // 單選項[string, number]
    options: null, // 多選項[object]
    flex: Boolean, // 是否並排
    radius: { default: "50px" }, // 圓角
    combine: Boolean // 使用value做為label
  },
  computed: {
    value: {
      get(){ return this.modelValue },
      set(val){ this.$emit('update:modelValue', val) }
    }
  },
  methods: {
    onChange() {
      this.$mitt.emit("validate"); // 通知FormItem校驗
      // this.$emit('change', this.$refs.radio.value);
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-radio
  &.is-flex
    display: flex
    flex-wrap: wrap
    align-items: center
    label
      margin: 0 12px 0 0
  label
    margin-bottom: 5px
    cursor: pointer
    display: flex
    align-items: center
    &.is-disabled
      p
        color: #ccc
      .radio-decorator
        border: 1px solid #e3e3e3
        background-color: #f3f3f3
    p
      font-size: 15px
      line-height: 20px
    input
      position: absolute
      left: -999px
      opacity: 0
      pointer-events: none
      &:checked + .radio-decorator
        border-color: #000
        &:before
          background-color: #000
    .radio-decorator
      margin-right: 6px
      flex: 0 0 18px
      width: 18px
      height: 18px
      border-radius: 3px
      border: 1px solid #ccc
      position: relative
      cursor: pointer
      background-color: #fff
      &::before
        content: ""
        display: block
        border-radius: 1em
        background-size: contain
        background-position: 100%
        width: 50%
        height: 50%
        box-sizing: border-box
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%,-50%)
</style>
