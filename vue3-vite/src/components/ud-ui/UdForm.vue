<template>
  <div class="ud-form" :class="{'is-no-error-msg': noErrorMsg}">
    <form 
      v-bind="$attrs"
    >
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UdForm',
  inheritAttrs: false,
  provide() {
    return {
      form: this  // 傳遞Form實例给後代，比如FormItem用來校驗
    }
  },
  data() {
    return {
      submitLock: true
    }
  },
  props: {
    model: { // 驗證資料
      type: Object,
      required: true
    },
    rules: { // 驗證規則
      type: Object
    },
    noErrorMsg: {
      type: Boolean // 有無錯誤提示
    }
  },
  methods: {
    validate(successCb = () => {console.log('驗證成功')}, failedCb = () => {console.log('驗證失敗')}) {
      this.submitLock = false;
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate(true));
      // console.log('tasks: ', tasks);
      Promise.all(tasks)
        .then(() => successCb())
        .catch(() => failedCb())
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-form
  &.is-no-error-msg
    .ud-form-item
      &.is-error
        .ud-form-item-right
          .ud-input,.ud-textarea,.ud-select
            input,textarea,select
              border: 1px solid #cecece
              &:focus
                border: 1px solid #cecece
          >p.error-message
            display: none
</style>
