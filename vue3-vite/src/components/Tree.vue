<template>
  <ul class="tree">
    <li v-for="(item, index) in data" :key="item.id">
      <div class="d-flex">
        <p>{{ index + "." + item.label }}</p>
        <ud-button @click="addItem(index)" circle plain>+</ud-button>
        <ud-button @click="addChildren(index, item)" circle plain>+C</ud-button>
        <ud-button @click="removeItem(index)" circle plain>-</ud-button>
      </div>
      <template v-if="item.children?.length > 0">
        <tree :data="item.children"></tree>
      </template>
    </li>
  </ul>
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
ul.tree
  border-left: 1px solid #ccc
  li
    margin: 5px 0
.d-flex
  display: flex
</style>
