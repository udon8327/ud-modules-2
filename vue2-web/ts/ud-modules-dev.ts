declare var $: (selector: string) => any;

/*
==================== ud-modules 常用組件(開發中) ====================
Form
  ud-select-multiple：下拉複選框(依賴：element-ui)
  ud-input-phone：電話號碼連動輸入框
  ud-upload：上傳
  ud-image-upload：圖片上傳預覽
  ud-image-multi-upload：圖片上傳預覽(多張)
  ud-date-picker：日期選擇器(依賴：element-ui)
  ud-select-link：連動下拉框
  ud-captcha：圖形驗證碼

Data
  ud-table：表格
  ud-pagination：分頁

Notice
  ud-notify：通知訊息
  ud-popover：氣泡框

Tools
  ud-countdown-expire：倒數計時(時限)

Layout
  ud-flex：通用排版容器

Application
  ud-carousel：圖片輪播
  ud-youtube：水管播放
  ud-youtube-api：水管播放(控制版)
  ud-google-map：估狗地圖
  ud-select2：搜尋下拉框
  ud-scratch：刮刮樂
  ud-editor：文字編輯器

// ==================== ud-utils 常用函式(開發中) ====================
String
  randomHexColorCode：取得隨機十六進制顏色
  escapeHTML：轉義HTML(防XSS攻擊)
  convertCamelCase：駝峰式轉換
  replaceURLToLink：將字串內URL轉為超連結
  copyTextById：複製指定元素上的文字至剪貼簿

Number
  roundNumber：四捨五入到指定位數

Image
  canvasImageDownload：下載Canvas圖片

Array
  flatArray：二維陣列扁平化
  intersectionArray：兩陣列的交集
  shuffleArray：洗牌陣列

Object
  filterObj：過濾物件鍵值
  deleteObj：刪除物件鍵值
  deepCloneSimple：深拷貝(簡易版)

Time
  isLeapYear：判斷是否為閏年

Browser
  loadStyle：動態加載css文件
  insertPlugin：動態載入插件

Web
  httpsRedirect：HTTP跳轉HTTPS
  getUrlState：檢驗URL連接是否有效
  cdnBackup：CDN備援
  getCookie：取得Cookie的值
  parseUrl：解析網址
  toUrl：網址跳轉
  jumpReload：跳頁重整

Animation
  animate：RAF通用動畫函式

*/

//-----------------------Form-----------------------
// ud-select-multiple：下拉複選框(依賴：element-ui)
Vue.component('ud-select-multiple', {
  name: "UdSelectMultiple",
  template: `
    <div class="ud-select-multiple">
      <el-select
        v-model="modelValue"
        multiple
        collapse-tags
        :placeholder="placeholder"
        ref="select"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  `,
  inheritAttrs: false,
  props: {
    value: null, // value值
    options: null, // 選項
    placeholder: { default: "請選擇一項" }, // 取代文字
  },
  computed: {
    modelValue: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
  },
  methods: {
    onChange() {
      this.$parent.$emit('validate'); // 通知FormItem校驗
      this.$emit('change', this.$refs.select.value);
    },
  }
})

// ud-input-phone：電話號碼連動輸入框
Vue.component('ud-input-phone', {
  name: 'UdInputPhone',
  template: `
    <div class="ud-input-phone">
      <ud-input
        v-model="modelValue[0]"
        @input="onInput(1)"
        ref="input1"
        :placeholder="placeholder[0]"
        type="tel"
        maxlength="4"
      >
      </ud-input>
      <span class="separator">{{ separator }}</span>
      <ud-input
        v-model="modelValue[1]"
        @input="onInput(2)"
        ref="input2"
        :placeholder="placeholder[1]"
        type="tel"
        maxlength="3"
      >
      </ud-input>
      <span class="separator">{{ separator }}</span>
      <ud-input
        v-model="modelValue[2]"
        @input="onInput(3)"
        ref="input3"
        :placeholder="placeholder[2]"
        type="tel"
        maxlength="3"
      >
      </ud-input>
    </div>
  `,
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: ["", "", ""]
    },
    placeholder: {
      type: Array,
      default: ["", "", ""]
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String,
      default: ""
    }
  },
  computed: {
    modelValue: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
  },
  mounted() {
  },
  methods: {
    onInput() {
      if(this.autoFocus) {
        if(this.modelValue[0].length === 4) {
          this.$refs.input2.focus();
        }
        if(this.modelValue[1].length === 3) {
          this.$refs.input3.focus();
        }
      }
      this.$parent.$emit('validate'); // 通知FormItem校驗
    },
    focus() {
      this.$refs.input.focus();
    }
  }
})

