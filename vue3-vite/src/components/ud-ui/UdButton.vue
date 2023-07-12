<template>
  <div class="ud-button">
    <button
      ref="button"
      @click="clickHandler"
      v-bind="$attrs"
      :disabled="disabled || loading"
      :class="{
        'is-disabled': disabled || loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-icon': image
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

<script setup>
import { ref, onMounted } from "vue";
import { throttle } from "@/utils/ud-utils";

defineOptions({inheritAttrs: false});
const props = defineProps({
  icon: String, // CSS的icon
  image: String, // 圖片的icon
  loading: Boolean, // 載入中
  disabled: Boolean, // 禁止點擊
  plain: Boolean, // 線條化
  round: Boolean, // 圓角
  circle: Boolean, // 圓型
  throttle: Boolean // 函式節流
});
const emit = defineEmits(["click"]);

const button = ref(null);

onMounted(() => {
});

const clickHandler = (evt) => {
  if (props.throttle) {
    throttle(() => emit("click", evt), 10000);
    emit("click", evt);
  } else {
    emit("click", evt);
  }
};
</script>

<!-- <script>
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
    throttle: Boolean // 函式節流
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
        evt => this.$emit('click', evt)
      )
    );
  }
}
</script> -->

<style lang="sass" scoped>
.ud-button
  button
    appearance: none
    width: 100%
    padding: 5px 10px
    min-height: 40px
    border: 1px solid #000
    border-radius: 0px
    background-color: #000
    transition: all 0.2s ease
    min-width: 0px
    max-width: 100%
    cursor: pointer
    box-shadow: none
    text-align: center
    outline: none !important
    position: relative
    .button-wrapper
      display: inline-flex
      justify-content: center
      align-items: center
      position: relative
      span
        font-size: 15px
        line-height: 16px
        letter-spacing: 2px
        color: #fff
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
      border: 1px solid #000
      span
        color: #000
    &.is-disabled
      background-color: #ddd
      border: 1px solid #ccc
      color: #888
      cursor: not-allowed
      img
        opacity: 0.4 !important
      span
        color: #888 !important
    &.is-round
      border-radius: 50px
    &.is-circle
      border-radius: 50%
      width: 40px
      height: 40px
    &.is-icon
      .button-wrapper
        transform: translate(6px, 0)
</style>
