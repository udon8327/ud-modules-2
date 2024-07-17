<template lang="pug">
#tree-demo
  .link-button
    ud-button(@click="toIndex" circle plain) X
  .tree-area
    ud-input(v-model="treeName")
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
          label: "測試",
          layer: 1,
          children: [],
        }
      ],
    };
  },
  mounted() {
    this.$mitt.on("addItem", (val) => {
      // console.log("addItem", val);
      if (val.item.length < 4) {
        val.item.push({
          label: this.treeName || "測試",
          children: [],
        });
      }
    });
    this.$mitt.on("addChildren", (val) => {
      // console.log("addChildren", val);
      val.item.children.push({
        label: this.treeName || "測試",
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