// ud-upload：上傳
Vue.component('ud-upload', {
  name: "UdUpload",
  template: `

  `,
  props: {
    
  },
})

// ud-image-upload：圖片上傳預覽
Vue.component("ud-image-upload", {
  name: "UdImageUpload",
  template: `
    <div class="ud-image-upload">
      <div class="preview-area">
        <img :src="preview" ref="preview">
      </div>
      <div class="info-area">
        <div class="info-left">
          <p v-if="!image">未選擇檔案</p>
          <p v-if="image" ref="fileName">檔案名稱：{{ image.name }}</p>
          <p v-if="image" ref="fileSize">檔案大小：{{ parseInt(image.size/1024) }}KB</p>
        </div>
        <div class="info-right">
          <input type="file" accept="image/*" ref="file" @change="previewImage">
          <ud-button @click="clickInput">上傳圖片</ud-button>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      preview: "",
      image: ""
    };
  },
  mounted() {
    let dropbox = this.$refs.preview;
    dropbox.addEventListener('dragenter', this.onDrag, false);
    dropbox.addEventListener('dragover', this.onDrag, false);
    dropbox.addEventListener('drop', this.onDrop, false);
  },
  methods: {
    clickInput() {
      this.$refs.file.click();
    },
    onDrag(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      console.log('drop');
      let dt = e.dataTransfer;
      this.pre = this.$refs.file.files[0].name;
      let reader = new FileReader();
      reader.readAsDataURL(dt.files[0]);
      reader.onload = function() {
      document.querySelector('img').src = this.result;
      };
      this.file = e.target.files;
    },
    uploadImg(e) {
      let imgfile = this.$refs.img;
      let reader = new FileReader();
      reader.readAsDataURL(imgfile.files[0]);
      document.querySelector('.imgName').innerHTML = imgfile.files[0].name;
      reader.onload = function() {
      document.querySelector('img').src = this.result;
      };
      this.file = e.target.files;
    },
    previewImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    reset: function () {
      this.image = "";
      this.preview = "";
      this.$refs.input.value = "";
    }
  }
});

// ud-image-multi-upload：圖片上傳預覽(多張)
Vue.component("ud-image-multi-upload", {
  name: "UdImageMultiUpload",
  template: `
    <div class="ud-image-multi-upload">
      <input type="file" accept="image/*" multiple="multiple" ref="input" @change="previewMultiImage">
      <template v-if="preview_list.length">
        <div class="image-preview">
          <div v-for="item, index in preview_list" :key="index">
            <img :src="item"/>
            <div class="image-info">
              <p>檔案名稱：{{ image_list[index].name }}</p>
              <p>檔案大小：{{ parseInt(image_list[index].size/1024) }}KB</p>
            </div>
          </div>
          <ud-button @click="reset">刪除圖片</ud-button>
        </div>
      </template>
    </div>
  `,
  data: function () {
    return {
      preview_list: [],
      image_list: []
    };
  },
  methods: {
    previewMultiImage: function (event) {
      let input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          let reader = new FileReader();
          reader.onload = e => {
            this.preview_list.push(e.target.result);
          };
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    reset: function () {
      this.image_list = [];
      this.preview_list = [];
      this.$refs.input.value = "";
    }
  }
});

// ud-date-picker：日期選擇器(依賴：element-ui)
Vue.component('ud-date-picker', {
  name: 'UdDatePicker',
  template: `
    <div class="ud-date-picker">
      <el-date-picker
        class="ud-select"
        v-model="modelValue"
        v-bind="$attrs"
        type="date"
        :value-format="valueFormat"
        :align="align"
        :placeholder="placeholder"
        :editable="editable"
        ref="date"
        @change="onChange"
      >
      </el-date-picker>
    </div>
  `,
  inheritAttrs: false,
  props: {
    value: null,
    center: Boolean, // 是否置中
    valueFormat: { // 時間格式化
      default: "yyyy-MM-dd"
    },
    align: { // 對齊
      default: "center"
    },
    placeholder: {
      default: "請選擇日期"
    },
    editable: {
      default: false
    }
  },
  computed: {
    modelValue: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
  },
  mounted() {
    if(this.center) this.centerSelect();
    window.addEventListener("resize", this.centerSelect);
  },
  destroyed() {
    window.removeEventListener("resize", this.centerSelect);
  },
  methods: {
    onChange() {
      if(this.center) this.centerSelect();
      this.$parent.$emit('validate'); // 通知FormItem校驗
      this.$emit('change', this.$refs.date.$el.querySelector('.el-input__inner').value);
    },
    getTextWidth(text, target) {
      let el = document.createElement('span');
      let fontSize = window.getComputedStyle(target).fontSize || '14px';
      el.textContent = text;
      el.style.display = 'inline-block';
      el.style.fontSize = fontSize;
      document.body.appendChild(el);
      let elmWidth = el.offsetWidth;
      el.remove();
      return elmWidth;
    },
    centerSelect() {
      let el = this.$refs.date.$el.querySelector('.el-input__inner');
      let elValue = this.$refs.date.value;
      let text = "";
      elValue ? text = elValue : text = this.placeholder;
      let emptySpace = el.offsetWidth - this.getTextWidth(text, el);
      el.style.textIndent = `${ ( emptySpace / 2 ) }px`;
    }
  }
})

// ud-select-link：連動下拉框
Vue.component('ud-select-link', {
  name: "UdSelectLink",
  template: `
    <div class="ud-select-link" :class="{'is-flex': flex}">
      <ud-select v-model="modelValue[0]" :options="firstArr" :placeholder="placeholder[0]" :combine="combine"></ud-select>
      <slot></slot>
      <ud-select v-model="modelValue[1]" :options="secondArr" :placeholder="placeholder[1]" :combine="combine"></ud-select>
      <slot name="second"></slot>
      <ud-select v-model="modelValue[2]" :options="thirdArr" :placeholder="placeholder[2]" :combine="combine" v-if="third"></ud-select>
      <slot name="third"></slot>
    </div>
  `,
  props: {
    value: null, // value值
    options: null, // 選項 [Array]
    placeholder: { // placeholder值 [Array]
      default: () => {
        return ["請選擇一項", "請選擇一項", "請選擇一項"];
      }
    },
    third: Boolean, // 是否有第三項
    flex: Boolean, // 是否並排
    combine: Boolean, // 是否label直接使用value值
  },
  computed: {
    modelValue: {
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
    firstValue() {
      return this.modelValue[0];
    },
    secondValue() {
      return this.modelValue[1];
    },
    thirdValue() {
      return this.modelValue[2];
    },
    firstArr() {
      let temp = this.options;
      return temp;
    },
    secondArr() {
      let temp = [];
      if(this.modelValue[0]){
        temp = this.options.find(option => option.value === this.modelValue[0]).children;
      }
      return temp;
    },
    thirdArr() {
      let temp = [];
      if(this.modelValue[1]){
        temp = this.secondArr.find(option => option.value === this.modelValue[1]).children;
      }
      return temp;
    },
  },
  watch: {
    firstValue() {
      this.modelValue.splice(1, 1, "");
    },
    secondValue() {
      if(this.third) this.modelValue.splice(2, 1, "");
    },
  },
  mounted() {
    this.$on('validate', () => {
      this.$nextTick(() => {
        this.$parent.$emit('validate'); // 通知FormItem校驗
      })
    })
  }
})

// ud-captcha：圖形驗證碼
Vue.component('ud-captcha', {
  name: "UdCaptcha",
  template: `
    <div class="ud-captcha">
      <div class="canvas-area" ref="canvasArea">
        <canvas id="verify-canvas" width="100" height="38" style="display: none;"></canvas>
        <img ref="codeimg" @click="refresh">
        <input type="hidden" v-model="inputVal">
      </div>
      <div class="refresh" @click="refresh" v-if="!noRefresh">
        <img src="img/refresh.png">
      </div>
    </div>
  `,
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
})

//-----------------------Data-----------------------
// ud-table：表格
Vue.component('ud-table', {
  name: "UdTable",
  template: `

  `,
  props: {
    
  },
})

// ud-pagination：分頁
Vue.component('ud-pagination', {
  name: "UdPagination",
  template: `

  `,
  props: {
    
  },
})

//-----------------------Notice-----------------------
// ud-notify：通知訊息
Vue.component('ud-notify', {
  name: "UdNotify",
  template: `

  `,
  props: {
    
  },
})

// ud-popover：氣泡框
Vue.component('ud-popover', {
  name: "UdPopover",
  template: `

  `,
  props: {
    
  },
})

//-----------------------Tools-----------------------
// ud-countdown-expire：倒數計時(時限)
Vue.component('ud-countdown-expire', {
  name: "UdCountdownExpire",
  template: `
    <div>距離5月13號 15點0分0秒 還有</div>
    <i></i>
    <i></i>
    <i></i>
  `,
  mounted() {
    let aI = document.getElementsByTagName("i");
    setInterval(function() { // 設置倒數計時: 結束時間 - 當前時間
      // 當前時間
      let time = new Date();
      let nowTime = time.getTime(); // 取得當前毫秒數
      // 設置結束時間 : 5月13號 15點0分0秒
      time.setMonth(4); // 取得當前 月份 (從 '0' 開始算)
      time.setDate(13); // 取得當前 日
      time.setHours(15); // 取得當前 時
      time.setMinutes(0); // 取得當前 分
      time.setSeconds(0);
      let endTime = time.getTime();
      // 倒數計時: 差值
      let offsetTime = (endTime - nowTime) / 1000; // ** 以秒為單位
      let sec = parseInt(offsetTime % 60); // 秒
      let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
      let hr = parseInt(offsetTime / 60 / 60); // 時

      aI[0].textContent = hr + "時";
      aI[1].textContent = min + "分";
      aI[2].textContent = sec + "秒";
    }, 1000);
  },
})

//-----------------------Layout----------------------------
// ud-flex：通用排版容器
Vue.component('ud-flex', {
  name: "UdFlex",
  template: `
    <div class="ud-flex">
      <slot></slot>
    </div>
  `,
  props: {

  }
})

//-----------------------Application-----------------------
//ud-carousel：圖片輪播
Vue.component('ud-carousel', {
  name: "udCarousel",
  template: `
    <div class="ud-carousel" ref="carousel"
      @mouseenter.stop="toggleTimer = false"
      @mouseleave.stop="toggleTimer = true"
      @touchstart.stop="touchStart"
      @touchmove.stop="touchMove"
      :style="'min-height:' + minHeight">
      <keep-alive>
        <transition :name="carouselName">
          <div class="item"
            v-for="(item, index) in carousels"
            v-if="show == index"
            :key="index"
          >
            <a :href="item.href"><img :src="item.img"/></a>
          </div>
        </transition>
      </keep-alive>

      <!-- arrows -->
      <div class="arrows-group" v-if="arrows">
        <a class="button-prev" href="#" @click.prevent="toPrev">
          <slot name="arrows-prev">
            <img src="//akveo.github.io/eva-icons/outline/png/128/arrow-ios-back-outline.png"/>
          </slot>
        </a>
        <a class="button-next" href="#" @click.prevent="toNext">
          <slot name="arrows-next">
            <img src="//akveo.github.io/eva-icons/outline/png/128/arrow-ios-forward-outline.png"/>
          </slot>
        </a>
      </div>

      <!-- dots -->
      <div class="dot-group" v-if="dots">
        <a v-for="(l, index) in len" href="#"
          :class="{ 'active': show == index }"
          @click.prevent="show = index"
        ></a>
      </div>

    </div>
  `,
  props: {
    carousels: {
      type: Array
    },
    auto: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 3000
    },
    dots: {
      type: Boolean,
      default: true
    },
    arrows: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      carouselName: 'carousel-next',
      len: 0,
      show: 0,
      xDown: null, // for swiper
      yDown: null, // for swiper
      autoplay: false, // 是否自動輪播
      toggleTimer: true, // pause auto play
      minHeight: 0 // 抓最小高度
    }
  },
  methods: {
    toNext() {
      this.carouselName = 'carousel-next';
      this.show + 1 >= this.len ? this.show = 0 : this.show = this.show + 1;
    },
    toPrev() {
      this.carouselName = 'carousel-prev';
      this.show - 1 < 0 ? this.show = this.len - 1 : this.show = this.show - 1;
    },
    // swiper event(for mobile)
    touchStart(e) {
      this.xDown = e.touches[0].clientX;
      this.yDown = e.touches[0].clientY;
    },
    touchMove(e) {
      const _this = this;
      if(!this.xDown || !this.yDown) { return; }

      let xUp = e.touches[0].clientX;
      let yUp = e.touches[0].clientY;

      let xDiff = this.xDown - xUp;
      let yDiff = this.yDown - yUp;

      if(Math.abs(xDiff) > Math.abs(yDiff)) {
        xDiff > 0 ? _this.toNext() : _this.toPrev();
      }
      this.xDown = null;
      this.yDown = null;
    },
    // 自動輪播
    autoPlay() {
      setInterval(() => {
        if(this.toggleTimer) this.toNext();
      }, this.delay);
    }
  },
  mounted() {
    this.len = this.carousels.length;
    if(this.len <= 1) this.arrows = false;
    if(this.auto) this.autoPlay();
    window.addEventListener('load', () => {
      this.minHeight = this.$refs.carousel.offsetHeight + 'px';
    });
  }
})

// ud-youtube：水管播放
Vue.component('ud-youtube', {
  name: "UdYoutube",
  template: `
    <div class="ud-youtube">
      <div class="video-wrapper">
        <iframe width="560" height="315" :src="videoIdAfter" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  `,
  props: {
    videoId: { default: "p6qjpdi8XuE" }, // 影片ID
    start: { default: 0 }, // 開始時間
    autoplay: Boolean, // 自動播放
    loop: Boolean, // 自動循環
    noControl: Boolean, // 移除控制介面
  },
  computed: {
    videoIdAfter: function(){
      let urlTemp = `https://www.youtube.com/embed/${this.videoId}?`;
      if(this.start) urlTemp = `${urlTemp}&start=${this.start}`;
      if(this.autoplay) urlTemp = `${urlTemp}&autoplay=1`;
      if(this.loop) urlTemp = `${urlTemp}&loop=1&playlist=${this.videoId}`;
      if(this.noControl) urlTemp = `${urlTemp}&controls=0`;
      return urlTemp;
    }
  },
})

