<template>
  <span class="ud-countdown" ref="count">{{countTime}}</span>
</template>

<script>
export default {
  name: 'UdCountdown',
  props: {
    time: { default: 60 }, // 倒數秒數
    delay: Boolean // 不馬上開始倒數
  },
  data() {
    return {
      countTime: this.time
    }
  },
  mounted() {
    if(!this.delay) this.countdown();
  },
  methods: {
    countdown(){
      let countdown = setInterval(() => {
        this.countTime -= 1;
        if(this.countTime <= 0){
          this.$emit("timeup");
          clearInterval(countdown);
        }
      }, 1000);
    },
    reset(){
      this.countTime = this.time;
      this.countdown();
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
