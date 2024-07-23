<template lang="pug">
  .tree
    .tree-wrapper(v-for="(item, index) in data" :key="item.id")
      .condition
        .days
          p {{ item.days }}天後
        p {{ item.name + (index + 1) }}
        .button-wrapper
          ud-button(@click="addItem(index)" circle plain) +
          ud-button(@click="addChildren(index, item)" circle plain) C
          ud-button(@click="removeItem(index)" circle plain) -
      tree(:data="item.children" v-if="item.children?.length > 0")
      .tree-end(v-else) 
        p 結束
</template>

<script>
export default {
  name: 'Tree',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    addItem(index) {
      this.$mitt.emit("addItem", {
        item: this.data,
        index,
      });
    },
    addChildren(index, item) {
      this.$mitt.emit("addChildren", {
        item,
        index,
      });
    },
    removeItem(index) {
      this.$mitt.emit("removeItem", {
        item: this.data,
        index,
      });
    },
  }
}
</script>

<style lang="sass" scoped>
.tree
  width: 132px
  margin-left: 160px
  margin-top: -115px
  .tree-wrapper
    position: relative
    .condition
      margin-bottom: 15px
      cursor: pointer
      border: 1px solid #ccc
      display: block
      padding: 5px
      p
        width: 100%
        display: block
      .button-wrapper
        display: flex
        ::v-deep .ud-button
          button
    .tree-end
      border: 1px solid #ccc
      padding: 5px 15px
      position: absolute
      right: -90px
      top: 50%
      transform: translate(0%,-50%)
.condition
  display: flex
</style>