// ud-youtube-api：水管播放(控制版)
Vue.component('ud-youtube-api', {
  name: "UdYoutubeApi",
  template: `
    <div class="ud-youtube-api">
      <div class="video-wrapper">
        <div :id="videoId" ref="player"></div>
      </div>
    </div>
  `,
  props: {
    videoId: { default: "KnWMMgEDva0" }, // 影片id
    start: { default: 0 }, // 開始時間
    width: { default: 560 }, // 寬度
    height: { default: 315 }, // 高度
    autoplay: Boolean, // 自動播放
    loop: Boolean, // 自動循環
    noControl: Boolean, // 移除控制介面
    mute: Boolean // 開始時靜音
  },
  data() {
    return {
      player: {}
    }
  },
  computed: {
    control: function(){
      return this.noControl ? 0 : 1;
    }
  },
  mounted() {
    let _this = this;
    let tag = document.createElement('script');
    let player;
    let firstScriptTag = document.getElementsByTagName('script')[0];
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = function(){
      player = new YT.Player(_this.videoId, {
        videoId: _this.videoId, // YouTube 影片ID
        width: _this.width, // 播放器寬度 (px)
        height: _this.height, // 播放器高度 (px)
        playerVars: {
          autoplay: _this.autoplay, // 在讀取時自動播放影片
          controls: _this.control, // 在播放器顯示暫停／播放按鈕
          start: _this.start // 開始時間
          // loop: _this.loop, // 讓影片循環播放
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        }
      });
    }
    function onPlayerReady(e) {
      if(_this.mute) e.target.mute();
    };
    function onPlayerStateChange(e) {
      if (e.data === YT.PlayerState.ENDED) {
        player.playVideo(); 
      }
    };
  },
  methods: {

  },
})

