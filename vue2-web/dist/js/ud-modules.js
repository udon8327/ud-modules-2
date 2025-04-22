var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _this = this;
/*
==================== ud-modules 常用組件 ====================
Form
  ud-button：按鈕
  ud-input：輸入框
  ud-textarea：多行輸入框
  ud-radio：單選框
  ud-checkbox：多選框
  ud-select：下拉框
  ud-select-date：日期連動下拉框
  ud-select-twzip：台灣行政區連動下拉框
  ud-switch：開關
  ud-form-item：表單驗證容器
  ud-form：表單驗證

Layout
  ud-arrow：CSS箭頭
  ud-collapse：摺疊容器
  ud-image：等比例自適應圖片

Notice
  ud-alert：警告彈窗
  ud-modal：通用彈窗
  ud-loading：載入中

Tools
  ud-html：自定義訊息
  ud-ellipsis：文字省略
  ud-countdown：倒數計時

==================== ud-utils 常用函式 ====================
String
  nl2br：將字串內換行符\n轉為<br>
  getRandomString：取得隨機字串
  copyText：複製文字至剪貼簿

Number
  getRandom：取得範圍內隨機整數
  formatNumber：數字加入千分位逗號
  padStart：數字補零

Image
  imageLoaded：單張圖片載入完成
  imageAllLoaded：多張圖片載入完成
  imageDownload：下載Img圖片

Array
  isArrayRepeat：陣列是否有重複值(不分型別)
  removeArrayRepeat：移除陣列中的重複元素
  indexOfAll：返回陣列中某值的所有索引

Object
  typeOf：精準型別判斷
  deepClone：深拷貝
  renameKeys：物件key重命名

Time
  isExistDate：判斷日期是否存在
  getDiffDate：取得前後幾天的日期
  formatTime：時間格式化

DOM
  scrollTo：滾動至指定位置
  getPageScroll：取得頁面當前捲動高度(寬度)
  getPageSize：取得頁面尺寸

Verify
  isVerify：常用驗證函式
  isNumber：精準數字驗證
  isEmpty：未填入驗證

Web
  debounce：函式防抖
  throttle：函式節流
  queryString：查詢網址所帶參數
  isMobile：判斷是否移動裝置
*/
//-----------------------Form-----------------------
// ud-button：按鈕
Vue.component('ud-button', {
    name: 'UdButton',
    template: "\n    <div class=\"ud-button\">\n      <button\n        @click=\"clickHandler\"\n        v-bind=\"$attrs\"\n        :disabled=\"disabled || loading\"\n        :class=\"{\n          'is-disabled': disabled || loading,\n          'is-plain': plain,\n          'is-round': round,\n          'is-circle': circle,\n        }\"\n      >\n        <div class=\"button-wrapper\">\n          <span><slot>\u6309\u9215</slot></span>\n          <div class=\"button-icon\">\n            <div class=\"icon-loading\" v-if=\"loading\"></div>\n            <i :class=\"icon\" v-if=\"icon && !loading\"></i>\n            <img :src=\"image\" alt=\"\" v-if=\"image && !loading\">\n            <slot name=\"icon\" v-if=\"!loading\"></slot>\n          </div>\n        </div>\n      </button>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        icon: { default: '' },
        image: { default: '' },
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        round: Boolean,
        circle: Boolean,
        throttle: Boolean,
        throttleTime: { default: 1000 } // 函式節流間隔時間
    },
    methods: {
        clickHandler: function (evt) {
            if (this.throttle)
                return;
            this.$emit('click', evt);
        },
    },
    mounted: function () {
        var _this = this;
        if (!this.throttle)
            return;
        this.$el.addEventListener('click', throttle(function (evt) { return _this.$emit('click', evt); }, this.throttleTime));
    }
});
// ud-input：輸入框
Vue.component('ud-input', {
    name: 'UdInput',
    template: "\n    <div class=\"ud-input\">\n      <input\n        ref=\"input\"\n        v-model=\"modelValue\"\n        v-bind=\"$attrs\"\n        v-on=\"inputListeners\"\n        :class=\"{ 'is-center': center }\"\n        @input=\"onInput\"\n      >\n      <slot></slot>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: null,
        center: Boolean // 是否置中
    },
    computed: {
        modelValue: {
            get: function () { return this.value == null ? "" : this.value; },
            set: function (val) { this.$emit('input', val); }
        },
        inputListeners: function () {
            return Object.assign({}, this.$listeners, { input: function (event) { } });
        }
    },
    mounted: function () {
    },
    methods: {
        onInput: function () {
            this.$parent.$emit('validate'); // 通知FormItem校驗
        },
        focus: function () {
            this.$refs.input.focus();
        },
        blur: function () {
            this.$refs.input.blur();
        }
    }
});
// ud-textarea：多行輸入框
Vue.component('ud-textarea', {
    name: "UdTextarea",
    template: "\n    <div class=\"ud-textarea\">\n      <textarea\n        ref=\"textarea\"\n        v-model=\"modelValue\"\n        v-bind=\"$attrs\"\n        v-on=\"inputListeners\"\n        :rows=\"rows\"\n        :class=\"{ 'is-no-resize': noResize }\"\n        @input=\"onInput\"\n        :maxlength=\"limit\"\n      >\n      </textarea>\n      <div class=\"textarea-limit\" v-if=\"showLimit\" :class=\"{ 'limit-input': value.length > 0 }\">\n        <span>{{ valueLength }}/{{ limit }}</span>\n      </div>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: null,
        rows: { default: 4 },
        showLimit: Boolean,
        limit: { default: 0 },
        noResize: Boolean // 禁止改變大小
    },
    computed: {
        modelValue: {
            get: function () { return this.value == null ? "" : this.value; },
            set: function (val) { this.$emit('input', val); }
        },
        valueLength: function () {
            return this.value.length;
        },
        inputListeners: function () {
            return Object.assign({}, this.$listeners, { input: function (event) { } });
        }
    },
    methods: {
        onInput: function () {
            this.$parent.$emit('validate'); // 通知FormItem校驗
        },
        focus: function () {
            this.$refs.textarea.focus();
        },
        blur: function () {
            this.$refs.textarea.blur();
        }
    }
});
// ud-radio：單選框
Vue.component('ud-radio', {
    name: "UdRadio",
    template: "\n    <div class=\"ud-radio\" :class=\"{'is-flex': flex}\">\n      <label v-for=\"option in options\" :key=\"option.value\">\n        <input\n          type=\"radio\"\n          v-model=\"modelValue\"\n          :value=\"option.value\"\n          v-bind=\"$attrs\"\n          @change=\"onChange\"\n          ref=\"radio\"\n          :disabled=\"option.disabled\"\n        >\n        <div class=\"radio-decorator\"></div>\n        <p>{{ combine ? option.value : option.label }}</p>\n      </label>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: null,
        options: {
            default: null,
        },
        flex: Boolean,
        combine: Boolean // 使用value做為label
    },
    computed: {
        modelValue: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        }
    },
    methods: {
        onChange: function () {
            this.$parent.$emit('validate'); // 通知FormItem校驗
            this.$emit('change', this.$refs.radio.value);
        }
    }
});
// ud-checkbox：多選框
Vue.component('ud-checkbox', {
    name: "UdCheckbox",
    template: "\n    <div class=\"ud-checkbox\" :class=\"{'is-flex': flex}\">\n      <template v-if=\"typeof(options) === 'string' || options === null\">\n        <label>\n          <input\n            type=\"checkbox\"\n            v-model=\"modelValue\"\n            :value=\"options\"\n            v-bind=\"$attrs\"\n            @change=\"onChange\"\n            ref=\"checkbox\"\n          >\n          <div class=\"checkbox-decorator\" :class=\"{'is-solid': solid}\"></div>\n          <p><slot>{{ options }}</slot></p>\n        </label>\n      </template>\n      <template v-else>\n        <label v-for=\"option in options\" :key=\"option.value\">\n          <input\n            type=\"checkbox\"\n            :value=\"option.value\"\n            v-model=\"modelValue\"\n            v-bind=\"$attrs\"\n            @change=\"onChange\"\n            ref=\"checkbox\"\n            :disabled=\"option.disabled\"\n          >\n          <div class=\"checkbox-decorator\" :class=\"{'is-solid': solid}\"></div>\n          <p>{{ combine ? option.value : option.label }}</p>\n        </label>\n      </template>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: null,
        options: {
            default: null,
        },
        flex: Boolean,
        combine: Boolean,
        solid: Boolean,
    },
    computed: {
        modelValue: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        }
    },
    methods: {
        onChange: function () {
            this.$parent.$emit('validate'); // 通知FormItem校驗
            this.$emit('change', this.$refs.checkbox.value);
        }
    }
});
// ud-select：下拉框
Vue.component('ud-select', {
    name: "UdSelect",
    template: "\n    <div class=\"ud-select\">\n      <select \n        v-model=\"modelValue\" \n        :data-placeholder-selected=\"modelValue.length === 0\"\n        v-bind=\"$attrs\"\n        @change=\"onChange\"\n        ref=\"select\"\n        :class=\"{ center: center }\"\n      >\n        <option value=\"\" disabled selected>{{ placeholder }}</option>\n        <option v-for=\"option in optionsArr\" :value=\"option[valueBy]\" :key=\"option[valueBy]\" :disabled=\"option.disabled\">\n          {{ combine ? option[valueBy] : option[labelBy] }}\n        </option>\n      </select>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: { default: "" },
        options: {
            default: function () {
                return [
                    { label: "", value: "", disabled: true }
                ];
            }
        },
        placeholder: { default: "請選擇一項" },
        combine: Boolean,
        center: Boolean,
        group: { default: "" },
        index: { default: 0 },
        labelBy: { default: "label" },
        valueBy: { default: "value" },
        childrenBy: { default: "children" },
    },
    data: function () {
        return {
            groupWatch: []
        };
    },
    computed: {
        modelValue: {
            get: function () { return this.value == null ? "" : this.value; },
            set: function (val) { this.$emit('input', val); }
        },
        optionsArr: function () {
            var _this = this;
            this.groupWatch = this.group.slice();
            var temp = this.options;
            if (this.index === 0)
                return temp;
            if (this.group[this.index - 1]) {
                var _loop_1 = function (i) {
                    temp = temp.find(function (option) { return option[_this.valueBy] === _this.group[i]; })[this_1.childrenBy];
                };
                var this_1 = this;
                for (var i = 0; i < this.index; i++) {
                    _loop_1(i);
                }
                return temp;
            }
            return {};
        }
    },
    watch: {
        groupWatch: function (newVal, oldVal) {
            var target;
            for (var i = 0; i < this.group.length; i++) {
                if (newVal[i] !== oldVal[i])
                    target = i;
            }
            if (this.index > target)
                this.$emit('input', "");
        }
    },
    mounted: function () {
    },
    methods: {
        onChange: function () {
            this.$parent.$emit('validate'); // 通知FormItem校驗
            this.$emit('change', this.$refs.select.value);
        },
    }
});
// ud-select-date：日期連動下拉框
Vue.component('ud-select-date', {
    name: "UdSelectDate",
    template: "\n    <div class=\"ud-select-date\" :class=\"{'is-flex': flex}\">\n      <ud-select v-model=\"modelValue[0]\" v-bind=\"$attrs\" :options=\"firstArr\" :placeholder=\"placeholder[0]\" combine></ud-select>\n      <slot></slot>\n      <ud-select v-model=\"modelValue[1]\" v-bind=\"$attrs\" :options=\"secondArr\" :placeholder=\"placeholder[1]\" combine></ud-select>\n      <slot name=\"second\"></slot>\n      <ud-select v-model=\"modelValue[2]\" v-bind=\"$attrs\" :options=\"thirdArr\" :placeholder=\"placeholder[2]\" combine v-if=\"third\"></ud-select>\n      <slot name=\"third\"></slot>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: null,
        placeholder: {
            default: function () {
                return ["年", "月", "日"];
            }
        },
        third: Boolean,
        flex: Boolean,
        roc: Boolean // 是否為民國年
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
            var temp = [];
            var time = new Date();
            var year = time.getFullYear();
            if (this.roc)
                year = year - 1911;
            var yearAfter = year - 120;
            if (this.roc && yearAfter <= 0)
                yearAfter = 1;
            for (var i = year; i >= yearAfter; i--) {
                temp.push({ value: i });
            }
            return temp;
        },
        secondArr: function () {
            var temp = [];
            if (this.firstValue) {
                for (var i = 1; i <= 12; i++) {
                    temp.push({ value: i });
                }
            }
            return temp;
        },
        thirdArr: function () {
            var temp = [];
            if (this.firstValue && this.secondValue) {
                var year = parseInt(this.firstValue);
                if (this.roc)
                    year = year + 1911;
                var date = new Date(year, this.secondValue, 0).getDate();
                for (var i = 1; i <= date; i++) {
                    temp.push({ value: i });
                }
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
// ud-select-twzip：台灣行政區連動下拉框
Vue.component('ud-select-twzip', {
    name: "UdSelectTwzip",
    template: "\n    <div class=\"ud-select-twzip\" :class=\"{'is-flex': flex}\">\n      <ud-select v-model=\"county\" id=\"county\" @change=\"onCountyChange()\" :options=\"countyArr\" :placeholder=\"placeholder[0]\" :combine=\"combine\"></ud-select>\n      <slot></slot>\n      <ud-select v-model=\"district\" id=\"district\" :options=\"districtArr\" :placeholder=\"placeholder[1]\" :combine=\"combine\"></ud-select>\n      <slot name=\"second\"></slot>\n    </div>\n  ",
    props: {
        value: {
            type: Array,
            default: function () { return ["", ""]; }
        },
        placeholder: {
            type: Array,
            default: function () { return ["請選擇縣市", "請選擇行政區"]; }
        },
        flex: Boolean,
        combine: Boolean,
    },
    data: function () {
        return {
            county: "",
            district: "",
            options: [
                {
                    label: "基隆市", value: "01",
                    children: [{ label: "仁愛區", value: "200" }, { label: "信義區", value: "201" }, { label: "中正區", value: "202" }, { label: "中山區", value: "203" }, { label: "安樂區", value: "204" }, { label: "暖暖區", value: "205" }, { label: "七堵區", value: "206" }]
                },
                {
                    label: "臺北市", value: "02",
                    children: [{ label: "中正區", value: "100" }, { label: "大同區", value: "103" }, { label: "中山區", value: "104" }, { label: "松山區", value: "105" }, { label: "大安區", value: "106" }, { label: "萬華區", value: "108" }, { label: "信義區", value: "110" },
                        { label: "士林區", value: "111" }, { label: "北投區", value: "112" }, { label: "內湖區", value: "114" }, { label: "南港區", value: "115" }, { label: "文山區", value: "116" }]
                },
                {
                    label: "新北市", value: "03",
                    children: [{ label: "萬里區", value: "207" }, { label: "金山區", value: "208" }, { label: "板橋區", value: "220" }, { label: "汐止區", value: "221" }, { label: "深坑區", value: "222" }, { label: "石碇區", value: "223" }, { label: "瑞芳區", value: "224" },
                        { label: "平溪區", value: "226" }, { label: "雙溪區", value: "227" }, { label: "貢寮區", value: "228" }, { label: "新店區", value: "231" }, { label: "坪林區", value: "232" }, { label: "烏來區", value: "233" }, { label: "永和區", value: "234" },
                        { label: "中和區", value: "235" }, { label: "土城區", value: "236" }, { label: "三峽區", value: "237" }, { label: "樹林區", value: "238" }, { label: "鶯歌區", value: "239" }, { label: "三重區", value: "241" }, { label: "新莊區", value: "242" },
                        { label: "泰山區", value: "243" }, { label: "林口區", value: "244" }, { label: "蘆洲區", value: "247" }, { label: "五股區", value: "248" }, { label: "八里區", value: "249" }, { label: "淡水區", value: "251" }, { label: "三芝區", value: "252" },
                        { label: "石門區", value: "253" }]
                },
                {
                    label: "宜蘭縣", value: "04",
                    children: [{ label: "宜蘭市", value: "260" }, { label: "頭城鎮", value: "261" }, { label: "礁溪鄉", value: "262" }, { label: "壯圍鄉", value: "263" }, { label: "員山鄉", value: "264" }, { label: "羅東鎮", value: "265" }, { label: "三星鄉", value: "266" },
                        { label: "大同鄉", value: "267" }, { label: "五結鄉", value: "268" }, { label: "冬山鄉", value: "269" }, { label: "蘇澳鎮", value: "270" }, { label: "南澳鄉", value: "272" }, { label: "釣魚臺列嶼", value: "290" }]
                },
                {
                    label: "新竹市", value: "05",
                    children: [{ label: "東區", value: "300" }, { label: "北區", value: "300" }, { label: "香山區", value: "300" }]
                },
                {
                    label: "新竹縣", value: "06",
                    children: [{ label: "竹北市", value: "302" }, { label: "湖口鄉", value: "303" }, { label: "新豐鄉", value: "304" }, { label: "新埔鎮", value: "305" }, { label: "關西鎮", value: "306" }, { label: "芎林鄉", value: "307" }, { label: "寶山鄉", value: "308" },
                        { label: "竹東鎮", value: "310" }, { label: "五峰鄉", value: "311" }, { label: "橫山鄉", value: "312" }, { label: "尖石鄉", value: "313" }, { label: "北埔鄉", value: "314" }, { label: "峨眉鄉", value: "315" }]
                },
                {
                    label: "桃園市", value: "07",
                    children: [{ label: "中壢區", value: "320" }, { label: "平鎮區", value: "324" }, { label: "龍潭區", value: "325" }, { label: "楊梅區", value: "326" }, { label: "新屋區", value: "327" }, { label: "觀音區", value: "328" }, { label: "桃園區", value: "330" },
                        { label: "龜山區", value: "333" }, { label: "八德區", value: "334" }, { label: "大溪區", value: "335" }, { label: "復興區", value: "336" }, { label: "大園區", value: "337" }, { label: "蘆竹區", value: "338" }]
                },
                {
                    label: "苗栗縣", value: "08",
                    children: [{ label: "竹南鎮", value: "350" }, { label: "頭份市", value: "351" }, { label: "三灣鄉", value: "352" }, { label: "南庄鄉", value: "353" }, { label: "獅潭鄉", value: "354" }, { label: "後龍鎮", value: "356" }, { label: "通霄鎮", value: "357" },
                        { label: "苑裡鎮", value: "358" }, { label: "苗栗市", value: "360" }, { label: "造橋鄉", value: "361" }, { label: "頭屋鄉", value: "362" }, { label: "公館鄉", value: "363" }, { label: "大湖鄉", value: "364" }, { label: "泰安鄉", value: "365" },
                        { label: "銅鑼鄉", value: "366" }, { label: "三義鄉", value: "367" }, { label: "西湖鄉", value: "368" }, { label: "卓蘭鎮", value: "369" }]
                },
                {
                    label: "臺中市", value: "09",
                    children: [{ label: "中區", value: "400" }, { label: "東區", value: "401" }, { label: "南區", value: "402" }, { label: "西區", value: "403" }, { label: "北區", value: "404" }, { label: "北屯區", value: "406" }, { label: "西屯區", value: "407" },
                        { label: "南屯區", value: "408" }, { label: "太平區", value: "411" }, { label: "大里區", value: "412" }, { label: "霧峰區", value: "413" }, { label: "烏日區", value: "414" }, { label: "豐原區", value: "420" }, { label: "后里區", value: "421" },
                        { label: "石岡區", value: "422" }, { label: "東勢區", value: "423" }, { label: "和平區", value: "424" }, { label: "新社區", value: "426" }, { label: "潭子區", value: "427" }, { label: "大雅區", value: "428" }, { label: "神岡區", value: "429" },
                        { label: "大肚區", value: "432" }, { label: "沙鹿區", value: "433" }, { label: "龍井區", value: "434" }, { label: "梧棲區", value: "435" }, { label: "清水區", value: "436" }, { label: "大甲區", value: "437" }, { label: "外埔區", value: "438" },
                        { label: "大安區", value: "439" }]
                },
                {
                    label: "彰化縣", value: "10",
                    children: [{ label: "彰化市", value: "500" }, { label: "芬園鄉", value: "502" }, { label: "花壇鄉", value: "503" }, { label: "秀水鄉", value: "504" }, { label: "鹿港鎮", value: "505" }, { label: "福興鄉", value: "506" }, { label: "線西鄉", value: "507" },
                        { label: "和美鎮", value: "508" }, { label: "伸港鄉", value: "509" }, { label: "員林市", value: "510" }, { label: "社頭鄉", value: "511" }, { label: "永靖鄉", value: "512" }, { label: "埔心鄉", value: "513" }, { label: "溪湖鎮", value: "514" },
                        { label: "大村鄉", value: "515" }, { label: "埔鹽鄉", value: "516" }, { label: "田中鎮", value: "520" }, { label: "北斗鎮", value: "521" }, { label: "田尾鄉", value: "522" }, { label: "埤頭鄉", value: "523" }, { label: "溪州鄉", value: "524" },
                        { label: "竹塘鄉", value: "525" }, { label: "二林鎮", value: "526" }, { label: "大城鄉", value: "527" }, { label: "芳苑鄉", value: "528" }, { label: "二水鄉", value: "530" }]
                },
                {
                    label: "南投縣", value: "11",
                    children: [{ label: "南投市", value: "540" }, { label: "中寮鄉", value: "541" }, { label: "草屯鎮", value: "542" }, { label: "國姓鄉", value: "544" }, { label: "埔里鎮", value: "545" }, { label: "仁愛鄉", value: "546" }, { label: "名間鄉", value: "551" },
                        { label: "集集鎮", value: "552" }, { label: "水里鄉", value: "553" }, { label: "魚池鄉", value: "555" }, { label: "信義鄉", value: "556" }, { label: "竹山鎮", value: "557" }, { label: "鹿谷鄉", value: "558" }]
                },
                {
                    label: "嘉義市", value: "12",
                    children: [{ label: "東區", value: "600" }, { label: "西區", value: "600" }]
                },
                {
                    label: "嘉義縣", value: "13",
                    children: [{ label: "番路鄉", value: "602" }, { label: "梅山鄉", value: "603" }, { label: "竹崎鄉", value: "604" }, { label: "阿里山", value: "605" }, { label: "中埔鄉", value: "606" }, { label: "大埔鄉", value: "607" }, { label: "水上鄉", value: "608" },
                        { label: "鹿草鄉", value: "611" }, { label: "太保市", value: "612" }, { label: "朴子市", value: "613" }, { label: "東石鄉", value: "614" }, { label: "六腳鄉", value: "615" }, { label: "新港鄉", value: "616" }, { label: "民雄鄉", value: "621" },
                        { label: "大林鎮", value: "622" }, { label: "溪口鄉", value: "623" }, { label: "義竹鄉", value: "624" }, { label: "布袋鎮", value: "625" }]
                },
                {
                    label: "雲林縣", value: "14",
                    children: [{ label: "斗南鎮", value: "630" }, { label: "大埤鄉", value: "631" }, { label: "虎尾鎮", value: "632" }, { label: "土庫鎮", value: "633" }, { label: "褒忠鄉", value: "634" }, { label: "東勢鄉", value: "635" }, { label: "臺西鄉", value: "636" },
                        { label: "崙背鄉", value: "637" }, { label: "麥寮鄉", value: "638" }, { label: "斗六市", value: "640" }, { label: "林內鄉", value: "643" }, { label: "古坑鄉", value: "646" }, { label: "莿桐鄉", value: "647" }, { label: "西螺鎮", value: "648" },
                        { label: "二崙鄉", value: "649" }, { label: "北港鎮", value: "651" }, { label: "水林鄉", value: "652" }, { label: "口湖鄉", value: "653" }, { label: "四湖鄉", value: "654" }, { label: "元長鄉", value: "655" }]
                },
                {
                    label: "臺南市", value: "15",
                    children: [{ label: "中西區", value: "700" }, { label: "東區", value: "701" }, { label: "南區", value: "702" }, { label: "北區", value: "704" }, { label: "安平區", value: "708" }, { label: "安南區", value: "709" }, { label: "永康區", value: "710" },
                        { label: "歸仁區", value: "711" }, { label: "新化區", value: "712" }, { label: "左鎮區", value: "713" }, { label: "玉井區", value: "714" }, { label: "楠西區", value: "715" }, { label: "南化區", value: "716" }, { label: "仁德區", value: "717" },
                        { label: "關廟區", value: "718" }, { label: "龍崎區", value: "719" }, { label: "官田區", value: "720" }, { label: "麻豆區", value: "721" }, { label: "佳里區", value: "722" }, { label: "西港區", value: "723" }, { label: "七股區", value: "724" },
                        { label: "將軍區", value: "725" }, { label: "學甲區", value: "726" }, { label: "北門區", value: "727" }, { label: "新營區", value: "730" }, { label: "後壁區", value: "731" }, { label: "白河區", value: "732" }, { label: "東山區", value: "733" },
                        { label: "六甲區", value: "734" }, { label: "下營區", value: "735" }, { label: "柳營區", value: "736" }, { label: "鹽水區", value: "737" }, { label: "善化區", value: "741" }, { label: "大內區", value: "742" }, { label: "山上區", value: "743" },
                        { label: "新市區", value: "744" }, { label: "安定區", value: "745" }]
                },
                {
                    label: "高雄市", value: "16",
                    children: [{ label: "新興區", value: "800" }, { label: "前金區", value: "801" }, { label: "苓雅區", value: "802" }, { label: "鹽埕區", value: "803" }, { label: "鼓山區", value: "804" }, { label: "旗津區", value: "805" }, { label: "前鎮區", value: "806" },
                        { label: "三民區", value: "807" }, { label: "楠梓區", value: "811" }, { label: "小港區", value: "812" }, { label: "左營區", value: "813" }, { label: "仁武區", value: "814" }, { label: "大社區", value: "815" }, { label: "岡山區", value: "820" },
                        { label: "路竹區", value: "821" }, { label: "阿蓮區", value: "822" }, { label: "田寮區", value: "823" }, { label: "燕巢區", value: "824" }, { label: "橋頭區", value: "825" }, { label: "梓官區", value: "826" }, { label: "彌陀區", value: "827" },
                        { label: "永安區", value: "828" }, { label: "湖內區", value: "829" }, { label: "鳳山區", value: "830" }, { label: "大寮區", value: "831" }, { label: "林園區", value: "832" }, { label: "鳥松區", value: "833" }, { label: "大樹區", value: "840" },
                        { label: "旗山區", value: "842" }, { label: "美濃區", value: "843" }, { label: "六龜區", value: "844" }, { label: "內門區", value: "845" }, { label: "杉林區", value: "846" }, { label: "甲仙區", value: "847" }, { label: "桃源區", value: "848" },
                        { label: "那瑪夏區", value: "849" }, { label: "茂林區", value: "851" }, { label: "茄萣區", value: "852" }]
                },
                {
                    label: "屏東縣", value: "17",
                    children: [{ label: "屏東市", value: "900" }, { label: "三地門鄉", value: "901" }, { label: "霧臺鄉", value: "902" }, { label: "瑪家鄉", value: "903" }, { label: "九如鄉", value: "904" }, { label: "里港鄉", value: "905" }, { label: "高樹鄉", value: "906" },
                        { label: "鹽埔鄉", value: "907" }, { label: "長治鄉", value: "908" }, { label: "麟洛鄉", value: "909" }, { label: "竹田鄉", value: "911" }, { label: "內埔鄉", value: "912" }, { label: "萬丹鄉", value: "913" }, { label: "潮州鎮", value: "920" },
                        { label: "泰武鄉", value: "921" }, { label: "來義鄉", value: "922" }, { label: "萬巒鄉", value: "923" }, { label: "崁頂鄉", value: "924" }, { label: "新埤鄉", value: "925" }, { label: "南州鄉", value: "926" }, { label: "林邊鄉", value: "927" },
                        { label: "東港鎮", value: "928" }, { label: "琉球鄉", value: "929" }, { label: "佳冬鄉", value: "931" }, { label: "新園鄉", value: "932" }, { label: "枋寮鄉", value: "940" }, { label: "枋山鄉", value: "941" }, { label: "春日鄉", value: "942" },
                        { label: "獅子鄉", value: "943" }, { label: "車城鄉", value: "944" }, { label: "牡丹鄉", value: "945" }, { label: "恆春鎮", value: "946" }, { label: "滿州鄉", value: "947" }]
                },
                {
                    label: "臺東縣", value: "18",
                    children: [{ label: "臺東市", value: "950" }, { label: "綠島鄉", value: "951" }, { label: "蘭嶼鄉", value: "952" }, { label: "延平鄉", value: "953" }, { label: "卑南鄉", value: "954" }, { label: "鹿野鄉", value: "955" }, { label: "關山鎮", value: "956" },
                        { label: "海端鄉", value: "957" }, { label: "池上鄉", value: "958" }, { label: "東河鄉", value: "959" }, { label: "成功鎮", value: "961" }, { label: "長濱鄉", value: "962" }, { label: "太麻里鄉", value: "963" }, { label: "金峰鄉", value: "964" },
                        { label: "大武鄉", value: "965" }, { label: "達仁鄉", value: "966" }]
                },
                {
                    label: "花蓮縣", value: "19",
                    children: [{ label: "花蓮市", value: "970" }, { label: "新城鄉", value: "971" }, { label: "秀林鄉", value: "972" }, { label: "吉安鄉", value: "973" }, { label: "壽豐鄉", value: "974" }, { label: "鳳林鎮", value: "975" }, { label: "光復鄉", value: "976" },
                        { label: "豐濱鄉", value: "977" }, { label: "瑞穗鄉", value: "978" }, { label: "萬榮鄉", value: "979" }, { label: "玉里鎮", value: "981" }, { label: "卓溪鄉", value: "982" }, { label: "富里鄉", value: "983" }]
                },
                {
                    label: "金門縣", value: "20",
                    children: [{ label: "金沙鎮", value: "890" }, { label: "金湖鎮", value: "891" }, { label: "金寧鄉", value: "892" }, { label: "金城鎮", value: "893" }, { label: "烈嶼鄉", value: "894" }, { label: "烏坵鄉", value: "896" }]
                },
                {
                    label: "連江縣", value: "21",
                    children: [{ label: "南竿鄉", value: "209" }, { label: "北竿鄉", value: "210" }, { label: "莒光鄉", value: "211" }, { label: "東引鄉", value: "212" }]
                },
                {
                    label: "澎湖縣", value: "22",
                    children: [{ label: "馬公市", value: "880" }, { label: "西嶼鄉", value: "881" }, { label: "望安鄉", value: "882" }, { label: "七美鄉", value: "883" }, { label: "白沙鄉", value: "884" }, { label: "湖西鄉", value: "885" }]
                },
            ]
        };
    },
    computed: {
        countyArr: function () {
            return this.options;
        },
        districtArr: function () {
            var _this = this;
            var temp = [];
            if (this.county) {
                temp = this.options.find(function (option) { return option.value === _this.county; }).children;
            }
            return temp;
        },
    },
    watch: {
        value: {
            immediate: true,
            handler: function () {
                this.county = this.value[0];
                if (this.county === "05") {
                    this.district = "300";
                }
                else if (this.county === "12") {
                    this.district = "600";
                }
                else {
                    this.district = this.value[1];
                }
            }
        },
        county: function () {
            this.$emit("input", [this.county, this.district]);
        },
        district: function () {
            this.$emit("input", [this.county, this.district]);
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
    methods: {
        onCountyChange: function () {
            this.district = "";
        }
    },
});
// ud-switch：開關
Vue.component('ud-switch', {
    name: "UdSwitch",
    template: "\n    <div class=\"ud-switch\">\n      <label>\n        <input \n          type=\"checkbox\"\n          v-model=\"modelValue\"\n          v-bind=\"$attrs\"\n          @change=\"onChange\"\n        >\n        <div class=\"switch-decorator\">\n          <div class=\"circle\"></div>\n        </div>\n        <slot></slot>\n      </label>\n    </div>\n  ",
    inheritAttrs: false,
    props: {
        value: { default: false },
    },
    computed: {
        modelValue: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        }
    },
    methods: {
        onChange: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.$emit("change", _this.modelValue);
            });
        }
    },
});
// ud-form-item：表單驗證容器
Vue.component('ud-form-item', {
    name: "UdFormItem",
    template: "\n    <div class=\"ud-form-item\" :class=\"{'is-error': errorMessage, 'is-flex': flex}\">\n      <div class=\"ud-form-item-left\" :v-if=\"label\" style=\"{ 'flex-basis': labelWidth, 'text-align': labelAlign }\">  \n        <img :src=\"icon\" v-if=\"icon\">\n        <label v-if=\"label\"><span v-if=\"required\">*</span>{{ label }}</label>\n      </div>\n      <div class=\"ud-form-item-right\">  \n        <slot></slot>\n        <p class=\"error-message\" v-if=\"errorMessage\">{{ errorMessage }}</p>\n      </div>\n    </div>\n  ",
    data: function () {
        return {
            errorMessage: '',
            lock: false,
        };
    },
    inject: ["form"],
    props: {
        required: {
            type: Boolean,
        },
        icon: {
            type: String
        },
        label: {
            type: String,
        },
        prop: {
            type: String
        },
        flex: {
            type: Boolean
        },
        labelWidth: {
            type: String,
            default: "30%"
        },
        labelAlign: {
            type: String,
        },
    },
    mounted: function () {
        var _this = this;
        this.$on('validate', function () {
            if (!_this.prop)
                return;
            _this.validate(false);
        });
    },
    methods: {
        validate: function (submit) {
            var _this = this;
            if (this.form.submitLock)
                return;
            var rules = this.form.rules[this.prop]; // 獲取校驗規則
            var value = this.form.model[this.prop]; // 獲取數據
            if (!rules)
                return;
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                this.errorMessage = "";
                switch (rule.type) {
                    case "required":// 必填驗證
                        if (Array.isArray(value) && value.length != 0) {
                            if (value.some(function (i) { return i.length === 0; }))
                                this.errorMessage = rule.message || "此欄位為必填項目";
                        }
                        else if (value === null) {
                            this.errorMessage = rule.message || "此欄位為必填項目";
                        }
                        else {
                            if (value.length === 0 || value === false)
                                this.errorMessage = rule.message || "此欄位為必填項目";
                        }
                        break;
                    case "name":// 姓名驗證
                        if (value && !/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value))
                            this.errorMessage = rule.message || "姓名格式有誤，不接受特殊符號";
                        break;
                    case "phone":// 電話驗證
                        var valueAfter = this.typeOf(value) === 'array' ? value.join("") : value;
                        if (valueAfter && !/^09[0-9]{8}$/.test(valueAfter))
                            this.errorMessage = rule.message || "電話格式有誤，例: 0929123456";
                        break;
                    case "email":// 電子郵件驗證
                        if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
                            this.errorMessage = rule.message || "Email格式有誤，需包含'@'符號";
                        break;
                    case "uniform":// 統一編號驗證
                        if (value && !/^[0-9]{8}$/.test(value))
                            this.errorMessage = rule.message || "統一編號格式有誤，例: 12345678";
                        break;
                    case "idcard":// 身分證字號驗證
                        if (value && !/^[A-Z](1|2)[0-9]{8}$/.test(value))
                            this.errorMessage = rule.message || "身分證字號格式有誤，例: A123456789";
                        break;
                    case "date":// 日期驗證
                        if (value && !/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(value))
                            this.errorMessage = rule.message || "日期格式有誤或不存在，例: 2020-03-04";
                        break;
                    case "number":// 數字驗證
                        if (value && !/^[0-9]+$/.test(value))
                            this.errorMessage = rule.message || "格式有誤，只接受數字";
                        break;
                    case "url":// 網址驗證
                        if (value && !new RegExp("^(https?:\\/\\/)?" + // protocol
                            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                            "(\\#[-a-z\\d_]*)?$", // fragment locator
                        "i").test(value))
                            this.errorMessage = rule.message || "網址格式有誤，例: https://www.google.com";
                        break;
                    case "ip":// IP地址驗證
                        if (value && !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value))
                            this.errorMessage = rule.message || "IP地址格式有誤，例: 115.28.47.26";
                        break;
                    case "hex":// Hex色碼驗證
                        if (value && !/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value))
                            this.errorMessage = rule.message || "Hex色碼格式有誤，例: #ff0000";
                        break;
                    case "equal":// 相等驗證
                        if (rule.caseIgnore) {
                            if (value && value.toLowerCase() !== this.form.model[rule.equalTo].toLowerCase())
                                this.errorMessage = rule.message || "驗證碼錯誤";
                        }
                        else {
                            if (value && value !== this.form.model[rule.equalTo])
                                this.errorMessage = rule.message || "驗證碼錯誤";
                        }
                        break;
                    case "regex":// 自訂正則驗證
                        if (!new RegExp(rule.regex).test(value))
                            this.errorMessage = rule.message || "格式有誤，請重新輸入";
                        break;
                    default:
                        console.error("預期外的驗證類型: " + rule.type);
                        break;
                }
                if (this.errorMessage)
                    break;
            }
            if (!submit)
                return;
            return new Promise(function (resolve, reject) {
                _this.errorMessage ? reject() : resolve();
            });
        },
        typeOf: function (val) {
            return val === undefined ? 'undefined' : val === null ? 'null' : val.constructor.name.toLowerCase();
        },
    }
});
// ud-form：表單驗證
Vue.component('ud-form', {
    name: "UdForm",
    template: "\n    <div class=\"ud-form\" :class=\"{'is-no-error-msg': noErrorMsg}\">\n      <slot></slot>\n    </div>\n  ",
    inheritAttrs: false,
    provide: function () {
        return {
            form: this // 傳遞Form實例给後代，比如FormItem用來校驗
        };
    },
    data: function () {
        return {
            submitLock: true
        };
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object
        },
        noErrorMsg: {
            type: Boolean
        },
        noErrorScroll: {
            type: Boolean
        },
    },
    methods: {
        validate: function (successCb, failedCb) {
            var _this = this;
            if (successCb === void 0) { successCb = function () { console.log('驗證成功'); }; }
            if (failedCb === void 0) { failedCb = function () { console.log('驗證失敗'); }; }
            this.submitLock = false;
            var tasks = this.$children.filter(function (item) { return item.prop; }).map(function (item) { return item.validate(true); });
            // console.log('tasks: ', tasks);
            Promise.all(tasks)
                .then(function () { return successCb(); })
                .catch(function () {
                if (!_this.noErrorScroll) {
                    _this.$nextTick(function () { return _this.scrollTo(".is-error", 5, -10); });
                }
                failedCb();
            });
        },
        scrollTo: function (el, speed, offset, callback) {
            if (el === void 0) { el = "top"; }
            if (speed === void 0) { speed = 5; }
            if (offset === void 0) { offset = 0; }
            if (callback === void 0) { callback = function () { }; }
            var scrollTop = document.scrollingElement.scrollTop;
            var top = 0;
            if (typeof el === 'number') {
                top = el + offset;
            }
            else {
                if (el === 'top') {
                    top = 0 + offset;
                }
                else if (el === 'bottom') {
                    top = document.body.scrollHeight - document.body.clientHeight + offset;
                }
                else {
                    top = document.querySelector(el) && document.querySelector(el).offsetTop + offset;
                }
            }
            var scroll = function () {
                scrollTop = scrollTop + (top - scrollTop) / speed;
                if (Math.abs(scrollTop - top) <= 1) {
                    document.scrollingElement.scrollTop = top;
                    callback && callback();
                    return;
                }
                document.scrollingElement.scrollTop = scrollTop;
                requestAnimationFrame(scroll);
            };
            scroll();
        },
    }
});
//-----------------------Layout-----------------------
// ud-arrow：CSS箭頭
Vue.component('ud-arrow', {
    name: "UdArrow",
    template: "\n    <i \n      class=\"ud-arrow\"\n      :class=[direction]\n      :style=\"{\n        'border-color': color,\n        'border-width': '0 ' + width + 'px ' + width + 'px 0',\n        padding: size + 'px'\n      }\">\n    </i>\n  ",
    props: {
        color: { default: "#333" },
        width: { default: "3" },
        size: { default: "3" },
        direction: { default: "right" } //方向
    }
});
// ud-collapse：摺疊容器
Vue.component('ud-collapse', {
    name: "UdCollapse",
    template: "\n    <div class=\"ud-collapse\" :style=\"{'transition-duration': durationSecond}\">\n      <div class=\"ud-collapse-wrapper\">\n        <slot></slot>\n      </div>\n    </div>\n  ",
    props: {
        value: {
            default: false
        },
        duration: { default: 0.2 } // 開闔速度
    },
    computed: {
        durationSecond: function () {
            return this.duration + "s";
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.collapse();
                });
            }
        }
    },
    methods: {
        collapse: function () {
            var el = this.$el;
            if (this.value) {
                el.style.height = el.querySelector('.ud-collapse-wrapper').clientHeight + "px";
            }
            else {
                el.style.height = 0;
            }
        }
    }
});
// ud-image：等比例自適應容器
Vue.component('ud-image', {
    name: "UdImage",
    template: "\n    <div class=\"ud-image\">\n      <div class=\"ud-image-bg\" :style=\"{\n        backgroundImage: 'url(' + src + ')', \n        paddingBottom: height + '%', \n        borderRadius: radius,\n        backgroundSize: bgSize\n      }\">\n        <slot></slot>\n      </div>\n    </div>\n  ",
    props: {
        src: { default: "https://i.imgur.com/s3w1Sm3.jpg" },
        height: { default: 100 },
        radius: { default: '0px' },
        bgSize: { default: "cover" } // 背景尺寸 (cover, contain, 100%...等)
    }
});
//-----------------------Notice-----------------------
// ud-alert：警告彈窗
var UdAlert = {
    name: "UdAlert",
    template: "\n    <transition name=\"fade\">\n      <div class=\"ud-alert\" v-if=\"isShow\" @click.self=\"maskHandler\">\n        <div class=\"ud-modal-wrapper\">\n          <div class=\"ud-modal-close\" v-if=\"btnClose\" @click=\"destroy\">\n            <i class=\"icon-close\"></i>\n          </div>\n          <div class=\"ud-modal-header\" v-if=\"title\">\n            <p v-html=\"nl2br(title)\"></p>\n          </div>\n          <div class=\"ud-modal-body\">\n            <p v-html=\"nl2br(message)\"></p>\n          </div>\n          <div class=\"ud-modal-footer\">\n            <ud-button @click=\"cancelHandler\" plain v-if=\"confirm\">{{ cancelText }}</ud-button>\n            <ud-button @click=\"confirmHandler\">{{ confirmText }}</ud-button>\n          </div>\n        </div>\n      </div>\n    </transition>\n  ",
    data: function () {
        return {
            isShow: false,
            confirm: false,
            maskClose: false,
            btnClose: false,
            scrollLock: true,
            title: "",
            message: "",
            cancelText: "取消",
            onCancel: function () { },
            confirmText: "確定",
            onConfirm: function () { },
            resolve: "",
            reject: "",
        };
    },
    mounted: function () {
        if (this.scrollLock)
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        if (this.scrollLock)
            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        if (this.message === "")
            this.message = this.msg;
    },
    methods: {
        show: function () {
            var _this = this;
            this.isShow = true;
            return new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
        },
        nl2br: function (val) {
            return nl2br(val);
        },
        confirmHandler: function () {
            this.onConfirm();
            this.resolve('confirm');
            this.destroy();
        },
        cancelHandler: function () {
            this.onCancel();
            this.reject('cancel');
            this.destroy();
        },
        maskHandler: function () {
            if (this.maskClose)
                this.destroy();
        },
        destroy: function () {
            var _this = this;
            this.isShow = false;
            if (this.scrollLock)
                document.getElementsByTagName('body')[0].style.overflow = 'auto';
            setTimeout(function () {
                _this.$destroy(true);
                _this.$el.parentNode.removeChild(_this.$el);
            }, 200);
        },
    }
};
var udAlertExtend = Vue.extend(UdAlert);
var udAlert = function (options) {
    var instance = new udAlertExtend();
    typeof options === 'string' || typeof options === 'number' ? instance.message = options : Object.assign(instance, options);
    document.body.appendChild(instance.$mount().$el);
    return instance.show();
};
Vue.prototype.udAlert = udAlert;
// ud-modal：通用彈窗
Vue.component("ud-modal", {
    name: "UdModal",
    template: "\n    <transition name=\"fade\">\n      <div class=\"ud-modal\" v-if=\"isShow\" @click.self=\"maskHandler\" :class=\"{ 'full-screen': fullScreen }\" :style=\"{ zIndex: zIndex }\">\n        <div class=\"ud-modal-wrapper\" :class=\"{ 'no-bg': noBg }\">\n          <div class=\"ud-modal-close\" v-if=\"btnClose\" @click=\"isShow = 0\">\n            <i class=\"icon-close\"></i>\n          </div>\n          <div class=\"ud-modal-header\" v-if=\"!$slots.default\">\n            <p>{{ title }}</p>\n          </div>\n          <div class=\"ud-modal-body\">\n            <p v-if=\"!$slots.default\">{{ message }}</p>\n            <slot></slot>\n          </div>\n          <div class=\"ud-modal-footer\" v-if=\"!$slots.default\">\n            <div class=\"button-area\">\n              <ud-button @click=\"isShow = 0\">\u78BA\u8A8D</ud-button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </transition>\n  ",
    props: {
        title: { default: "通用標題" },
        message: { default: "通用訊息" },
        value: { default: 0 },
        maskClose: Boolean,
        btnClose: Boolean,
        fullScreen: Boolean,
        zIndex: { default: 100 },
        noBg: Boolean // 背景是否透明
    },
    computed: {
        isShow: {
            get: function () { return this.value; },
            set: function (val) { this.$emit('input', val); }
        }
    },
    methods: {
        maskHandler: function () {
            if (this.maskClose)
                this.isShow = 0;
        },
    }
});
// ud-loading：載入中
var UdLoading = {
    name: "UdLoading",
    template: "\n    <transition name=\"loading\">\n      <div class=\"ud-loading\" v-show=\"isShow\" :class=\"{'theme-white': theme === 'white'}\">\n        <div class=\"ud-modal-wrapper\">\n          <div class=\"ud-modal-content\">\n            <div class=\"ud-modal-header\">\n              <div v-if=\"iconType === 'css'\" class=\"icon-css\"></div>\n              <i v-else-if=\"iconType === 'font'\" class=\"icon-font\" :class=\"iconFont\"></i>\n              <img v-else class=\"icon-img\" :src=\"iconImg\">\n            </div>\n            <div class=\"ud-modal-body\">\n              <p v-html=\"nl2br(message)\"></p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </transition>\n  ",
    data: function () {
        return {
            isShow: false,
            fixed: false,
            theme: "",
            iconType: "css",
            iconFont: "fas fa-spinner fa-pulse",
            iconImg: "https://image.flaticon.com/icons/svg/553/553265.svg",
            message: "",
        };
    },
    mounted: function () {
        this.isShow = true;
    },
    methods: {
        nl2br: function (val) {
            return nl2br(val);
        },
        destroy: function () {
            var _this = this;
            this.isShow = false;
            document.body.style.overflowY = 'auto';
            setTimeout(function () {
                _this.$destroy(true);
                _this.$el.parentNode.removeChild(_this.$el);
            }, 200);
        },
    }
};
var udLoadingExtend = Vue.extend(UdLoading);
var udLoading = {
    instance: null,
    open: function (options) {
        if (options === void 0) { options = {}; }
        udLoading.instance = new udLoadingExtend({
            el: document.createElement("div"),
            data: function () { return options; }
        });
        if (udLoading.instance.fixed)
            document.body.style.overflowY = 'hidden';
        document.body.appendChild(udLoading.instance.$el);
    },
    close: function () { return udLoading.instance.destroy(); }
};
Vue.prototype.udLoading = udLoading;
//-----------------------Tools-----------------------
// ud-html：自定義訊息
Vue.component('ud-html', {
    name: "UdHtml",
    template: "\n    <div class=\"ud-html\" v-html=\"nl2br(text)\"></div>\n  ",
    props: {
        text: { default: "<h1>H1 用戶自定義訊息</h1><h2>H2 用戶自定義訊息</h2><h3>H3 用戶自定義訊息</h3><h4>H4 用戶自定義訊息</h4><h5>H5 用戶自定義訊息</h5><h6>H6 用戶自定義訊息</h6>\n<p>p 用戶自定義訊息</p><span>span 用戶自定義訊息</span>" } // 文字
    },
    methods: {
        nl2br: function (str, is_xhtml) {
            if (typeof str === 'undefined' || str === null) {
                return '';
            }
            var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        }
    }
});
// ud-ellipsis：文字省略
Vue.component('ud-ellipsis', {
    name: "UdEllipsis",
    template: "\n    <p class=\"ud-ellipsis\" :style=\"{webkitLineClamp: maxLine}\">\n      <slot></slot>\n    </p>\n  ",
    props: {
        maxLine: { default: 1, } // 指定省略行數
    }
});
// ud-countdown：倒數計時
Vue.component('ud-countdown', {
    name: "UdCountdown",
    template: "\n    <span class=\"ud-countdown\" ref=\"count\">{{formatCountTime}}</span>\n  ",
    props: {
        time: { default: 60 },
        delay: Boolean,
        type: { default: "second" } // 時間格式
    },
    data: function () {
        return {
            countInterval: {},
            countTime: this.time
        };
    },
    computed: {
        formatCountTime: function () {
            if (this.type === "second") {
                return this.countTime;
            }
            else if (this.type === "minute") {
                var min = Math.floor(this.countTime / 60);
                var sec = this.countTime - (min * 60);
                return min + ":" + padStart(sec);
            }
        }
    },
    mounted: function () {
        if (!this.delay)
            this.countdown();
    },
    methods: {
        countdown: function () {
            var _this = this;
            this.countInterval = setInterval(function () {
                _this.countTime -= 1;
                if (_this.countTime <= 0) {
                    _this.$emit("timeup");
                    clearInterval(_this.countInterval);
                }
            }, 1000);
        },
        reset: function () {
            clearInterval(this.countInterval);
            this.countTime = this.time;
            this.countdown();
        }
    }
});
//-----------------------String-----------------------
/**
 * 將字串內換行符\n轉為<br>
 * @param {string} val 傳入值
 * @param {boolean} is_xhtml 是否為xhtml 預設為false
 */
