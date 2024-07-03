<template>
  <div class="ud-captcha">
    <div class="canvas-area" ref="canvasArea">
      <canvas id="verify-canvas" width="100" height="38" style="display: none;"></canvas>
      <img ref="codeimg" @click="refresh">
      <input type="hidden" v-model="inputVal">
    </div>
    <div class="refresh" @click="refresh" v-if="!noRefresh">
      <img src="@/assets/images/icon/refresh.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'UdCaptcha',
  computed: {
    inputVal: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    }
  },
  props: {
    value: String,
    color: { default: "#989799" }, // 字體顏色
    bgColor: { default: "#000" }, // 背景顏色
    randomColor: { default: "#777" }, // 隨機點線的顏色
    font: { default: "20px Arial" }, // 字體設定
    noLine: Boolean, // 無隨機線
    noDots: Boolean, // 無隨機點
    noRefresh: Boolean, //無刷新鈕
  },
  mounted() {
    this.drawCode();
  },
  methods: {
    drawCode() { // 繪製驗證碼
      let nums = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz".split("");
      let canvas = document.getElementById('verify-canvas'); // 取得HTML端畫布
      let context = canvas.getContext("2d"); // 取得畫布2D上下文
      context.fillStyle = this.bgColor; // 畫布填充色
      context.fillRect(0, 0, canvas.width, canvas.height); // 清空畫布
      context.fillStyle = this.color; // 設置字體顏色
      context.font = this.font; // 設置字體
      let rand = new Array();
      let x = new Array();
      let y = new Array();
      for (let i = 0; i < 4; i++) {
          rand[i] = nums[Math.floor(Math.random() * nums.length)]
          x[i] = i * 16 + 16;
          y[i] = Math.random() * 20 + 15;
          context.fillText(rand[i], x[i], y[i]);
      }
      let code = rand.join('');
      this.inputVal = code;
      
      if(!this.noLine){ // 畫3條隨機線
        for (let i = 0; i < 3; i++) {
          this.drawline(canvas, context);
        }
      }
      if(!this.noDots){ // 畫30個隨機點
        for (let i = 0; i < 30; i++) {
          this.drawDot(canvas, context);
        }
      }
      this.convertCanvasToImage(canvas);
    },
    drawline(canvas, context) { // 隨機線
      context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); // 隨機線的起點x座標是畫布x座標0位置 y座標是畫布高度的隨機數
      context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); // 隨機線的終點x座標是畫布寬度 y座標是畫布高度的隨機數
      context.lineWidth = 0.5; // 隨機線寬
      context.strokeStyle = this.randomColor; // 隨機線描邊屬性
      context.stroke(); // 描邊 即起點描到終點
    },
    drawDot(canvas, context) { // 隨機點(所謂畫點其實就是畫1px像素的線)
      let px = Math.floor(Math.random() * canvas.width);
      let py = Math.floor(Math.random() * canvas.height);
      context.moveTo(px, py);
      context.lineTo(px + 1, py + 1);
      context.lineWidth = 0.2;
      context.strokeStyle = this.randomColor;
      context.stroke();
    },
    convertCanvasToImage(canvas) { // 繪製圖片
      let image = this.$refs.codeimg;
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    refresh() { // 刷新驗證碼
      document.getElementById('verify-canvas').remove();
      this.$refs.canvasArea.insertAdjacentHTML('afterbegin', '<canvas width="100" height="38" id="verify-canvas" style="display: none;"></canvas>')
      this.drawCode();
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-captcha
  position: relative
  display: flex
  .canvas-area
    cursor: pointer
    border: 1px solid #ced4da
    img
      height: 48px
  .refresh
    cursor: pointer
    transform: translate(10px,5px)
</style>
