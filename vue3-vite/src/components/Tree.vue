<template lang="pug">
.tree-wrapper(v-for="(item, index) in data" :key="item.id")
  .condition-wrapper
    .condition
      .days
        p {{ item.days }}天後
      p {{ item.name + (index + 1) }}
      .button-wrapper
        ud-button(@click="addChildren(index, item)" circle plain) ↓
        ud-button(@click="addItem(index)" circle plain) →
        ud-button(@click="removeItem(index)" circle plain) ✕
      .line-v
    .line-h(v-if="index < data.length - 1")
    .tree-end(v-if="item.children?.length === 0")
      p 結束
  .children-wrapper
    tree(:data="item.children" v-if="item.children?.length > 0")
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
.tree-wrapper
  position: relative
  .condition-wrapper
    padding: 0px 0px 25px 0px
    display: flex
    .condition
      width: 140px
      flex: 0 0 140px
      cursor: pointer
      border: 1px solid #ccc
      display: block
      padding: 4px
      position: relative
      p
        width: 100%
      .button-wrapper
        display: flex
        justify-content: space-between
      .line-v
        width: 1px
        background-color: #ccc
        min-height: 25px
        position: absolute
        left: 50%
        bottom: -26px
        transform: translate(-50%, 0%)
    .line-h
      height: 1px
      background-color: #ccc
      margin-top: 48px
      flex: 1 1 0
      min-width: 15px
  .children-wrapper
    display: flex
    align-items: flex-start
  .tree-end
    border: 1px solid #ccc
    padding: 5px 15px
    position: absolute
    left: 50%
    bottom: -35px
    transform: translate(-50%, 0%)
.condition
  display: flex
</style>