var nl2br = function (val, is_xhtml) {
    if (val === void 0) { val = ''; }
    if (is_xhtml === void 0) { is_xhtml = false; }
    if (val == null)
        return val;
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (val + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};
/**
 * 取得隨機字串
 * @param {number} length 指定字串長度 預設為10
 */
var getRandomString = function (length) {
    if (length === void 0) { length = 10; }
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var temp = "";
    for (var i = 0; i < length; i++) {
        temp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return temp;
};
/**
 * 複製文字至剪貼簿
 * @param {string} text 要複製的文字
 * @example copyText("要複製的文字").then(res => udAlert(`已複製\n${ res }`));
 */
var copyText = function (text) {
    if (text === void 0) { text = ""; }
    return new Promise(function (resolve, reject) {
        // 使用瀏覽器的 Clipboard API 進行文字複製
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            return navigator.clipboard.writeText(text)
                .then(function () {
                resolve(text);
            })
                .catch(function (err) {
                console.log("複製失敗: ", err);
                reject(err);
            });
        }
        else {
            // 瀏覽器不支援 Clipboard API，使用 fallback 方法
            var textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand('copy');
                resolve(text);
            }
            catch (err) {
                console.log("複製失敗: ", err);
                reject(err);
            }
            finally {
                document.body.removeChild(textarea);
            }
        }
    });
};
//-----------------------Number-----------------------
/**
 * 取得範圍內隨機整數
 * @param {number} min 隨機數最小值 預設為0
 * @param {number} max 隨機數最大值 預設為100
 * @example getRandom(5, 10) -> 7
 */
