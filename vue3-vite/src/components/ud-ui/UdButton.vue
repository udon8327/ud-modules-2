<template>
  <div class="ud-button">
    <button
      @click="clickHandler"
      v-bind="$attrs"
      :disabled="disabled || loading"
      :class="{
        'is-disabled': disabled || loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      }"
    >
      <div class="button-wrapper">
        <span><slot>按鈕</slot></span>
        <div class="button-icon" v-if="loading || icon || image">
          <div class="icon-loading" v-if="loading"></div>
          <i :class="icon" v-if="icon && !loading"></i>
          <img :src="image" alt="" v-if="image && !loading">
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import { throttle } from '@/utils/ud-utils'

export default {
  name: 'UdButton',
  inheritAttrs: false,
  props: {
    icon: { default: '' }, // CSS的icon
    image: { default: '' }, // 圖片的icon
    loading: Boolean, // 載入中
    disabled: Boolean, // 禁止點擊
    plain: Boolean, // 線條化
    round: Boolean, // 圓角
    circle: Boolean, // 圓型
    throttle: Boolean, // 函式節流
    throttleTime: { default: 1000 } // 函式節流間隔時間
  },
  methods: {
    clickHandler(evt) {
      if(this.throttle) return;
      this.$emit('click', evt);
    }
  },
  mounted() {
    if(!this.throttle) return;
    this.$el.addEventListener('click', throttle(
        evt => this.$emit('click', evt),
        this.throttleTime
      )
    );
  }
}
</script>

<style lang="sass" scoped>
.ud-button
  button
    background-color: $main
    border: 1px solid $main
    color: #fff
    padding: 10px
    border-radius: 5px
    width: 100%
    min-width: 0px
    max-width: 100%
    cursor: pointer
    box-shadow: none
    appearance: none
    text-align: center
    outline: none !important
    transition: all 0.2s ease
    position: relative
    .button-wrapper
      display: inline-flex
      justify-content: center
      align-items: center
      position: relative
      span
        font-size: 16px
      .button-icon
        position: absolute
        left: -32px
        top: 50%
        transform: translate(0%, -50%)
        display: flex
        justify-content: center
        align-items: center
        i
          font-size: 24px
        img
          width: 24px
          height: 24px
        .icon-loading
          border: 2px solid rgba(#fff, 0.2)
          border-top: 2px solid #fff
          border-radius: 50%
          width: 24px
          height: 24px
          animation: spin .5s linear infinite
          @keyframes spin
            0%
              transform: rotate(0deg)
            100% 
              transform: rotate(360deg)
    &:hover, &:focus
      opacity: 0.85
    &.is-plain
      background-color: #fff
      border: 1px solid $main
      color: $main
      &:hover,&:focus
        background-color: $main
        border: 1px solid $main
        color: #fff
    &.is-disabled
      background-color: #ddd
      border: 1px solid #ccc
      color: #888
      cursor: not-allowed
    &.is-round
      border-radius: 50px
    &.is-circle
      border-radius: 50%
      width: 40px
      height: 40px
</style>