// ud-google-map：估狗地圖
Vue.component('ud-google-map', {
  name: "UdGoogleMap",
  template: `
    <div class="ud-google-map" :style="{'padding-bottom': ratio + '%'}">
      <iframe :src="src" :width="width" :height="height" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </div>
  `,
  props: {
    src: { default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.3065648309268!2d121.51520065825689!3d25.04719989599153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9727e339109%3A0xc34a31ce3a4abecb!2z6Ie65YyX6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1595920460513!5m2!1szh-TW!2stw" }, // 網址
    width: { default: 600 }, // 寬度
    height: { default: 450 }, // 高度
    ratio: { default: 65.25 } // 比例
  },
})

// ud-select2：搜尋下拉框套件
// dependencies:
//   "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
//   "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
//   "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"
// reference:
//   https://select2.org
Vue.component('ud-select2', {
  name: "UdSelect2",
  template: `
    <select2 :options="options" v-model="selected">
      <option disabled value="0">Select one</option>
    </select2>
  `,
  props: {
    value: { default: null }, // value值
    options: { default: null } // 選項
  },
  mounted: function() {
    var vm = this;
    $(this.$el)
      .select2({ data: this.options })
      .val(this.value)
      .trigger("change")
      .on("change", function() {
        vm.$emit("input", this.value);
      });
  },
  watch: {
    value: function(value) {
      $(this.$el)
        .val(value)
        .trigger("change");
    },
    options: function(options) {
      $(this.$el)
        .empty()
        .select2({ data: options });
    }
  },
  destroyed: function() {
    $(this.$el)
      .off()
      .select2("destroy");
  }
})

// ud-scratch：刮刮樂
// dependencies:
//   "plugins/scratchcard/scratchcard.min.js"
// reference:
//   https://github.com/Masth0/ScratchCard
Vue.component('ud-scratch', {
  name: "UdScratch",
  template: `
    <div class="ud-scratch">
      <div class="sc__wrapper">
        <div class="sc__container" :id="id"></div>
      </div>
    </div>
  `,
  mounted() {
    this.initScratch();
  },
  props: {
    id: { default: "js--sud--container" }, // 刮刮樂id 區分複數刮刮樂
    coverSrc: { default: "img/silver.jpg" }, // 封面圖片
    brushSrc: { default: "img/brush.png" }, // 筆刷圖片
    prizeSrc: { default: "img/prize_01.jpg" }, // 獎品圖片
    aspectRatio: { default: 1.65 }, // 長寬比
    percent: { default: 10 }, // 完成所需%數
  },
  methods: {
    initScratch: function(){
      let _this = this;
      const scContainer = document.getElementById(this.id);
      const sc = new ScratchCard(`#${this.id}`, {
        scratchType: SCRATCH_TYPE.BRUSH,
        containerWidth: scContainer.offsetWidth,
        containerHeight: scContainer.offsetWidth/this.aspectRatio,
        brushSrc: this.brushSrc,
        imageForwardSrc: this.coverSrc,
        imageBackgroundSrc: this.prizeSrc,
        percentToFinish: this.percent,
        callback: function () {
          _this.$emit("finish"); // 刮完事件
        }
      })
      sc.init().then(() => {
        sc.canvas.addEventListener('scratch.move', () => {
          _this.$emit("move", Math.floor(sc.getPercent())); // 移動中事件(帶百分比)
        })
      }).catch((error) => {
        alert(error.message);
      });
    }
  },
})

// ud-editor：文字編輯器
Vue.component('ud-editor', {
  name: "UdEditor",
  template: '<h1>文案編輯器</h1>'
})

//-----------------------Web-----------------------
/**
 * randomHexColorCode：取得隨機十六進制顏色碼
 */
function randomHexColorCode(){
  let temp = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + temp.slice(0, 6);
};

/**
 * escapeHTML：轉義HTML(防XSS攻擊)
 * @param  {String} str 代入值
 * escapeHTML('<a href="#">Me & you</a>'); -> '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
 */
function escapeHTML(str){
  return str.replace(/[&<>'"]/g,tag =>({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
    }[tag] || tag)
  );
}