var getRandom = function (min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * 數字加入千分位逗號
 * @param {number} val 傳入值
 * @example formatNumber(99999) -> 99,999
 */
var formatNumber = function (val) {
    if (val == null)
        return val;
    var temp = val.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(temp)) {
        temp = temp.replace(pattern, "$1,$2");
    }
    return temp;
};
/**
 * 數字補零
 * @param {number|string} val 傳入值
 * @param {number} length 要補到幾位 預設為2
 * @param {number|string} string 要補的值 預設為0
 * @example padStart(5) -> '05'
 * @example padStart(5, 4) -> '0005'
 * @example padStart(5, 4, 2) -> '2225'
 */
var padStart = function (val, length, string) {
    if (length === void 0) { length = 2; }
    if (string === void 0) { string = 0; }
    if (val == null)
        return val;
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(typeof padString !== 'undefined' ? padString : ' ');
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length);
                }
                return padString.slice(0, targetLength) + String(this);
            }
        };
    }
    return val.toString().padStart(length, string);
};
//-----------------------Image-----------------------
/**
 * 單張圖片載入完成
 * @param {string} url 圖片路徑
 * @example imageLoaded('imgUrl').then(...) -> 圖片讀取完成時返回該Image物件
 */
var imageLoaded = function (url) {
    var img = new Image();
    img.src = url;
    return new Promise(function (resolve, reject) {
        if (img.complete) {
            resolve(img);
        }
        else {
            img.onload = function () { return resolve(img); };
            img.onerror = function (e) { return reject(e); };
        }
    });
};
/**
 * 多張圖片載入完成
 * @param {array} arr 多張圖片路徑陣列
 * @example imageAllLoaded(['imgUrl1','imgUrl2']).then(...) -> 全部圖片都讀取完成時返回該Image物件組成的陣列
 */
