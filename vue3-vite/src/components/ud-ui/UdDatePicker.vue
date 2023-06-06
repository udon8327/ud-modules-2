<template>
  <div class="ud-date-picker">
    <el-date-picker
      class="ud-select"
      v-model="modelValue"
      v-bind="$attrs"
      type="date"
      :value-format="valueFormat"
      :align="align"
      :placeholder="placeholder"
      :editable="editable"
      ref="date"
      @change="onChange"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'UdDatePicker',
  inheritAttrs: false,
  props: {
    value: null,
    center: Boolean, // 是否置中
    valueFormat: { // 時間格式化
      default: "yyyy-MM-dd"
    },
    align: { // 對齊
      default: "center"
    },
    placeholder: {
      default: "請選擇日期"
    },
    editable: {
      default: false
    }
  },
  computed: {
    modelValue: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
  },
  mounted() {
    if(this.center) this.centerSelect();
    window.addEventListener("resize", this.centerSelect);
  },
  destroyed() {
    window.removeEventListener("resize", this.centerSelect);
  },
  methods: {
    onChange() {
      if(this.center) this.centerSelect();
      this.$parent.$emit('validate'); // 通知FormItem校驗
      this.$emit('change', this.$refs.date.$el.querySelector('.el-input__inner').value);
    },
    getTextWidth(text, target) {
      let el = document.createElement('span');
      let fontSize = window.getComputedStyle(target).fontSize || '14px';
      el.textContent = text;
      el.style.display = 'inline-block';
      el.style.fontSize = fontSize;
      document.body.appendChild(el);
      let elmWidth = el.offsetWidth;
      el.remove();
      return elmWidth;
    },
    centerSelect() {
      let el = this.$refs.date.$el.querySelector('.el-input__inner');
      let elValue = this.$refs.date.value;
      let text = "";
      elValue ? text = elValue : text = this.placeholder;
      let emptySpace = el.offsetWidth - this.getTextWidth(text, el);
      el.style.textIndent = `${ ( emptySpace / 2 ) }px`;
    }
  },
}
</script>

<style lang="sass" scoped>
.ud-date-picker
  .ud-select
    width: 100% !important
  .el-input__prefix
    display: none
  .el-input__inner
    padding: 0 !important
    transition: all 0s ease
  .el-input__suffix
    display: none
  input
    appearance: none
    border-radius: 0px
    border: 1px solid #ccc
    font-size: 14px
    padding: 5px 10px
    width: 100%
    min-height: 38px
    box-sizing: border-box
    background-color: #ccc
    transition: all 0.2s ease
    cursor: pointer
    font-size: 14px
    &::placeholder
      color: #aaa
    &:focus
      outline: 0
      border: 1px solid #000
</style>
