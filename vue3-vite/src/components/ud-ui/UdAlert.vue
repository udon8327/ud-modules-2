<template>
  <transition name="fade">
    <div class="ud-alert" v-if="isShow" @click.self="maskHandler">
      <div class="modal-wrapper">
        <div class="modal-close" v-if="btnClose" @click="destroy">
          <i class="icon-close"></i>
        </div>
        <div class="modal-image" v-if="image">
          <img :src="require(`@/assets/${ image }`)">
        </div>
        <div class="modal-header" v-if="title">
          <p v-html="nl2br(title)"></p>
        </div>
        <div class="modal-body" v-if="msg">
          <p v-html="nl2br(msg)"></p>
        </div>
        <div class="modal-footer" v-if="!noButton">
          <ud-button @click="cancelHandler" plain v-if="confirm">{{ cancelText }}</ud-button>
          <ud-button @click="confirmHandler">{{ confirmText }}</ud-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { nl2br } from '@/utils/ud-utils'

export default {
  name: 'UdAlert',
  data() {
    return {
      isShow: false, // 是否顯示
      noButton: false, // 是否沒有按鈕
      confirm: false, // 是否有確認+取消鈕
      maskClose: false, // 點擊遮罩關閉
      btnClose: false, // 右上關閉按鈕
      scrollLock: false, // 是否鎖定背景頁面捲動
      title: '', // 標題文字
      msg: "網路通信錯誤，請稍候再試", // 訊息文字
      cancelText: "取消", // 取消鈕文字
      onCancel: () => {}, // 取消鈕callback
      confirmText: "確定", // 確認鈕文字
      onConfirm: () => {}, // 確認鈕callback
      resolve: '', // 保存resolve
      reject: '', // 保存reject
      image: "", // 圖片路徑
      time: 0, // 多久後自動關閉
    }
  },
  mounted() {
    if(this.time) {
      setTimeout(() => {
        this.destroy();
      }, this.time);
    }
    if(this.scrollLock) document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    if(this.scrollLock) document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
  },
  methods: {
    show() {
      this.isShow = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      })
    },
    nl2br(val) {
      return nl2br(val);
    },
    confirmHandler() {
      this.onConfirm();
      this.resolve('confirm');
      this.destroy();
    },
    cancelHandler() {
      this.onCancel();
      this.reject('cancel');
      this.destroy();
    },
    maskHandler() {
      if(this.maskClose) this.destroy();
    },
    destroy() {
      this.isShow = false;
      if(this.scrollLock) document.getElementsByTagName('body')[0].style.overflow = 'auto'
      setTimeout(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      }, 200);
    }
  },
}
</script>

<style lang="sass" scoped>
.ud-alert
  position: fixed
  z-index: 120
  left: 0
  top: 0
  right: 0
  bottom: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  overflow-x: hidden
  .modal-wrapper
    position: relative
    padding: 15px
    width: 80%
    max-width: 460px
    max-height: 88%
    box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.3)
    border-radius: 0px
    text-align: center
    display: flex
    flex-direction: column
    background-color: #fff
    p
      font-size: 16px
      margin-bottom: 0
      color: #333
    .modal-close
      position: absolute
      width: 26px
      height: 26px
      right: 4px
      top: -32px
      cursor: pointer
      &:hover
        .icon-close
          opacity: 1
      .icon-close
        opacity: 0.75
        transition: all 0.2s ease
        &:before, &:after
          position: absolute
          left: 13px
          content: ''
          height: 26px
          width: 2px
          background-color: #fff
        &:before
          transform: rotate(45deg)
        &:after
          transform: rotate(-45deg)
    .modal-image
      padding: 0 15%
    .modal-header
      flex: 0 0 auto
      padding: 10px 0
      p
        font-size: 18px
        line-height: 22px
        letter-spacing: 2px
    .modal-body
      flex: 1 1 auto
      padding: 10px 0 20px 0
      overflow-y: auto
    .modal-footer
      flex: 0 0 auto
      padding: 0 3%
      display: flex
      justify-content: space-between
      align-items: center
      .ud-button
        flex: 1 1 0
        ::v-deep button
          max-width: 96px
</style>