var imageAllLoaded = function (arr) {
    var result = [];
    arr.forEach(function (item) {
        result.push(imageLoaded(item));
    });
    return new Promise(function (resolve, reject) {
        Promise.all(result)
            .then(function (res) { return resolve(res); })
            .catch(function (err) { return reject(err); });
    });
};
/**
 * 下載Img圖片
 * @param {string} selector 圖片元素選擇器
 * @param {string} name 圖片名稱 預設為'下載圖片'
 * @example imageDownload('#image', '自訂圖片名稱')
 */
var imageDownload = function (selector, name) {
    if (name === void 0) { name = '下載圖片'; }
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); // 解決跨域 Canvas 污染問題
    image.src = document.querySelector(selector).src;
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL('image/jpg');
        var a = document.createElement('a');
        var event = new MouseEvent('click');
        a.download = name;
        a.href = url;
        a.dispatchEvent(event);
    };
};
//-----------------------Array-----------------------
/**
 * 陣列是否有重複值(不分型別)
 * @param {array} arr 傳入值
 * @example isArrayRepeat([1, 2, 2, 3]) -> true
 */
var isArrayRepeat = function (arr) {
    if (arr == null)
        return arr;
    var obj = {};
    for (var i in arr) {
        if (obj[arr[i]])
            return true;
        obj[arr[i]] = true;
    }
    return false;
};
/**
 * 移除陣列中的重複元素
 * @param {array} arr 傳入值
 * @example removeArrayRepeat([1, 2, 2, 3]) -> [1, 2, 3]
 */
