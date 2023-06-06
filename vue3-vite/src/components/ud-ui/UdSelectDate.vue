<template>
  <div class="ud-select-date" :class="{'is-flex': flex}">
    <ud-select v-model="modelValue[0]" :options="firstArr" :placeholder="placeholder[0]" combine></ud-select>
    <slot></slot>
    <ud-select v-model="modelValue[1]" :options="secondArr" :placeholder="placeholder[1]" combine></ud-select>
    <slot name="second"></slot>
    <ud-select v-model="modelValue[2]" :options="thirdArr" :placeholder="placeholder[2]" combine v-if="third"></ud-select>
    <slot name="third"></slot>
  </div>
</template>

<script>
export default {
  name: 'UdSelectDate',
  props: {
    value: null, // value值
    placeholder: { // placeholder值 [Array]
      default: () => {
        return ["年", "月", "日"];
      }
    },
    third: Boolean, // 是否有第三項
    flex: Boolean, // 是否並排
    roc: Boolean // 是否為民國年
  },
  computed: {
    modelValue: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
    firstValue() {
      return this.modelValue[0];
    },
    secondValue() {
      return this.modelValue[1];
    },
    thirdValue() {
      return this.modelValue[2];
    },
    firstArr() {
      let temp = [];
      let time = new Date();
      let year = time.getFullYear();
      if(this.roc) year = year - 1911;
      let yearAfter = year - 120;
      if(this.roc && yearAfter <= 0) yearAfter = 1;
      for(let i = year; i >= yearAfter; i--){
        temp.push({value: i});
      }
      return temp;
    },
    secondArr() {
      let temp = [];
      if(this.firstValue){
        for(let i = 1; i <= 12; i++){
          temp.push({value: i});
        }
      }
      return temp;
    },
    thirdArr() {
      let temp = [];
      if(this.firstValue && this.secondValue){
        let year = parseInt(this.firstValue);
        if(this.roc) year = year + 1911;
        let date = new Date(year, this.secondValue, 0).getDate();
        for(let i = 1; i <= date; i++){
          temp.push({value: i});
        }
      }
      return temp;
    },
  },
  watch: {
    firstValue() {
      this.modelValue.splice(1, 1, "");
    },
    secondValue() {
      if(this.third) this.modelValue.splice(2, 1, "");
    },
  },
  mounted() {
    this.$on('validate', () => {
      this.$nextTick(() => {
        this.$parent.$emit('validate'); // 通知FormItem校驗
      })
    })
  }
}
</script>

<style lang="sass" scoped>
.ud-select-date
  margin-bottom: 0
  &.is-flex
    display: flex
    justify-content: center
    align-items: center
    .ud-select
      flex: 1 1 0
      margin: 0 5px 0 0
      &:last-of-type
        margin: 0
        + span,+ p
          margin: 0 5px
      + span,+ p
        margin: 0 5px 0 0
  .ud-select
    margin-bottom: 5px
</style>
