<template>
  <div class="ud-qrcode">
    <div v-if="!ready" class="icon-css"></div>
    <img v-show="ready" ref="img" :src="QrCodeSrc" :alt="url">
  </div>
</template>

<script>
export default {
  name: 'UdQrcode',
  mounted() {
    this.$refs.img.onload = () => {
      this.ready = 1;
    }
  },
  data() {
    return {
      ready: 0,
    }
  },
  props: {
    url: { default: "https://www.google.com.tw/" }, // 網址
    width: { default: "300" }, // 寬度
    height: { default: "300" }, // 高度
  },
  computed: {
    QrCodeSrc() {
      return `http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=${ this.width }x${ this.height }&chl=${ this.url }`
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-qrcode
  display: flex
  justify-content: center
  align-items: center
  .icon-css
    border: 3px solid rgba(#000, 0.2)
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
</style>