var removeArrayRepeat = function (arr) {
    if (arr == null)
        return arr;
    var newArr = arr.filter(function (el, i, arr) { return arr.indexOf(el) === i; });
    return newArr;
};
/**
 * 返回陣列中某值的所有索引
 * @param {array} arr 傳入值
 * @param {number} val 指定值
 * @example indexOfAll([1, 2, 3, 1, 2, 3], 1); -> [0,3]
 * @example indexOfAll([1, 2, 3], 4); -> []
 */
var indexOfAll = function (arr, val) {
    if (arr == null)
        return arr;
    return arr.reduce(function (acc, el, i) { return (el === val ? acc.concat([i]) : acc); }, []);
};
//-----------------------Object-----------------------
/**
 * 精準型別判斷
 * @param {any} val 傳入值
 * @example typeOf(true); -> boolean;
 * @example typeOf(123); -> number;
 * @example typeOf([1, 2, 3]); -> array;
 */
var typeOf = function (val) {
    return val === undefined ? 'undefined' : val === null ? 'null' : val.constructor.name.toLowerCase();
};
/**
 * 深拷貝
 * @param {object} obj 傳入值
 */
var deepClone = function (obj, hash) {
    if (hash === void 0) { hash = new WeakMap(); }
    if (obj == null)
        return obj;
    if (obj instanceof RegExp)
        return new RegExp(obj);
    if (obj instanceof Date)
        return new Date(obj);
    if (obj instanceof Error)
        return new Error(obj);
    if (typeof obj !== 'object')
        return obj;
    if (hash.get(obj))
        return hash.get(obj);
    var cloneObj = new obj.constructor;
    hash.set(obj, cloneObj);
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            cloneObj[key] = deepClone(obj[key], hash);
    }
    return cloneObj;
};
/**
 * 物件key重命名
 * @param {object} obj 傳入值
 * @param {object} keys 想要重命名的key組成的物件
 * @example renameKeys(obj, { line_uid: "lineUid", is_past: "isPast" });
 */
