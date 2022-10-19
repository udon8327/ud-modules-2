<template>
  <div class="ud-ratio">
    <div class="ud-ratio-bg" :style="{
      backgroundImage: 'url(' + `${ src ? src : avatarDefault }` + ')',
      paddingBottom: height + '%',
      borderRadius: radius,
      backgroundSize: bgSize
    }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import avatarDefault from '@/assets/images/picture/avatar_default.jpg'

export default {
  name: 'UdRatio',
  props: {
    src: { default: avatarDefault }, // 背景圖片
    height: { default: 100 }, // 高度比例
    radius: { default: '0px' }, // 圓角
    bgSize: { default: "cover" } // 背景尺寸 (cover, contain, 100%...等)
  },
  data() {
    return {
      avatarDefault: avatarDefault
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-ratio
  .ud-ratio-bg
    overflow: hidden
    width: 100%
    padding-bottom: 100%
    height: 0
    background: url('https://i.imgur.com/s3w1Sm3.jpg') no-repeat center center
    background-size: cover
    background-color: #e3e3e3
</style>