/**
 * convertCamelCase：駝峰式轉換
 * @param  {String} str 代入值
 * convertCamelCase("camelCase"); -> camel-case
 */
function convertCamelCase(str = ''){
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * replaceURLToLink：將字串內URL轉為超連結
 * @param  {String} text 代入值
 */
function replaceURLToLink(text) {
  text = text.replace(URL, (url) => {
    let urlText = url;
    if (!url.match('^https?://')) url = 'http://' + url;
    return '' + urlText + '';
  });
  return text;
};

/**
 * 複製指定元素上的文字至剪貼簿
 * @param {string} target 要複製文字的指定元素id
 * @example copyTextById("title").then(res => udAlert(`已複製\n${ res }`));
 */
const copyTextById = (target) => {
  return new Promise((resolve, reject) => {
    try {
      let textRange = document.createRange();
      textRange.selectNode(document.getElementById(target));
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(textRange);
      document.execCommand("copy");
      resolve(textRange);
    } catch (err) {
      console.log("複製失敗: ", err);
      reject(err);
    }
  })
}

//-----------------------Number-----------------------
/**
 * 四捨五入到指定位數
 * @param {number} val 傳入值
 * @param {number} decimals 指定位數 預設為0
 * @example roundNumber(1.235, 2) -> 1.24
 */
const roundNumber = (val, decimals = 0) => {
  if(val == null) return val;
  return Number(`${Math.round(`${val}e${decimals}`)}e-${decimals}`);
}

//-----------------------Image-----------------------
/**
 * 下載Canvas圖片
 * @param {string} selector canvas元素選擇器
 * @param {string} name 圖片名稱 預設為'下載圖片'
 * @example canvasImageDownload('canvas', '自訂圖片名稱')
 */
const canvasImageDownload = (selector, name = '下載圖片') => {
  let canvas = document.querySelector(selector);
  let url = canvas.toDataURL('image/png');
  let a = document.createElement('a');
  let event = new MouseEvent('click');
  a.download = name; 
  a.href = url;
  a.dispatchEvent(event);
}

//-----------------------Array-----------------------
/**
 * 二維陣列扁平化
 * @param {array} arr 傳入值
 * @param {number} depth 指定深度
 * @example flatArray([1, [2], 3, 4]); -> [1, 2, 3, 4]
 * @example flatArray([1, [2, [3, [4, 5], 6], 7], 8], 2); -> [1, 2, 3, [4, 5], 6, 7, 8]
 */
const flatArray = (arr, depth = 1) => {
  if(arr == null) return arr;
  return arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatArray(v, depth - 1) : v), []);
}

