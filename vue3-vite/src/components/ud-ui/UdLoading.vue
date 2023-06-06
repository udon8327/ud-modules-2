<template>
  <transition name="loading">
    <div class="ud-loading" v-show="isShow" :class="{'theme-white': theme === 'white'}">
      <div class="modal-wrapper">
        <div class="modal-content">
          <div class="modal-header">
            <div v-if="iconType === 'css'" class="icon-css"></div>
            <i v-else-if="iconType === 'font'" class="icon-font" :class="iconFont"></i>
            <img v-else class="icon-img" :src="iconImg">
          </div>
          <div class="modal-body">
            <p v-html="nl2br(msg)"></p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { nl2br } from '@/utils/ud-utils'

export default {
  name: 'UdLoading',
  data() {
    return {
      isShow: false,
      fixed: false, // 是否固定body
      theme: "", // 戴入主題 [white]
      iconType: "css", // icon類型 [css:CSS, font:字型, img:圖片]
      iconFont: "fas fa-spinner fa-pulse", // 字型icon的class
      iconImg: "https://image.flaticon.com/icons/svg/553/553265.svg", // 圖片icon的路徑
      msg: "", // 載入訊息
    }
  },
  mounted() {
    this.isShow = true;
  },
  methods: {
    nl2br(val) {
      return nl2br(val);
    },
    destroy() {
      this.isShow = false;
      document.body.style.overflowY = 'auto';
      setTimeout(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      }, 200);
    },
  }
}
</script>

<style lang="sass" scoped>
.ud-loading
  position: fixed
  z-index: 140
  left: 0
  top: 0
  width: 100%
  height: 100%
  overflow: auto
  background-color: rgba(0,0,0,0.2)
  &.theme-white
    background-color: rgba(255,255,255,0.5)
    .modal-wrapper
      .modal-content
        .modal-header
          .icon-css
            border: 3px solid rgba(#000, 0.2)
            border-top: 3px solid #000
          i
            color: #666
        .modal-body
          p
            color: #666
  .modal-wrapper
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    .modal-content
      .modal-header
        text-align: center
        margin-bottom: 5px
        display: flex
        justify-content: center
        .icon-css
          border: 3px solid rgba(#fff, 0.2)
          border-top: 3px solid #fff
          border-radius: 50%
          width: 32px
          height: 32px
          animation: spin .5s linear infinite
          @keyframes spin
            0%
              transform: rotate(0deg)
            100% 
              transform: rotate(360deg)
        .icon-font
          font-size: 24px
          color: #999
        .icon-img
          max-width: 32px
          margin-bottom: 5px
          animation: spin 2s linear infinite
          @keyframes spin
            0%
              transform: rotate(0deg)
            100% 
              transform: rotate(360deg)
      .modal-body
        padding-top: 6px
        p
          color: #fff
          letter-spacing: 2px
</style>
