<template>
  <div class="ud-select">
    <select 
      ref="select"
      v-model="value" 
      v-bind="$attrs"
      :data-placeholder-selected="value.length === 0"
      :class="{hasValue: value.length !== 0}"
      @change="onChange"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in optionsArr" :value="option[valueBy]" :key="option[valueBy]" :disabled="option.disabled">
        {{ combine ? option[valueBy] : option[labelBy] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'UdSelect',
  inheritAttrs: false,
  props: {
    modelValue: { default: "" }, // value值
    options: { // 選項
      default: () => {
        return [
          { label: "", value: "", disabled: true }
        ]
      }
    },
    placeholder: { default: "請選擇一項" }, // 取代文字
    combine: Boolean, // 使用value做為label
    center: Boolean, // 是否置中
    group: { default: "" }, // 是否群組
    index: { default: 0 }, // 群組索引
    labelBy: { default: "label" }, // label替代值
    valueBy: { default: "value" }, // value替代值
    childrenBy: { default: "children" }, // children替代值
  },
  data() {
    return {
      groupWatch: []
    }
  },
  computed: {
    value: {
      get(){ return this.modelValue },
      set(val){ this.$emit('update:modelValue', val) }
    },
    optionsArr() {
      this.groupWatch = [...this.group];
      let temp = this.options;
      if(this.index === 0) return temp;
      if(this.group[this.index - 1]) {
        for(let i = 0; i < this.index; i++) {
          temp = temp.find(option => option.value === this.group[i])[this.childrenBy];
        }
        return temp;
      }
      return [];
    }
  },
  watch: {
    groupWatch(newVal, oldVal) {
      let target;
      for(let i = 0; i < this.group.length; i++) {
        if(newVal[i] !== oldVal[i]) target = i;
      }
      if(this.index > target) this.$emit('input', "");
    }
  },
  mounted() {
    if(this.center) this.centerSelect();
    if(this.center) window.addEventListener("resize", this.centerSelect);
  },
  destroyed() {
    if(this.center) window.removeEventListener("resize", this.centerSelect);
  },
  methods: {
    onChange() {
      if(this.center) this.centerSelect();
      this.$mitt.emit("validate"); // 通知FormItem校驗
      this.$emit('change', this.$refs.select.value);
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
      let el = this.$refs.select;
      let text = "";
      el.value ? text = this.options.find(item => item.value == el.value).label : text = this.placeholder;
      let emptySpace = el.offsetWidth - this.getTextWidth(text, el);
      el.style.textIndent = `${ ( emptySpace / 2 ) - 10 }px`;
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-select
  position: relative
  &:before
    content: ""
    width: 0
    height: 0
    border-color: #ccc transparent transparent
    border-style: solid
    border-width: 4px 4px 0
    top: 50%
    margin-top: -2px
    right: 8px
    position: absolute
    z-index: 1
    pointer-events: none
  select
    appearance: none
    width: 100%
    padding: 5px 10px
    min-height: 40px
    font-size: 14px
    border: 1px solid #ccc
    border-radius: 1px solid #ccc
    background-color: #fff
    transition: all 0.2s ease
    transition-property: border
    cursor: pointer
    &.hasValue
      &[data-placeholder-selected]
        color: #000
    option
      color: #000
    &:focus
      outline: 0
      border: 1px solid #000
    &[data-placeholder-selected]
      color: #aaa
    &[multiple]
      option:nth-of-type(1)
        color: #aaa
</style>