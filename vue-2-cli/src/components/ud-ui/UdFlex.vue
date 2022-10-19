<template>
  <div class="ud-flex">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UdFlex",
  props: {

  }
}
</script>

<style lang="sass" scoped>
.ud-flex
  display: flex
  justify-content: center
  align-items: center
  >*
    flex: 1 1 50%
    max-width: 50%
  >* + *
    margin-left: 15px
</style>
