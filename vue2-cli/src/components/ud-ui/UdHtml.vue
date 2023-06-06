<template>
  <div class="ud-html" v-html="nl2br(text)"></div>
</template>

<script>
export default {
  name: 'UdHtml',
  props: {
    text: { default: "<h1>H1 用戶自定義訊息</h1><h2>H2 用戶自定義訊息</h2><h3>H3 用戶自定義訊息</h3><h4>H4 用戶自定義訊息</h4><h5>H5 用戶自定義訊息</h5><h6>H6 用戶自定義訊息</h6>\n<p>p 用戶自定義訊息</p><span>span 用戶自定義訊息</span>" } // 文字
  },
  methods: {
    nl2br(str, is_xhtml) {
      if (typeof str === 'undefined' || str === null) {
          return '';
      }
      let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-html
  text-align: left
  font-size: 14px
  h1
    font-size: 32px
  h2
    font-size: 24px
  h3
    font-size: 18px
  h4
    font-size: 16px
  h5
    font-size: 14px
  h6
    font-size: 12px
  p,span,label
    font-size: 16px
    @media (max-width: 340px)
      font-size: 14px
</style>
