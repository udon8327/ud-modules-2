<template lang="pug">
#tree-demo
  .link-button
    ud-button(@click="toIndex" circle plain) X
  .tree-area
    .tree-trigger-area
      .tree-trigger
        h6 觸發條件
        p 加入好友
    .tree-line
    .tree-condition-area
      tree(:data="treeList")
  .grid-area
    .grid-wrapper
      .grid 1
      .grid 2
      .grid 3
      .grid 4
      .grid 5
      .grid 6
      .grid 7
      .grid 8
      .grid 9
      .grid 10
</template>

<script>
import Tree from "@/components/Tree.vue";

export default {
  name: "TreeDemo",
  components: {
    Tree,
  },
  data() {
    return {
      treeName: "",
      treeList: [
        {
          type: "",
          name: "條件",
          days: 1,
          condition: {},
          children: [],
        }
      ],
    };
  },
  mounted() {
    this.$mitt.on("addItem", (val) => {
      // console.log("addItem", val);
      val.item.push({
        type: "",
        name: "條件",
        days: 1,
        condition: {},
        children: [],
      });
    });
    this.$mitt.on("addChildren", (val) => {
      // console.log("addChildren", val);
      val.item.children.push({
        type: "",
        name: "條件",
        days: 1,
        condition: {},
        children: [],
      });
    });
    this.$mitt.on("removeItem", (val) => {
      // console.log("removeItem", val);
      val.item.splice(val.index, 1);
    });
  },
  methods: {
    toIndex() {
      this.$router.push("/index");
    },
  },
};
</script>

<style lang="sass">
.container
  max-width: 100% !important
</style>

<style lang="sass" scoped>
.link-button
  position: absolute
  right: 10px
  top: 10px
.tree-area
  padding: 15px
  display: flex
  .tree-trigger-area
    flex: 0 0 1
    .tree-trigger
      width: 120px
      border: 1px solid #ccc
      text-align: center
      cursor: pointer
      h6
        background-color: #eee
        padding: 4px
      p
        padding: 8px
  .tree-line
    width: 40px
    flex: 0 0 40px
    height: 1px
    background-color: #ccc
    margin-top: 50px
  .tree-condition-area
    flex: 1 1 0
    margin-left: -160px
    margin-top: 115px
.grid-area
  background-color: rgba(aqua, 0.5)
  padding: 15px
  .grid-wrapper
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-auto-rows: minmax(100px, auto)
    column-gap: 10px
    row-gap: 10px
    .grid
      border: 1px solid #ccc
      &:nth-of-type(1)
        grid-column-start: 1
        grid-column-end: 3
        grid-row-start: 1
        grid-row-end: 4
</style>