var renameKeys = function (obj, keys) {
    return Object.keys(obj).reduce(function (acc, key) {
        return (__assign({}, acc, (_a = {}, _a[keys[key] || key] = obj[key], _a)));
        var _a;
    }, {});
};
//-----------------------Time-----------------------
/**
 *  判斷日期是否存在
 * @param {string} date 日期字串
 * @param {string} split 分割符 預設為"-"
 * @example isExistDate("2020-02-29"); -> true
 * @example isExistDate("2019/02/29", "/"); -> false
 */
var isExistDate = function (date, split) {
    if (split === void 0) { split = "-"; }
    if (date == null)
        return date;
    var dateArr = date.split(split);
    var limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var theYear = parseInt(dateArr[0]);
    var theMonth = parseInt(dateArr[1]);
    var theDay = parseInt(dateArr[2]);
    var isLeap = new Date(theYear, 1, 29).getDate() === 29;
    if (isLeap)
        limitInMonth[1] = 29;
    return theDay > 0 && theDay <= limitInMonth[theMonth - 1];
};
/**
 * 取得前後幾天的日期
 * @param {number} days 指定天數 可為負值
 * @example getDiffDate(1); -> "2020-07-01"
 * @example getDiffDate(0); -> "2020-06-30"
 * @example getDiffDate(-2); -> "2020-06-28"
 */