/**
 * 兩陣列的交集
 * @param {array} arrA 陣列A
 * @param {array} arrB 陣列B
 * @example intersectionArray([1, 2, 3], [4, 3, 2]); -> [2, 3]
 */
const intersectionArray = (arrA, arrB) => {
  if(arrA == null || arrB == null) return null;
  const s = new Set(arrB);
  return arrA.filter(x => s.has(x));
};

/**
 * 洗牌陣列
 * @param {array} arr 傳入值
 * @example shuffleArray([1, 2, 3]); -> [2, 3, 1];
 */
const shuffleArray = arr => {
  if(arr == null) return arr;
  let arrCopy = [...arr];
  let m = arrCopy.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arrCopy[m], arrCopy[i]] = [arrCopy[i], arrCopy[m]];
  }
  return arrCopy;
};

//-----------------------Object-----------------------
/**
 * 過濾物件鍵值
 * @param {object} val 傳入值
 * @param {array} arr 過濾值的陣列
 * @example filterObj(obj, ["keyA", "keyB"]);
 */
const filterObj = (val, arr) => {
  let tempObj = JSON.parse(JSON.stringify(val));
  for(let i in tempObj){
    if(arr.indexOf(i) === -1) delete tempObj[i];
  }
  return tempObj;
}

/**
 * 刪除物件鍵值
 * @param {object} obj 傳入值
 * @param {array} arr 刪除值的陣列
 * @example deleteObj(obj, ["keyA", "keyB"]);
 */
