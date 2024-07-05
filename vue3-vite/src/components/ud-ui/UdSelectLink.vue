<template>
  <div class="ud-select-link" :class="{'is-flex': flex}">
    <ud-select v-model="value[0]" :options="firstArr" :placeholder="placeholder[0]" :combine="combine"></ud-select>
    <slot></slot>
    <ud-select v-model="value[1]" :options="secondArr" :placeholder="placeholder[1]" :combine="combine"></ud-select>
    <slot name="second"></slot>
    <ud-select v-model="value[2]" :options="thirdArr" :placeholder="placeholder[2]" :combine="combine" v-if="third"></ud-select>
    <slot name="third"></slot>
  </div>
</template>

<script>
export default {
  name: 'UdSelectLink',
  props: {
    modelValue: null, // value值
    options: null, // 選項 [Array]
    placeholder: { // placeholder值 [Array]
      default: () => {
        return ["請選擇一項", "請選擇一項", "請選擇一項"];
      }
    },
    third: Boolean, // 是否有第三項
    flex: Boolean, // 是否並排
    combine: Boolean, // 是否label直接使用value值
  },
  computed: {
    value: {
      get(){ return this.modelValue },
      set(val){ this.$emit('update:modelValue', val) }
    },
    firstValue() {
      return this.value[0];
    },
    secondValue() {
      return this.value[1];
    },
    thirdValue() {
      return this.value[2];
    },
    firstArr() {
      let temp = this.options;
      return temp;
    },
    secondArr() {
      let temp = [];
      if(this.value[0]){
        temp = this.options.find(option => option.value === this.value[0]).children;
      }
      return temp;
    },
    thirdArr() {
      let temp = [];
      if(this.value[1]){
        temp = this.secondArr.find(option => option.value === this.value[1]).children;
      }
      return temp;
    },
  },
  watch: {
    firstValue() {
      this.value.splice(1, 1, "");
    },
    secondValue() {
      if(this.third) this.value.splice(2, 1, "");
    },
  },
  mounted() {
    // this.$on('validate', () => {
    //   this.$nextTick(() => {
    //     this.$parent.$emit('validate'); // 通知FormItem校驗
    //   })
    // })
  }
}
</script>

<style lang="sass" scoped>
.ud-select-link
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