var getDiffDate = function (days) {
    if (days === void 0) { days = 0; }
    var t = new Date();
    t.setDate(t.getDate() + days);
    return t.toISOString().split('T')[0];
};
/**
 * 時間格式化
 * @param {any} date 傳入值(Date物件、timestamp或任何合法時間格式)
 * @param {string} format 轉換格式 預設值為'yyyy-MM-dd hh:mm:ss'
 * @example formatTime(new Date(), 'yyyyMMdd') -> "20210726"
 * @example formatTime(new Date(), 'yyyy-MM-dd') -> "2021-07-26"
 * @example formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss') -> "2021-07-26 14:08:00"
 * @example formatTime(new Date(1627280134101), 'yyyy-MM-dd hh:mm:ss') -> "2021-07-26 14:15:34"
 */
var formatTime = function (date, format) {
    if (date === void 0) { date = new Date(); }
    if (format === void 0) { format = "yyyy-MM-dd hh:mm:ss"; }
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "H+": date.getHours(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
//-----------------------DOM-----------------------
/**
 * 滾動至指定位置
 * @param {string|number} el 滾動位置('top': 頂部, 'bottom': 底部, '.foobar': 元素, 300: 像素)
 * @param {number} speed 滾動時間(瞬移為1,請勿設為0)
 * @param {number} offset 自定偏移(可接受正負數字)
 * @param {function} callback 回調函式
 * @example scrollToTarget(); -> 滾動回項部
 * @example scrollToTarget('top', 1); -> 瞬間回項部
 * @example scrollToTarget('.foobar', 10, -30, () => {console.log('滾動完成')});
 */
var scrollToTarget = function (el, speed, offset, callback) {
    if (el === void 0) { el = "top"; }
    if (speed === void 0) { speed = 5; }
    if (offset === void 0) { offset = 0; }
    if (callback === void 0) { callback = function () { }; }
    var scrollTop = document.scrollingElement.scrollTop;
    var top = 0;
    if (typeof el === 'number') {
        top = el + offset;
    }
    else {
        if (el === 'top') {
            top = 0 + offset;
        }
        else if (el === 'bottom') {
            top = document.body.scrollHeight - document.body.clientHeight + offset;
        }
        else {
            top = document.querySelector(el) && document.querySelector(el).offsetTop + offset;
        }
    }
    var scroll = function () {
        scrollTop = scrollTop + (top - scrollTop) / speed;
        if (Math.abs(scrollTop - top) <= 1) {
            document.scrollingElement.scrollTop = top;
            callback && callback();
            return;
        }
        document.scrollingElement.scrollTop = scrollTop;
        requestAnimationFrame(scroll);
    };
    scroll();
};
/**
 * 取得頁面當前捲動長寬度
 * @param {string} type 類型(width: 寬度, height: 高度)
 */
var getPageScroll = function (type) {
    if (type === void 0) { type = 'height'; }
    if (type === 'width') {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    }
    if (type === 'height') {
        var bodyTop = 0;
        if (typeof window.pageYOffset != "undefined") {
            bodyTop = window.pageYOffset;
        }
        else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") {
            bodyTop = document.documentElement.scrollTop;
        }
        else if (typeof document.body != "undefined") {
            bodyTop = document.body.scrollTop;
        }
        return bodyTop;
    }
};
/**
 * 取得頁面尺寸
 * @param {string} scope 範圍(view: 可視頁面, full: 完整頁面)
 */
var getPageSize = function (scope) {
    if (scope === void 0) { scope = 'view'; }
    var el = document.compatMode == "BackCompat" ? document.body : document.documentElement;
    if (scope === 'view') {
        return [el.clientWidth, el.clientHeight];
    }
    if (scope === 'full') {
        return [
            Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, el.clientWidth),
            Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, el.clientHeight)
        ];
    }
};
//-----------------------Verify-----------------------
/**
 * 常用驗證函式
 * @param {any} val 傳入值
 * @param {string|regex} type 驗證類型(可接受正則表達式)
 * @example isVerify('1988-05-27', 'date') -> true
 * @example isVerify('ABC', /[A-Z]/) -> true
 */
