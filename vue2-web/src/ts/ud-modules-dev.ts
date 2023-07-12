declare var $: (selector: string) => any;

/*
==================== Vue組件庫(Extra)目錄 ====================
Form
  Upload 上傳 -----> ud-upload
  ImageUpload 圖片上傳預覽 -----> ud-image-upload
  ImageMultiUpload 圖片上傳預覽(多張) -----> ud-image-multi-upload

Data
  Table 表格 -----> ud-table
  Pagination 分頁 -----> ud-pagination

Notice
  Notify 通知訊息 -----> ud-notify
  Popover 氣泡框 -----> ud-popover

Tools
  CountdownExpire 倒數計時(時限) -----> ud-countdown-expire

Layout
  Flex 通用排版容器 -----> ud-flex

Application
  Carousel 圖片輪播 -----> ud-carousel
  Youtube 水管播放 -----> ud-youtube
  YoutubeApi 水管播放(控制版) -----> ud-youtube-api
  GoogleMap 估狗地圖 -----> ud-google-map
  Select2 搜尋下拉框 -----> ud-select2
  Scratch 刮刮樂 -----> ud-scratch
  Editor 文字編輯器 -----> ud-editor

// ==================== 工具函數目錄 ====================
String
  取得隨機十六進制顏色 -----> randomHexColorCode
  轉義HTML(防XSS攻擊) -----> escapeHTML
  駝峰式轉換 -----> convertCamelCase
  將字串內URL轉為超連結 -----> replaceURLToLink

Browser
  動態加載css文件 -----> loadStyle
  動態載入插件 -----> insertPlugin

Web
  HTTP跳轉HTTPS -----> httpsRedirect
  檢驗URL連接是否有效 -----> getUrlState
  CDN備援 -----> cdnBackup

Animation
  RAF通用動畫函式 -----> animate

*/

//-----------------------Form-----------------------
// Upload 上傳
Vue.component('ud-upload', {
  name: "UdUpload",
  template: `

  `,
  props: {
    
  },
})

// ImageUpload 圖片上傳預覽
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

// ImageMultiUpload 圖片上傳預覽(多張)
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

//-----------------------Data-----------------------
// Table 表格
Vue.component('ud-table', {
  name: "UdTable",
  template: `

  `,
  props: {
    
  },
})

// Pagination 分頁
Vue.component('ud-pagination', {
  name: "UdPagination",
  template: `

  `,
  props: {
    
  },
})

//-----------------------Notice-----------------------
// Notify 通知訊息
Vue.component('ud-notify', {
  name: "UdNotify",
  template: `

  `,
  props: {
    
  },
})

// Popover 氣泡框
Vue.component('ud-popover', {
  name: "UdPopover",
  template: `

  `,
  props: {
    
  },
})

//-----------------------Tools-----------------------
// CountdownExpire 倒數計時(時限)
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
// Flex 通用排版容器
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
//Carousel 圖片輪播
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

// Youtube 水管播放
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

// YoutubeApi 水管播放(控制版)
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

// GoogleMap 估狗地圖
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

// Select2 搜尋下拉框套件
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

// Scratch 刮刮樂
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

// Editor 文字編輯器
Vue.component('ud-editor', {
  name: "UdEditor",
  template: '<h1>文案編輯器</h1>'
})

//-----------------------Web-----------------------
/**
 * 取得隨機十六進制顏色碼
 */
function randomHexColorCode(){
  let temp = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + temp.slice(0, 6);
};

/**
 * 轉義HTML(防XSS攻擊)
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
 * 駝峰式轉換
 * @param  {String} str 代入值
 * convertCamelCase("camelCase"); -> camel-case
 */
function convertCamelCase(str = ''){
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 將字串內URL轉為超連結
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

//-----------------------Browser-----------------------
/**
 * 動態加載css文件
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
 * 動態載入插件
 * @param  {String} src 路徑
 */
function insertPlugin(src){
  let script = document.createElement('script');
  script.setAttribute('src', src);
  document.head.appendChild(script);
}

//-----------------------Web-----------------------
/**
 * HTTP跳轉HTTPS
 */
function httpsRedirect(){
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

/**
 * 檢驗URL連接是否有效
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
 * CDN備援
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

//-----------------------Animation-----------------------
/** 
 * RAF通用動畫函式
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