const deleteObj = (obj, arr) => {
  let tempObj = JSON.parse(JSON.stringify(obj));
  for(let i in tempObj){
    if(arr.indexOf(i) !== -1) delete tempObj[i];
  }
  return tempObj;
}

/**
 * 深拷貝(簡易版)
 * @param {object} obj 傳入值
 */
const deepCloneSimple = obj => {
  if(obj == null) return obj;
  return JSON.parse(JSON.stringify(obj));
}

//-----------------------Time-----------------------
/**
 * 判斷是否為閏年
 * @param {number} year 年份
 */
const isLeapYear = year => {
  if(year == null) return year;
  return new Date(year, 1, 29).getDate() === 29;
}

//-----------------------Browser-----------------------
/**
 * loadStyle：動態加載css文件
 * @param  {String} url 文件路徑
 */
function loadStyle(url) {
  try {
    document.createStyleSheet(url);
  } catch (e) {
    let cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = url;
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(cssLink);
  }
}

/**
 * insertPlugin：動態載入插件
 * @param  {String} src 路徑
 */
function insertPlugin(src){
  let script = document.createElement('script');
  script.setAttribute('src', src);
  document.head.appendChild(script);
}

//-----------------------Web-----------------------
/**
 * httpsRedirect：HTTP跳轉HTTPS
 */
