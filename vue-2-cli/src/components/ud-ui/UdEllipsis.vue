<template>
  <p class="ud-ellipsis" :style="{webkitLineClamp: maxLine}">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'UdEllipsis',
  props: {
    maxLine: { default: 1, } // 指定省略行數
  }
}
</script>

<style lang="sass" scoped>
.ud-ellipsis
  display: -webkit-box
  overflow: hidden
  // text-overflow: ellipsis
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
</style>
