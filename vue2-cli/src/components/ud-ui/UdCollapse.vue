<template>
  <div class="ud-collapse" :style="{'transition-duration': durationSecond}">
    <div class="ud-collapse-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UdCollapse',
  props: {
    value: false,
    duration: {
      default: 0.2
    }
  },
  data() {
    return {
      isShow: this.value
    }
  },
  computed: {
    durationSecond() {
      return `${ this.duration }s`
    }
  },
  watch: {
    value() {
      this.isShow = this.value;
    },
    isShow() {
      this.$nextTick(() => {
        this.collapse();
        this.$emit('switch', this.isShow);
      })
    }
  },
  methods: {
    open() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    switch() {
      this.isShow = !this.isShow;
    },
    collapse() {
      let el = this.$el;
      if(this.isShow) {
        el.style.height = el.querySelector('.ud-collapse-wrapper').clientHeight + "px";
        return;
      }
      el.style.height = 0;
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-collapse
  transition: height .2s ease
  height: 0
  overflow: hidden
  will-change: auto
</style>
