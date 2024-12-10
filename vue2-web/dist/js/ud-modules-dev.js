/*
==================== Vue組件庫(Extra)目錄 ====================
Form
  SelectMultiple 下拉複選框 -----> ud-select-multiple
  InputPhone 電話號碼連動輸入框 -----> ud-input-phone
  Upload 上傳 -----> ud-upload
  ImageUpload 圖片上傳預覽 -----> ud-image-upload
  ImageMultiUpload 圖片上傳預覽(多張) -----> ud-image-multi-upload
  DatePicker 日期選擇器 -----> ud-date-picker

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
// SelectMultiple 下拉複選框 (依賴：element-ui)
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
// InputPhone 電話號碼連動輸入框
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
// Upload 上傳
Vue.component('ud-upload', {
    name: "UdUpload",
    template: "\n\n  ",
    props: {},
});
// ImageUpload 圖片上傳預覽
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
// ImageMultiUpload 圖片上傳預覽(多張)
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
// DatePicker 日期選擇器 (依賴：element-ui)
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
//-----------------------Data-----------------------
// Table 表格
Vue.component('ud-table', {
    name: "UdTable",
    template: "\n\n  ",
    props: {},
});
// Pagination 分頁
Vue.component('ud-pagination', {
    name: "UdPagination",
    template: "\n\n  ",
    props: {},
});
//-----------------------Notice-----------------------
// Notify 通知訊息
Vue.component('ud-notify', {
    name: "UdNotify",
    template: "\n\n  ",
    props: {},
});
// Popover 氣泡框
Vue.component('ud-popover', {
    name: "UdPopover",
    template: "\n\n  ",
    props: {},
});
//-----------------------Tools-----------------------
// CountdownExpire 倒數計時(時限)
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
// Flex 通用排版容器
Vue.component('ud-flex', {
    name: "UdFlex",
    template: "\n    <div class=\"ud-flex\">\n      <slot></slot>\n    </div>\n  ",
    props: {}
});
//-----------------------Application-----------------------
//Carousel 圖片輪播
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
// Youtube 水管播放
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
// YoutubeApi 水管播放(控制版)
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
// GoogleMap 估狗地圖
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
// Select2 搜尋下拉框套件
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
// Scratch 刮刮樂
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
// Editor 文字編輯器
Vue.component('ud-editor', {
    name: "UdEditor",
    template: '<h1>文案編輯器</h1>'
});
//-----------------------Web-----------------------
/**
 * 取得隨機十六進制顏色碼
 */
function randomHexColorCode() {
    var temp = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + temp.slice(0, 6);
}
;
/**
 * 轉義HTML(防XSS攻擊)
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
 * 駝峰式轉換
 * @param  {String} str 代入值
 * convertCamelCase("camelCase"); -> camel-case
 */
function convertCamelCase(str) {
    if (str === void 0) { str = ''; }
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
/**
 * 將字串內URL轉為超連結
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
//-----------------------Browser-----------------------
/**
 * 動態加載css文件
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
 * 動態載入插件
 * @param  {String} src 路徑
 */
function insertPlugin(src) {
    var script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
}
//-----------------------Web-----------------------
/**
 * HTTP跳轉HTTPS
 */
function httpsRedirect() {
    if (location.protocol !== 'https:')
        location.replace('https://' + location.href.split('//')[1]);
}
;
/**
 * 檢驗URL連接是否有效
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
 * CDN備援
 */
function cdnBackup() {
    if (!window.Vue) {
        document.write("\n      <link href=\"https://pro.fontawesome.com/releases/v5.13.1/css/fontawesome.css\" rel=\"stylesheet\">\n      <link href=\"https://cdn.jsdelivr.net/npm/animate.css@3.7.2/animate.min.css\" rel=\"stylesheet\">\n      <link href=\"https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/theme-chalk/index.css\" rel=\"stylesheet\">\n      <script src=\"https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/@braid/vue-formulate@2.4.3/dist/formulate.min.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/index.js\"></script>\n      <script src=\"js/ud-modules.js\"></script>\n    ");
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
//# sourceMappingURL=ud-modules-dev.js.map