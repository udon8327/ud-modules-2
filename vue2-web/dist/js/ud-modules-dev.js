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
    template: "\n    <div class=\"ud-select-multiple\">\n      <el-select\n        v-model=\"modelValue\"\n        multiple\n        collapse-tags\n        :placeholder=\"placeholder\"\n        ref=\"select\"\n      >\n        <el-option\n          v-for=\"item in options\"\n          :key=\"item.value\"\n          :label=\"item.label\"\n          :value=\"item.value\">\n        </el-option>\n      </el-select>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: null,
        options: null,
        placeholder: { default: "請選擇一項" },
    },
    computed: {
        modelValue: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        },
    },
    methods: {
        onChange: function () {
            this.$parent.$emit('validate'); // 通知FormItem校驗
            this.$emit('change', this.$refs.select.value);
        },
    }
});
// ud-input-phone：電話號碼連動輸入框
Vue.component('ud-input-phone', {
    name: 'UdInputPhone',
    template: "\n    <div class=\"ud-input-phone\">\n      <ud-input\n        v-model=\"modelValue[0]\"\n        @input=\"onInput(1)\"\n        ref=\"input1\"\n        :placeholder=\"placeholder[0]\"\n        type=\"tel\"\n        maxlength=\"4\"\n      >\n      </ud-input>\n      <span class=\"separator\">{{ separator }}</span>\n      <ud-input\n        v-model=\"modelValue[1]\"\n        @input=\"onInput(2)\"\n        ref=\"input2\"\n        :placeholder=\"placeholder[1]\"\n        type=\"tel\"\n        maxlength=\"3\"\n      >\n      </ud-input>\n      <span class=\"separator\">{{ separator }}</span>\n      <ud-input\n        v-model=\"modelValue[2]\"\n        @input=\"onInput(3)\"\n        ref=\"input3\"\n        :placeholder=\"placeholder[2]\"\n        type=\"tel\"\n        maxlength=\"3\"\n      >\n      </ud-input>\n    </div>\n  ",
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
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        },
    },
    mounted: function () {
    },
    methods: {
        onInput: function () {
            if (this.autoFocus) {
                if (this.modelValue[0].length === 4) {
                    this.$refs.input2.focus();
                }
                if (this.modelValue[1].length === 3) {
                    this.$refs.input3.focus();
                }
            }
            this.$parent.$emit('validate'); // 通知FormItem校驗
        },
        focus: function () {
            this.$refs.input.focus();
        }
    }
});
// ud-upload：上傳
Vue.component('ud-upload', {
    name: "UdUpload",
    template: "\n\n  ",
    props: {},
});
// ud-image-upload：圖片上傳預覽
Vue.component("ud-image-upload", {
    name: "UdImageUpload",
    template: "\n    <div class=\"ud-image-upload\">\n      <div class=\"preview-area\">\n        <img :src=\"preview\" ref=\"preview\">\n      </div>\n      <div class=\"info-area\">\n        <div class=\"info-left\">\n          <p v-if=\"!image\">\u672A\u9078\u64C7\u6A94\u6848</p>\n          <p v-if=\"image\" ref=\"fileName\">\u6A94\u6848\u540D\u7A31\uFF1A{{ image.name }}</p>\n          <p v-if=\"image\" ref=\"fileSize\">\u6A94\u6848\u5927\u5C0F\uFF1A{{ parseInt(image.size/1024) }}KB</p>\n        </div>\n        <div class=\"info-right\">\n          <input type=\"file\" accept=\"image/*\" ref=\"file\" @change=\"previewImage\">\n          <ud-button @click=\"clickInput\">\u4E0A\u50B3\u5716\u7247</ud-button>\n        </div>\n      </div>\n    </div>\n  ",
    data: function () {
        return {
            preview: "",
            image: ""
        };
    },
    mounted: function () {
        var dropbox = this.$refs.preview;
        dropbox.addEventListener('dragenter', this.onDrag, false);
        dropbox.addEventListener('dragover', this.onDrag, false);
        dropbox.addEventListener('drop', this.onDrop, false);
    },
    methods: {
        clickInput: function () {
            this.$refs.file.click();
        },
        onDrag: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        onDrop: function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('drop');
            var dt = e.dataTransfer;
            this.pre = this.$refs.file.files[0].name;
            var reader = new FileReader();
            reader.readAsDataURL(dt.files[0]);
            reader.onload = function () {
                document.querySelector('img').src = this.result;
            };
            this.file = e.target.files;
        },
        uploadImg: function (e) {
            var imgfile = this.$refs.img;
            var reader = new FileReader();
            reader.readAsDataURL(imgfile.files[0]);
            document.querySelector('.imgName').innerHTML = imgfile.files[0].name;
            reader.onload = function () {
                document.querySelector('img').src = this.result;
            };
            this.file = e.target.files;
        },
        previewImage: function (event) {
            var _this = this;
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    _this.preview = e.target.result;
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
    template: "\n    <div class=\"ud-image-multi-upload\">\n      <input type=\"file\" accept=\"image/*\" multiple=\"multiple\" ref=\"input\" @change=\"previewMultiImage\">\n      <template v-if=\"preview_list.length\">\n        <div class=\"image-preview\">\n          <div v-for=\"item, index in preview_list\" :key=\"index\">\n            <img :src=\"item\"/>\n            <div class=\"image-info\">\n              <p>\u6A94\u6848\u540D\u7A31\uFF1A{{ image_list[index].name }}</p>\n              <p>\u6A94\u6848\u5927\u5C0F\uFF1A{{ parseInt(image_list[index].size/1024) }}KB</p>\n            </div>\n          </div>\n          <ud-button @click=\"reset\">\u522A\u9664\u5716\u7247</ud-button>\n        </div>\n      </template>\n    </div>\n  ",
    data: function () {
        return {
            preview_list: [],
            image_list: []
        };
    },
    methods: {
        previewMultiImage: function (event) {
            var _this = this;
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            if (input.files) {
                while (count--) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.preview_list.push(e.target.result);
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
    template: "\n    <div class=\"ud-date-picker\">\n      <el-date-picker\n        class=\"ud-select\"\n        v-model=\"modelValue\"\n        v-bind=\"$attrs\"\n        type=\"date\"\n        :value-format=\"valueFormat\"\n        :align=\"align\"\n        :placeholder=\"placeholder\"\n        :editable=\"editable\"\n        ref=\"date\"\n        @change=\"onChange\"\n      >\n      </el-date-picker>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: null,
        center: Boolean,
        valueFormat: {
            default: "yyyy-MM-dd"
        },
        align: {
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
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        },
    },
    mounted: function () {
        if (this.center)
            this.centerSelect();
        window.addEventListener("resize", this.centerSelect);
    },
    destroyed: function () {
        window.removeEventListener("resize", this.centerSelect);
    },
    methods: {
        onChange: function () {
            if (this.center)
                this.centerSelect();
            this.$parent.$emit('validate'); // 通知FormItem校驗
            this.$emit('change', this.$refs.date.$el.querySelector('.el-input__inner').value);
        },
        getTextWidth: function (text, target) {
            var el = document.createElement('span');
            var fontSize = window.getComputedStyle(target).fontSize || '14px';
            el.textContent = text;
            el.style.display = 'inline-block';
            el.style.fontSize = fontSize;
            document.body.appendChild(el);
            var elmWidth = el.offsetWidth;
            el.remove();
            return elmWidth;
        },
        centerSelect: function () {
            var el = this.$refs.date.$el.querySelector('.el-input__inner');
            var elValue = this.$refs.date.value;
            var text = "";
            elValue ? text = elValue : text = this.placeholder;
            var emptySpace = el.offsetWidth - this.getTextWidth(text, el);
            el.style.textIndent = (emptySpace / 2) + "px";
        }
    }
});
// ud-select-link：連動下拉框
Vue.component('ud-select-link', {
    name: "UdSelectLink",
    template: "\n    <div class=\"ud-select-link\" :class=\"{'is-flex': flex}\">\n      <ud-select v-model=\"modelValue[0]\" :options=\"firstArr\" :placeholder=\"placeholder[0]\" :combine=\"combine\"></ud-select>\n      <slot></slot>\n      <ud-select v-model=\"modelValue[1]\" :options=\"secondArr\" :placeholder=\"placeholder[1]\" :combine=\"combine\"></ud-select>\n      <slot name=\"second\"></slot>\n      <ud-select v-model=\"modelValue[2]\" :options=\"thirdArr\" :placeholder=\"placeholder[2]\" :combine=\"combine\" v-if=\"third\"></ud-select>\n      <slot name=\"third\"></slot>\n    </div>\n  ",
    props: {
        value: null,
        options: null,
        placeholder: {
            default: function () {
                return ["請選擇一項", "請選擇一項", "請選擇一項"];
            }
        },
        third: Boolean,
        flex: Boolean,
        combine: Boolean,
    },
    computed: {
        modelValue: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        },
        firstValue: function () {
            return this.modelValue[0];
        },
        secondValue: function () {
            return this.modelValue[1];
        },
        thirdValue: function () {
            return this.modelValue[2];
        },
        firstArr: function () {
            var temp = this.options;
            return temp;
        },
        secondArr: function () {
            var _this = this;
            var temp = [];
            if (this.modelValue[0]) {
                temp = this.options.find(function (option) { return option.value === _this.modelValue[0]; }).children;
            }
            return temp;
        },
        thirdArr: function () {
            var _this = this;
            var temp = [];
            if (this.modelValue[1]) {
                temp = this.secondArr.find(function (option) { return option.value === _this.modelValue[1]; }).children;
            }
            return temp;
        },
    },
    watch: {
        firstValue: function () {
            this.modelValue.splice(1, 1, "");
        },
        secondValue: function () {
            if (this.third)
                this.modelValue.splice(2, 1, "");
        },
    },
    mounted: function () {
        var _this = this;
        this.$on('validate', function () {
            _this.$nextTick(function () {
                _this.$parent.$emit('validate'); // 通知FormItem校驗
            });
        });
    }
});
// ud-captcha：圖形驗證碼
Vue.component('ud-captcha', {
    name: "UdCaptcha",
    template: "\n    <div class=\"ud-captcha\">\n      <div class=\"canvas-area\" ref=\"canvasArea\">\n        <canvas id=\"verify-canvas\" width=\"100\" height=\"38\" style=\"display: none;\"></canvas>\n        <img ref=\"codeimg\" @click=\"refresh\">\n        <input type=\"hidden\" v-model=\"inputVal\">\n      </div>\n      <div class=\"refresh\" @click=\"refresh\" v-if=\"!noRefresh\">\n        <img src=\"img/refresh.png\">\n      </div>\n    </div>\n  ",
    computed: {
        inputVal: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        }
    },
    props: {
        value: String,
        color: { default: "#989799" },
        bgColor: { default: "#000" },
        randomColor: { default: "#777" },
        font: { default: "20px Arial" },
        noLine: Boolean,
        noDots: Boolean,
        noRefresh: Boolean,
    },
    mounted: function () {
        this.drawCode();
    },
    methods: {
        drawCode: function () {
            var nums = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz".split("");
            var canvas = document.getElementById('verify-canvas'); // 取得HTML端畫布
            var context = canvas.getContext("2d"); // 取得畫布2D上下文
            context.fillStyle = this.bgColor; // 畫布填充色
            context.fillRect(0, 0, canvas.width, canvas.height); // 清空畫布
            context.fillStyle = this.color; // 設置字體顏色
            context.font = this.font; // 設置字體
            var rand = new Array();
            var x = new Array();
            var y = new Array();
            for (var i = 0; i < 4; i++) {
                rand[i] = nums[Math.floor(Math.random() * nums.length)];
                x[i] = i * 16 + 16;
                y[i] = Math.random() * 20 + 15;
                context.fillText(rand[i], x[i], y[i]);
            }
            var code = rand.join('');
            this.inputVal = code;
            if (!this.noLine) {
                for (var i = 0; i < 3; i++) {
                    this.drawline(canvas, context);
                }
            }
            if (!this.noDots) {
                for (var i = 0; i < 30; i++) {
                    this.drawDot(canvas, context);
                }
            }
            this.convertCanvasToImage(canvas);
        },
        drawline: function (canvas, context) {
            context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); // 隨機線的起點x座標是畫布x座標0位置 y座標是畫布高度的隨機數
            context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); // 隨機線的終點x座標是畫布寬度 y座標是畫布高度的隨機數
            context.lineWidth = 0.5; // 隨機線寬
            context.strokeStyle = this.randomColor; // 隨機線描邊屬性
            context.stroke(); // 描邊 即起點描到終點
        },
        drawDot: function (canvas, context) {
            var px = Math.floor(Math.random() * canvas.width);
            var py = Math.floor(Math.random() * canvas.height);
            context.moveTo(px, py);
            context.lineTo(px + 1, py + 1);
            context.lineWidth = 0.2;
            context.strokeStyle = this.randomColor;
            context.stroke();
        },
        convertCanvasToImage: function (canvas) {
            var image = this.$refs.codeimg;
            image.src = canvas.toDataURL("image/png");
            return image;
        },
        refresh: function () {
            document.getElementById('verify-canvas').remove();
            this.$refs.canvasArea.insertAdjacentHTML('afterbegin', '<canvas width="100" height="38" id="verify-canvas" style="display: none;"></canvas>');
            this.drawCode();
        }
    }
});
//-----------------------Data-----------------------
// ud-table：表格
Vue.component('ud-table', {
    name: "UdTable",
    template: "\n\n  ",
    props: {},
});
// ud-pagination：分頁
Vue.component('ud-pagination', {
    name: "UdPagination",
    template: "\n\n  ",
    props: {},
});
//-----------------------Notice-----------------------
// ud-notify：通知訊息
Vue.component('ud-notify', {
    name: "UdNotify",
    template: "\n\n  ",
    props: {},
});
// ud-popover：氣泡框
Vue.component('ud-popover', {
    name: "UdPopover",
    template: "\n\n  ",
    props: {},
});
//-----------------------Tools-----------------------
// ud-countdown-expire：倒數計時(時限)
Vue.component('ud-countdown-expire', {
    name: "UdCountdownExpire",
    template: "\n    <div>\u8DDD\u96E25\u670813\u865F 15\u9EDE0\u52060\u79D2 \u9084\u6709</div>\n    <i></i>\n    <i></i>\n    <i></i>\n  ",
    mounted: function () {
        var aI = document.getElementsByTagName("i");
        setInterval(function () {
            // 當前時間
            var time = new Date();
            var nowTime = time.getTime(); // 取得當前毫秒數
            // 設置結束時間 : 5月13號 15點0分0秒
            time.setMonth(4); // 取得當前 月份 (從 '0' 開始算)
            time.setDate(13); // 取得當前 日
            time.setHours(15); // 取得當前 時
            time.setMinutes(0); // 取得當前 分
            time.setSeconds(0);
            var endTime = time.getTime();
            // 倒數計時: 差值
            var offsetTime = (endTime - nowTime) / 1000; // ** 以秒為單位
            var sec = parseInt(offsetTime % 60); // 秒
            var min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
            var hr = parseInt(offsetTime / 60 / 60); // 時
            aI[0].textContent = hr + "時";
            aI[1].textContent = min + "分";
            aI[2].textContent = sec + "秒";
        }, 1000);
    },
});
//-----------------------Layout----------------------------
// ud-flex：通用排版容器
Vue.component('ud-flex', {
    name: "UdFlex",
    template: "\n    <div class=\"ud-flex\">\n      <slot></slot>\n    </div>\n  ",
    props: {}
});
//-----------------------Application-----------------------
//ud-carousel：圖片輪播
Vue.component('ud-carousel', {
    name: "udCarousel",
    template: "\n    <div class=\"ud-carousel\" ref=\"carousel\"\n      @mouseenter.stop=\"toggleTimer = false\"\n      @mouseleave.stop=\"toggleTimer = true\"\n      @touchstart.stop=\"touchStart\"\n      @touchmove.stop=\"touchMove\"\n      :style=\"'min-height:' + minHeight\">\n      <keep-alive>\n        <transition :name=\"carouselName\">\n          <div class=\"item\"\n            v-for=\"(item, index) in carousels\"\n            v-if=\"show == index\"\n            :key=\"index\"\n          >\n            <a :href=\"item.href\"><img :src=\"item.img\"/></a>\n          </div>\n        </transition>\n      </keep-alive>\n\n      <!-- arrows -->\n      <div class=\"arrows-group\" v-if=\"arrows\">\n        <a class=\"button-prev\" href=\"#\" @click.prevent=\"toPrev\">\n          <slot name=\"arrows-prev\">\n            <img src=\"//akveo.github.io/eva-icons/outline/png/128/arrow-ios-back-outline.png\"/>\n          </slot>\n        </a>\n        <a class=\"button-next\" href=\"#\" @click.prevent=\"toNext\">\n          <slot name=\"arrows-next\">\n            <img src=\"//akveo.github.io/eva-icons/outline/png/128/arrow-ios-forward-outline.png\"/>\n          </slot>\n        </a>\n      </div>\n\n      <!-- dots -->\n      <div class=\"dot-group\" v-if=\"dots\">\n        <a v-for=\"(l, index) in len\" href=\"#\"\n          :class=\"{ 'active': show == index }\"\n          @click.prevent=\"show = index\"\n        ></a>\n      </div>\n\n    </div>\n  ",
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
    data: function () {
        return {
            carouselName: 'carousel-next',
            len: 0,
            show: 0,
            xDown: null,
            yDown: null,
            autoplay: false,
            toggleTimer: true,
            minHeight: 0 // 抓最小高度
        };
    },
    methods: {
        toNext: function () {
            this.carouselName = 'carousel-next';
            this.show + 1 >= this.len ? this.show = 0 : this.show = this.show + 1;
        },
        toPrev: function () {
            this.carouselName = 'carousel-prev';
            this.show - 1 < 0 ? this.show = this.len - 1 : this.show = this.show - 1;
        },
        // swiper event(for mobile)
        touchStart: function (e) {
            this.xDown = e.touches[0].clientX;
            this.yDown = e.touches[0].clientY;
        },
        touchMove: function (e) {
            var _this = this;
            if (!this.xDown || !this.yDown) {
                return;
            }
            var xUp = e.touches[0].clientX;
            var yUp = e.touches[0].clientY;
            var xDiff = this.xDown - xUp;
            var yDiff = this.yDown - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                xDiff > 0 ? _this.toNext() : _this.toPrev();
            }
            this.xDown = null;
            this.yDown = null;
        },
        // 自動輪播
        autoPlay: function () {
            var _this = this;
            setInterval(function () {
                if (_this.toggleTimer)
                    _this.toNext();
            }, this.delay);
        }
    },
    mounted: function () {
        var _this = this;
        this.len = this.carousels.length;
        if (this.len <= 1)
            this.arrows = false;
        if (this.auto)
            this.autoPlay();
        window.addEventListener('load', function () {
            _this.minHeight = _this.$refs.carousel.offsetHeight + 'px';
        });
    }
});
// ud-youtube：水管播放
Vue.component('ud-youtube', {
    name: "UdYoutube",
    template: "\n    <div class=\"ud-youtube\">\n      <div class=\"video-wrapper\">\n        <iframe width=\"560\" height=\"315\" :src=\"videoIdAfter\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n      </div>\n    </div>\n  ",
    props: {
        videoId: { default: "p6qjpdi8XuE" },
        start: { default: 0 },
        autoplay: Boolean,
        loop: Boolean,
        noControl: Boolean,
    },
    computed: {
        videoIdAfter: function () {
            var urlTemp = "https://www.youtube.com/embed/" + this.videoId + "?";
            if (this.start)
                urlTemp = urlTemp + "&start=" + this.start;
            if (this.autoplay)
                urlTemp = urlTemp + "&autoplay=1";
            if (this.loop)
                urlTemp = urlTemp + "&loop=1&playlist=" + this.videoId;
            if (this.noControl)
                urlTemp = urlTemp + "&controls=0";
            return urlTemp;
        }
    },
});
// ud-youtube-api：水管播放(控制版)
Vue.component('ud-youtube-api', {
    name: "UdYoutubeApi",
    template: "\n    <div class=\"ud-youtube-api\">\n      <div class=\"video-wrapper\">\n        <div :id=\"videoId\" ref=\"player\"></div>\n      </div>\n    </div>\n  ",
    props: {
        videoId: { default: "KnWMMgEDva0" },
        start: { default: 0 },
        width: { default: 560 },
        height: { default: 315 },
        autoplay: Boolean,
        loop: Boolean,
        noControl: Boolean,
        mute: Boolean // 開始時靜音
    },
    data: function () {
        return {
            player: {}
        };
    },
    computed: {
        control: function () {
            return this.noControl ? 0 : 1;
        }
    },
    mounted: function () {
        var _this = this;
        var tag = document.createElement('script');
        var player;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = function () {
            player = new YT.Player(_this.videoId, {
                videoId: _this.videoId,
                width: _this.width,
                height: _this.height,
                playerVars: {
                    autoplay: _this.autoplay,
                    controls: _this.control,
                    start: _this.start // 開始時間
                    // loop: _this.loop, // 讓影片循環播放
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                }
            });
        };
        function onPlayerReady(e) {
            if (_this.mute)
                e.target.mute();
        }
        ;
        function onPlayerStateChange(e) {
            if (e.data === YT.PlayerState.ENDED) {
                player.playVideo();
            }
        }
        ;
    },
    methods: {},
});
// ud-google-map：估狗地圖
Vue.component('ud-google-map', {
    name: "UdGoogleMap",
    template: "\n    <div class=\"ud-google-map\" :style=\"{'padding-bottom': ratio + '%'}\">\n      <iframe :src=\"src\" :width=\"width\" :height=\"height\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>\n    </div>\n  ",
    props: {
        src: { default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.3065648309268!2d121.51520065825689!3d25.04719989599153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9727e339109%3A0xc34a31ce3a4abecb!2z6Ie65YyX6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1595920460513!5m2!1szh-TW!2stw" },
        width: { default: 600 },
        height: { default: 450 },
        ratio: { default: 65.25 } // 比例
    },
});
// ud-select2：搜尋下拉框套件
// dependencies:
//   "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
//   "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
//   "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"
// reference:
//   https://select2.org
Vue.component('ud-select2', {
    name: "UdSelect2",
    template: "\n    <select2 :options=\"options\" v-model=\"selected\">\n      <option disabled value=\"0\">Select one</option>\n    </select2>\n  ",
    props: {
        value: { default: null },
        options: { default: null } // 選項
    },
    mounted: function () {
        var vm = this;
        $(this.$el)
            .select2({ data: this.options })
            .val(this.value)
            .trigger("change")
            .on("change", function () {
            vm.$emit("input", this.value);
        });
    },
    watch: {
        value: function (value) {
            $(this.$el)
                .val(value)
                .trigger("change");
        },
        options: function (options) {
            $(this.$el)
                .empty()
                .select2({ data: options });
        }
    },
    destroyed: function () {
        $(this.$el)
            .off()
            .select2("destroy");
    }
});
// ud-scratch：刮刮樂
// dependencies:
//   "plugins/scratchcard/scratchcard.min.js"
// reference:
//   https://github.com/Masth0/ScratchCard
Vue.component('ud-scratch', {
    name: "UdScratch",
    template: "\n    <div class=\"ud-scratch\">\n      <div class=\"sc__wrapper\">\n        <div class=\"sc__container\" :id=\"id\"></div>\n      </div>\n    </div>\n  ",
    mounted: function () {
        this.initScratch();
    },
    props: {
        id: { default: "js--sud--container" },
        coverSrc: { default: "img/silver.jpg" },
        brushSrc: { default: "img/brush.png" },
        prizeSrc: { default: "img/prize_01.jpg" },
        aspectRatio: { default: 1.65 },
        percent: { default: 10 },
    },
    methods: {
        initScratch: function () {
            var _this = this;
            var scContainer = document.getElementById(this.id);
            var sc = new ScratchCard("#" + this.id, {
                scratchType: SCRATCH_TYPE.BRUSH,
                containerWidth: scContainer.offsetWidth,
                containerHeight: scContainer.offsetWidth / this.aspectRatio,
                brushSrc: this.brushSrc,
                imageForwardSrc: this.coverSrc,
                imageBackgroundSrc: this.prizeSrc,
                percentToFinish: this.percent,
                callback: function () {
                    _this.$emit("finish"); // 刮完事件
                }
            });
            sc.init().then(function () {
                sc.canvas.addEventListener('scratch.move', function () {
                    _this.$emit("move", Math.floor(sc.getPercent())); // 移動中事件(帶百分比)
                });
            }).catch(function (error) {
                alert(error.message);
            });
        }
    },
});
// ud-editor：文字編輯器
Vue.component('ud-editor', {
    name: "UdEditor",
    template: '<h1>文案編輯器</h1>'
});
//-----------------------Web-----------------------
/**
 * randomHexColorCode：取得隨機十六進制顏色碼
 */
function randomHexColorCode() {
    var temp = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + temp.slice(0, 6);
}
;
/**
 * escapeHTML：轉義HTML(防XSS攻擊)
 * @param  {String} str 代入值
 * escapeHTML('<a href="#">Me & you</a>'); -> '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, function (tag) { return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag); });
}
/**
 * convertCamelCase：駝峰式轉換
 * @param  {String} str 代入值
 * convertCamelCase("camelCase"); -> camel-case
 */
function convertCamelCase(str) {
    if (str === void 0) { str = ''; }
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
/**
 * replaceURLToLink：將字串內URL轉為超連結
 * @param  {String} text 代入值
 */
function replaceURLToLink(text) {
    text = text.replace(URL, function (url) {
        var urlText = url;
        if (!url.match('^https?://'))
            url = 'http://' + url;
        return '' + urlText + '';
    });
    return text;
}
;
/**
 * 複製指定元素上的文字至剪貼簿
 * @param {string} target 要複製文字的指定元素id
 * @example copyTextById("title").then(res => udAlert(`已複製\n${ res }`));
 */
var copyTextById = function (target) {
    return new Promise(function (resolve, reject) {
        try {
            var textRange = document.createRange();
            textRange.selectNode(document.getElementById(target));
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(textRange);
            document.execCommand("copy");
            resolve(textRange);
        }
        catch (err) {
            console.log("複製失敗: ", err);
            reject(err);
        }
    });
};
//-----------------------Number-----------------------
/**
 * 四捨五入到指定位數
 * @param {number} val 傳入值
 * @param {number} decimals 指定位數 預設為0
 * @example roundNumber(1.235, 2) -> 1.24
 */
var roundNumber = function (val, decimals) {
    if (decimals === void 0) { decimals = 0; }
    if (val == null)
        return val;
    return Number(Math.round(val + "e" + decimals) + "e-" + decimals);
};
//-----------------------Image-----------------------
/**
 * 下載Canvas圖片
 * @param {string} selector canvas元素選擇器
 * @param {string} name 圖片名稱 預設為'下載圖片'
 * @example canvasImageDownload('canvas', '自訂圖片名稱')
 */
var canvasImageDownload = function (selector, name) {
    if (name === void 0) { name = '下載圖片'; }
    var canvas = document.querySelector(selector);
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    var event = new MouseEvent('click');
    a.download = name;
    a.href = url;
    a.dispatchEvent(event);
};
//-----------------------Array-----------------------
/**
 * 二維陣列扁平化
 * @param {array} arr 傳入值
 * @param {number} depth 指定深度
 * @example flatArray([1, [2], 3, 4]); -> [1, 2, 3, 4]
 * @example flatArray([1, [2, [3, [4, 5], 6], 7], 8], 2); -> [1, 2, 3, [4, 5], 6, 7, 8]
 */
var flatArray = function (arr, depth) {
    if (depth === void 0) { depth = 1; }
    if (arr == null)
        return arr;
    return arr.reduce(function (a, v) { return a.concat(depth > 1 && Array.isArray(v) ? flatArray(v, depth - 1) : v); }, []);
};
/**
 * 兩陣列的交集
 * @param {array} arrA 陣列A
 * @param {array} arrB 陣列B
 * @example intersectionArray([1, 2, 3], [4, 3, 2]); -> [2, 3]
 */
var intersectionArray = function (arrA, arrB) {
    if (arrA == null || arrB == null)
        return null;
    var s = new Set(arrB);
    return arrA.filter(function (x) { return s.has(x); });
};
/**
 * 洗牌陣列
 * @param {array} arr 傳入值
 * @example shuffleArray([1, 2, 3]); -> [2, 3, 1];
 */
var shuffleArray = function (arr) {
    if (arr == null)
        return arr;
    var arrCopy = arr.slice();
    var m = arrCopy.length;
    while (m) {
        var i = Math.floor(Math.random() * m--);
        _a = [arrCopy[i], arrCopy[m]], arrCopy[m] = _a[0], arrCopy[i] = _a[1];
    }
    return arrCopy;
    var _a;
};
//-----------------------Object-----------------------
/**
 * 過濾物件鍵值
 * @param {object} val 傳入值
 * @param {array} arr 過濾值的陣列
 * @example filterObj(obj, ["keyA", "keyB"]);
 */
var filterObj = function (val, arr) {
    var tempObj = JSON.parse(JSON.stringify(val));
    for (var i in tempObj) {
        if (arr.indexOf(i) === -1)
            delete tempObj[i];
    }
    return tempObj;
};
/**
 * 刪除物件鍵值
 * @param {object} obj 傳入值
 * @param {array} arr 刪除值的陣列
 * @example deleteObj(obj, ["keyA", "keyB"]);
 */
var deleteObj = function (obj, arr) {
    var tempObj = JSON.parse(JSON.stringify(obj));
    for (var i in tempObj) {
        if (arr.indexOf(i) !== -1)
            delete tempObj[i];
    }
    return tempObj;
};
/**
 * 深拷貝(簡易版)
 * @param {object} obj 傳入值
 */
var deepCloneSimple = function (obj) {
    if (obj == null)
        return obj;
    return JSON.parse(JSON.stringify(obj));
};
//-----------------------Time-----------------------
/**
 * 判斷是否為閏年
 * @param {number} year 年份
 */
var isLeapYear = function (year) {
    if (year == null)
        return year;
    return new Date(year, 1, 29).getDate() === 29;
};
//-----------------------Browser-----------------------
/**
 * loadStyle：動態加載css文件
 * @param  {String} url 文件路徑
 */
function loadStyle(url) {
    try {
        document.createStyleSheet(url);
    }
    catch (e) {
        var cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.href = url;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(cssLink);
    }
}
/**
 * insertPlugin：動態載入插件
 * @param  {String} src 路徑
 */
function insertPlugin(src) {
    var script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
}
//-----------------------Web-----------------------
/**
 * httpsRedirect：HTTP跳轉HTTPS
 */
function httpsRedirect() {
    if (location.protocol !== 'https:')
        location.replace('https://' + location.href.split('//')[1]);
}
;
/**
 * getUrlState：檢驗URL連接是否有效
 * @param  {String} URL 網址
 */
function getUrlState(URL) {
    var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
    xmlhttp.Open("GET", URL, false);
    try {
        xmlhttp.Send();
    }
    catch (e) {
    }
    finally {
        var result = xmlhttp.responseText;
        if (result) {
            if (xmlhttp.Status == 200) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
/**
 * cdnBackup：CDN備援
 */
function cdnBackup() {
    if (!window.Vue) {
        document.write("\n      <link href=\"https://pro.fontawesome.com/releases/v5.13.1/css/fontawesome.css\" rel=\"stylesheet\">\n      <link href=\"https://cdn.jsdelivr.net/npm/animate.css@3.7.2/animate.min.css\" rel=\"stylesheet\">\n      <link href=\"https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/theme-chalk/index.css\" rel=\"stylesheet\">\n      <script src=\"https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/@braid/vue-formulate@2.4.3/dist/formulate.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/index.js\"></script>\n      <script src=\"js/ud-modules.js\"></script>\n    ");
        console.log("CDN Error!!");
    }
}
/**
 * 取得Cookie的值
 * @param {string} key 傳入值
 */
var getCookie = function (key) {
    var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
};
/**
 * 解析網址
 * @param {string} url 網址
 */
var parseUrl = function (url) {
    if (url === void 0) { url = location.href; }
    if (url == null)
        return url;
    var parseUrl = new URL(url);
    return parseUrl;
};
/**
 * 網址跳轉
 * @param {string} url 欲跳轉的網址
 */
var toUrl = function (url) {
    if (url == null)
        return url;
    window.location.href = url;
};
/**
 * 跳頁重整
 */
var jumpReload = function () {
    window.onpageshow = function (event) {
        if (event.persisted)
            window.location.reload();
    };
};
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
function animate(_a) {
    var timing = _a.timing, draw = _a.draw, duration = _a.duration;
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        // timeFraction 從 0 增加到 1
        var timeFraction = (time - start) / duration;
        if (timeFraction > 1)
            timeFraction = 1;
        // 計算當前動畫狀態
        var progress = timing(timeFraction);
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
    template: "\n    <div contenteditable=\"contenteditable\" @input=\"updateInput\" class=\"ud-contenteditable\">\n      {{ content }}\n    </div>\n  ",
    prop: ["value"],
    data: function () {
        return {
            content: ""
        };
    },
    methods: {
        updateInput: function () {
            this.$emit("input", this.content);
        }
    }
});
Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});
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
    template: "\n    <div class=\"ud-select-link\">\n      <ud-select v-model=\"modelValue[num - 1]\" :options=\"optionsUniq\" :placeholder=\"placeholder\" :combine=\"combine\"></ud-select>\n    </div>\n  ",
    props: {
        num: null,
        value: null,
        options: null,
        placeholder: { default: "請選擇一項" },
        combine: Boolean,
    },
    computed: {
        modelValue: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        },
        uniqValue: function () {
            return this.modelValue[this.num - 1];
        },
        optionsUniq: function () {
            var _this = this;
            var temp = [];
            if (this.num - 1 === 0) {
                temp = this.options;
            }
            else if (this.num - 1 === 1) {
                temp = this.options.find(function (option) { return option.value === _this.modelValue[0]; }).children;
            }
            else {
                temp = this.options.find(function (option) { return option.value === _this.modelValue[0]; }).children;
            }
            return temp;
        },
    },
    watch: {
        uniqValue: function () {
            this.modelValue.splice(1, 1, "");
        },
        secondValue: function () {
            if (this.third)
                this.modelValue.splice(2, 1, "");
        },
    },
    mounted: function () {
        var _this = this;
        this.$on('validate', function () {
            _this.$nextTick(function () {
                _this.$parent.$emit('validate'); // 通知FormItem校驗
            });
        });
    },
});
// 初始化執行
jumpReload();
//# sourceMappingURL=ud-modules-dev.js.map