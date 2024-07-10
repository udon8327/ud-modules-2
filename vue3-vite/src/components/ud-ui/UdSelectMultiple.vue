<template>
  <div class="ud-select-multiple">
    <el-select
      v-model="modelValue"
      multiple
      collapse-tags
      :placeholder="placeholder"
      ref="select"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'UdSelectMultiple',
  inheritAttrs: false,
  props: {
    value: null, // value值
    options: null, // 選項
    placeholder: { default: "請選擇一項" }, // 取代文字
  },
  computed: {
    modelValue: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
  },
  methods: {
    onChange() {
      this.$mitt.emit("validate"); // 通知FormItem校驗
      this.$emit('change', this.$refs.select.value);
    },
  }
}
</script>

<style lang="sass" scoped>
.ud-select-multiple
  position: relative
  cursor: pointer
  &:before
    content: ""
    width: 0
    height: 0
    border-color: #333 transparent transparent
    border-style: solid
    border-width: 11px 7px 0
    top: 50%
    margin-top: -.2em
    right: 10%
    position: absolute
    z-index: 1
    pointer-events: none
</style>