function httpsRedirect(){
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

/**
 * getUrlState：檢驗URL連接是否有效
 * @param  {String} URL 網址
 */
function getUrlState(URL) {
  var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET", URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {
  } finally {
    var result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

/**
 * cdnBackup：CDN備援
 */
function cdnBackup(){
  if(!window.Vue){
    document.write(`
      <link href="https://pro.fontawesome.com/releases/v5.13.1/css/fontawesome.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/animate.css@3.7.2/animate.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/theme-chalk/index.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"><\/script>
      <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"><\/script>
      <script src="https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js"><\/script>
      <script src="https://cdn.jsdelivr.net/npm/@braid/vue-formulate@2.4.3/dist/formulate.min.js"><\/script>
      <script src="https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/index.js"><\/script>
      <script src="js/ud-modules.js"><\/script>
    `);
    console.log("CDN Error!!");
  }
}

/**
 * 取得Cookie的值
 * @param {string} key 傳入值
 */
const getCookie = key => {
  let arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

/**
 * 解析網址
 * @param {string} url 網址
 */
const parseUrl = (url = location.href) => {
  if(url == null) return url;
  let parseUrl = new URL(url);
  return parseUrl;
}

/**
 * 網址跳轉
 * @param {string} url 欲跳轉的網址
 */
const toUrl = url => {
  if(url == null) return url;
  window.location.href = url;
}

/**
 * 跳頁重整
 */
const jumpReload = () => {
  window.onpageshow = event => {
    if(event.persisted) window.location.reload();
  };
}

//-----------------------Animation-----------------------
/** 
 * animate：RAF通用動畫函式
 * @param  {String} timing 指定時間
 * @param  {Object} draw 繪製
 * @param  {Object} duration 持續時間
 * animate({
 *   duration: 1000,
 *   timing(timeFraction) {
 *     return timeFraction;
 *   },
 *   draw(progress) {
 *     elem.style.width = progress * 100 + '%';
 *   }
 * });
 * progress = 0 表示開始動畫狀態，progress = 1 表示結束狀態。
 */
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction 從 0 增加到 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // 計算當前動畫狀態
    let progress = timing(timeFraction);

    draw(progress); // 繪製

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

//-----------------------開發區-----------------------
//可編輯div
Vue.component("ud-contenteditable", {
  name: "UdContenteditable",
  template: `
    <div contenteditable="contenteditable" @input="updateInput" class="ud-contenteditable">
      {{ content }}
    </div>
  `,
  prop: ["value"],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    updateInput() {
      this.$emit("input", this.content);
    }
  }
});



Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
})


// Vue.component('va-input', {
//   name: "VaInput",
//   template: `
//     <div class="va-input">
//       <input :value="value" @input="onInput" v-bind="$attrs">
//     </div>
//   `,
//   inheritAttrs: false,
//   props: {
//     value: {
//       type: String,
//       default: ''
//     }
//   },
//   methods: {
//     onInput(e) {
//       this.$emit('input', e.target.value);
//       this.$parent.$emit('validate', false); // 通知FormItem校驗
//     }
//   }
// })

// SelectLinkUniq 連動獨立下拉框
Vue.component('ud-select-link-uniq', {
  name: "UdSelectLinkUniq",
  template: `
    <div class="ud-select-link">
      <ud-select v-model="modelValue[num - 1]" :options="optionsUniq" :placeholder="placeholder" :combine="combine"></ud-select>
    </div>
  `,
  props: {
    num: null,
    value: null, // value值
    options: null, // 選項 [Array]
    placeholder: { default: "請選擇一項" }, // placeholder值 [Array]
    combine: Boolean, // 是否label直接使用value值
  },
  computed: {
    modelValue: { // ["", "", ""]
      get(){ return this.value },
      set(val){ this.$emit('input', val) }
    },
    uniqValue() {
      return this.modelValue[this.num - 1];
    },
    optionsUniq() {
      let temp = [];
      if(this.num - 1 === 0) {
        temp = this.options;
      }else if(this.num - 1 === 1){
        temp = this.options.find(option => option.value === this.modelValue[0]).children;
      }else {
        temp = this.options.find(option => option.value === this.modelValue[0]).children;
      }
      return temp;
    },
  },
  watch: {
    uniqValue() {
      this.modelValue.splice(1, 1, "");
    },
    secondValue() {
      if(this.third) this.modelValue.splice(2, 1, "");
    },
  },
  mounted() {
    this.$on('validate', () => {
      this.$nextTick(() => {
        this.$parent.$emit('validate'); // 通知FormItem校驗
      })
    })
  },
})

// 初始化執行
jumpReload();