var isVerify = function (val, type) {
    if (val == null)
        return val;
    switch (type) {
        // 姓名驗證
        case "name":
            return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(val);
        // 電話驗證
        case "phone":
            return /^09[0-9]{8}$/.test(val);
        // 電子郵件驗證
        case "email":
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
        // 統一編號驗證
        case "uniform":
            return /^[0-9]{8}$/.test(val);
        // 身分證字號驗證
        case "idcard":
            return /^[A-Z](1|2)[0-9]{8}$/.test(val);
        // 日期驗證
        case "date":
            return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(val);
        // 數字驗證
        case "number":
            return !/^[0-9]+$/.test(val);
        // 網址驗證
        case "url":
            return new RegExp("^(https?:\\/\\/)?" + // protocol
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                "(\\#[-a-z\\d_]*)?$", // fragment locator
            "i").test(val);
        // IP地址驗證
        case "ip":
            return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val);
        // Hex色碼驗證
        case "hex":
            return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(val);
        // 身分證字號驗證
        case "id":
            var letters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O');
            var multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
            var nums = new Array(2);
            var firstChar = void 0;
            var firstNum = void 0;
            var lastNum = void 0;
            var total = 0;
            var regExpID = /^[a-z](1|2)\d{8}$/i;
            if (val.search(regExpID) == -1) {
                return false;
            }
            else {
                firstChar = val.charAt(0).toUpperCase();
                lastNum = val.charAt(9);
            }
            for (var i = 0; i < 26; i++) {
                if (firstChar == letters[i]) {
                    firstNum = i + 10;
                    nums[0] = Math.floor(firstNum / 10);
                    nums[1] = firstNum - (nums[0] * 10);
                    break;
                }
            }
            for (var i = 0; i < multiply.length; i++) {
                if (i < 2) {
                    total += nums[i] * multiply[i];
                }
                else {
                    total += parseInt(val.charAt(i - 1)) * multiply[i];
                }
            }
            if ((10 - (total % 10)) != lastNum) {
                return false;
            }
            return true;
        // 正則表達式驗證
        default:
            var regexMode = new RegExp(type);
            return regexMode.test(val);
    }
};
/**
 * 精準數字驗證
 * @param {any} val 傳入值
 */
var isNumber = function (val) {
    return typeOf(val) !== "number" ? false : !isNaN(val);
};
/**
 * 未填入驗證
 * @param {any} val 傳入值
 */
var isEmpty = function (val) {
    switch (typeOf(val)) {
        case "string":
            return (val.trim().length === 0) ? true : false;
        case "number":
            return false;
        case "boolean":
            return val ? false : true;
        case "array":
            if (val.length === 0)
                return true;
            return val.some(function (i) { return i.length === 0; }) ? true : false;
        case "object":
            return false;
        case "null":
            return true;
        case "undefined":
            return true;
        default:
            return false;
    }
};
//-----------------------Web-----------------------
/**
 * 函式防抖
 * @description 將幾次操作合併為一次操作進行
 * @param {function} fn 處理函式
 * @param {number} wait 停止後等待時間 預設為200ms
 * @example window.addEventListener('scroll', debounce(() => console.log("debounce"), 500));
 */
var debounce = function (fn, wait) {
    if (wait === void 0) { wait = 200; }
    var timeout = null;
    return function () {
        if (timeout !== null)
            clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
};
/**
 * 函式節流
 * @description 一定時間內只觸發一次函式
 * @param {function} fn 處理函式
 * @param {number} delay 處理間隔時間 預設為1000ms
 * @example window.addEventListener('scroll', throttle(() => console.log("throttle"), 2000));
 */
var throttle = function (fn, delay) {
    if (delay === void 0) { delay = 1000; }
    var prev = Date.now();
    return function () {
        var context = _this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            fn.apply(context, args);
            prev = Date.now();
        }
    };
};
/**
 * 查詢網址所帶參數
 * @param {string} query 參數
 * @param {string} url 網址
 * @example queryString("id", "https://foo?id=123") -> "123"
 */
var queryString = function (query, url) {
    if (query === void 0) { query = ""; }
    if (url === void 0) { url = location.href; }
    var parseUrl = new URL(url);
    return parseUrl.searchParams.get(query);
};
/**
 * 判斷是否移動裝置
 * @param {string} os 作業系統('': 所有機型, apple: 蘋果, android: 安卓)
 */
var isMobile = function (os) {
    if (os === void 0) { os = ""; }
    switch (os) {
        case 'apple':
            return /iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase());
        case 'android':
            return /android/i.test(navigator.userAgent.toLowerCase());
        default:
            return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase());
    }
};
//# sourceMappingURL=ud-modules.js.map