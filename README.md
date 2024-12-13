# <font color="aqua">ud-modules 常用組件</font>
## Form
### <font color=#ebc600>ud-button：按鈕</font>
  ``` html
  <ud-button @click="onClick">按鈕</ud-button>
  ```
  ### props
  * icon: CSS的icon，直接帶入class | String
    ``` html
    <ud-button icon="el-icon-refresh">按鈕</ud-button> <!-- element ui icon -->
    <ud-button icon="bi bi-apple">按鈕</ud-button> <!-- bootstrap icon -->
    <ud-button icon="fa-solid fa-poo">按鈕</ud-button> <!-- font awesome icon -->
    ```
  * image: 圖片的icon，直接帶入圖片url | String
    ``` html
    <ud-button image="img/refresh.png">按鈕</ud-button> 
    ```
    也可使用slot(name="icon")插入圖片
    ``` html
    <ud-button>按鈕<img slot="icon" src="img/refresh.png"></ud-button> 
    ```
    或是直接使用slot插入任意內容
    ``` html
    <ud-button>按鈕<div>任意內容</div></ud-button> 
    ```
  * loading: 載入中 | Boolean(false)
  * disabled: 禁止點擊 | Boolean(false)
  * plain: 線條化 | Boolean(false)
  * round: 圓角 | Boolean(false)
  * circle: 圓形 | Boolean(false)
  * throttle: 函式節流，幾秒內最多觸發一次 | Boolean(false)
    ``` html
    <ud-button throttle @click="test">按鈕</ud-button> 
    ```
  * throttleTime: 函式節流間隔時間(ms) | Number(1000)
    ``` html
    <ud-button throttle :throttle-time="2000" @click="test">按鈕</ud-button> 
    ```

### <font color=#ebc600>ud-input：輸入框</font>
  ``` html
  <ud-input v-model="value" placeholder="請輸入文字" center></ud-textarea>
  ```
  ### props
  * placeholder: 替代文字 | String
  * center: 文字是否置中 | Boolean(false)
  ### methods
  * focus: 焦點
    ``` html
    <ud-input ref="target"></ud-input>
    ```
    ``` js
    this.$refs.target.focus();
    ```
  * blur: 離開焦點
    ``` html
    <ud-input ref="target"></ud-input>
    ```
    ``` js
    this.$refs.target.blur();
    ```

### <font color=#ebc600>ud-textarea：多行輸入框</font>
  ``` html
  <ud-textarea v-model="value" placeholder="請輸入文字" :rows="8" show-limit :limit="99" no-resize></ud-textarea>
  ```
  ### props
  * placeholder: 替代文字 | String
  * rows: 預設行數 | Number(4)
  * showLimit: 是否顯示字數限制(與limit併用) | Boolean(false)
  * limit: 字數限制 | Number(null)
  * noResize: 禁止改變大小 | Boolean(false)
  ### methods
  * 同ud-input

### <font color=#ebc600>ud-radio：單選框</font>
  ``` html
  <ud-radio v-model="value" :options="options" flex></ud-radio>
  ```
  ``` js
  options: [
    {label: "選項一", value: "1"},
    {label: "選項二", value: "2"},
    {label: "選項三", value: "3", disabled: true},
  ],
  ```
  ### props
  * options: 選項 | Array
  * flex: 是否並排 | Boolean(false)
  * combine: 使用value做為label | Boolean(false)

### <font color=#ebc600>ud-checkbox：多選框</font>
  多選時v-model需綁定Array
  ``` html
  <ud-checkbox v-model="value" :options="options" flex></ud-checkbox>
  ```
  ``` js
  options: [
    {label: "選項一", value: "1"},
    {label: "選項二", value: "2"},
    {label: "選項三", value: "3", disabled: true},
  ],
  ```
  單選時v-model需綁定Boolean
  ``` html
  <!-- options可帶入字串 -->
  <ud-checkbox v-model="value" options="我同意使用者條款"></ud-checkbox>
  
  <!-- options也可不帶改用slot塞入任意內容 -->
  <ud-checkbox v-model="value">
    <p>我同意<a href="https://www.google.com.tw/">使用者條款</a></p>
  </ud-checkbox>
  ```
  ### props
  * options: 選項 | String、Array
  * flex: 是否並排 | Boolean(false)
  * combine: 使用value做為label | Boolean(false)
  * solid: 打勾改為實心 | Boolean(false)

### <font color=#ebc600>ud-select：下拉框</font>
  單獨一個ud-select
  ``` html
  <ud-select v-model="value" :options="options" placeholder="請選擇櫃點"></ud-select>
  ```
  ``` js
  options: [
    {label: "選項一", value: "1"},
    {label: "選項二", value: "2"},
    {label: "選項三", value: "3", disabled: true},
  ],
  ```
  將多個獨立的ud-select群組起來進行下拉連動
  ``` html
  <ud-select v-model="valueGroup[0]" :options="storeOptions" :group="valueGroup" :index="0" placeholder="請選擇縣市"></ud-select>
  <ud-select v-model="valueGroup[1]" :options="storeOptions" :group="valueGroup" :index="1" placeholder="請選擇櫃點"></ud-select>
  <ud-select v-model="valueGroup[2]" :options="storeOptions" :group="valueGroup" :index="2" placeholder="請選擇日期"></ud-select>
  ```
  ``` js
  data: {
    valueGroup: ["", "", ""],
    storeOptions: [
      {label: "台北市", value: "taipei", children: [
        {label: "中正區", value: "100", children: [
          {label: "2023-12-01", value: "1" },
          {label: "2023-12-02", value: "2", disabled: "true" }
        ]},
        {label: "大安區", value: "106", disabled: true, children: [
          {label: "2023-12-03", value: "3" },
          {label: "2023-12-04", value: "4" },
        ]},
        {label: "信義區", value: "110", children: [
          {label: "2023-12-05", value: "5" },
          {label: "2023-12-06", value: "6" },
        ]},
      ]},
      {label: "新北市", value: "newTaipei", children: [
        {label: "板橋區", value: "220", children: [
          {label: "2023-12-07", value: "7" },
          {label: "2023-12-08", value: "8" },
        ]},
        {label: "永和區", value: "234", children: [
          {label: "2023-12-09", value: "9" },
          {label: "2023-12-10", value: "10", disabled: true },
        ]},
        {label: "新店區", value: "231", children: [
          {label: "2023-12-11", value: "11", disabled: true },
          {label: "2023-12-12", value: "12", disabled: true },
        ]},
      ]},
    ],
  },
  ```
  ### props
  * options: 選項 | Array
  * placeholder: 替代文字 | String
  * combine: 使用value做為label | Boolean(false)
  * center: 文字是否置中 | Boolean(false)
  * group: 組成群組(雙向綁定的值所組成的陣列) | Array
  * index: 群組索引(由0開始的數字) | Number
  * labelBy: label替代值 | String("label")
  * valueBy: value替代值 | String("value")
  * childrenBy: children替代值 | String("children")

### <font color=#ebc600>ud-select-link：連動下拉框</font>
  要做連動下拉已經不建議使用此群組，而是直接將多個ud-select群組起來使用，可以不受數量與DOM的限制
  ``` html
  <ud-select-link v-model="valueGroup" :options="storeOptions" :placeholder="['縣市', '櫃點', '時段']" flex third></ud-select-link>
  ```
  ``` js
  data: {
    valueGroup: ["", "", ""],
    storeOptions: [
      {label: "台北市", value: "taipei", children: [
        {label: "中正區", value: "100", children: [
          {label: "2023-12-01", value: "1" },
          {label: "2023-12-02", value: "2", disabled: "true" } 
        ]},
        {label: "大安區", value: "106", disabled: true, children: [
          {label: "2023-12-03", value: "3" },
          {label: "2023-12-04", value: "4" },
        ]},
        {label: "信義區", value: "110", children: [
          {label: "2023-12-05", value: "5" },
          {label: "2023-12-06", value: "6" },
        ]},
      ]},
      {label: "新北市", value: "newTaipei", children: [
        {label: "板橋區", value: "220", children: [
          {label: "2023-12-07", value: "7" },
          {label: "2023-12-08", value: "8" },
        ]},
        {label: "永和區", value: "234", children: [
          {label: "2023-12-09", value: "9" },
          {label: "2023-12-10", value: "10", disabled: true },
        ]},
        {label: "新店區", value: "231", children: [
          {label: "2023-12-11", value: "11", disabled: true },
          {label: "2023-12-12", value: "12", disabled: true },
        ]},
      ]},
    ],
  },
  ```
  ### props
  * options: 選項 | Array
  * placeholder: 替代文字 | Array
  * third: 是否有第三項 | Boolean(false)
  * flex: 是否並排 | Boolean(false)
  * combine: 使用value做為label | Boolean(false)

### <font color=#ebc600>ud-select-date：日期連動下拉框</font>
  會自動更新年份
  ``` html
  <ud-select-date v-model="formData.date" flex third roc>
    <p>年</p>
    <p slot="second">月</p>
    <p slot="third">日</p>
  </ud-select-date>
  ```
  ### props
  * placeholder: 替代文字 | Array
  * third: 是否有第三項(日) | Boolean(false)
  * flex: 是否並排 | Boolean(false)
  * roc: 是否為民國年 | Boolean(false)

### <font color=#ebc600>ud-select-twzip：台灣行政區連動下拉框</font>
  ``` html
  <ud-select-twzip ref="zip" v-model="formData.twzip" flex></ud-select-twzip>
  ```
  ### props
  * placeholder: 替代文字 | Array
  * flex: 是否並排 | Boolean(false)
  * combine: 是否label直接使用value值 | Boolean(false)

### <font color=#ebc600>ud-switch：開關</font>
  ``` html
  <ud-switch v-model="formData.isActive"></ud-switch>
  ```
  ### props
  * placeholder: 替代文字 | Array
  * flex: 是否並排 | Boolean(false)
  * combine: 是否label直接使用value值 | Boolean(false)

### <font color=#ebc600>ud-captcha：圖形驗證碼</font>
  ``` html
  <ud-input v-model="formData.captcha" placeholder="驗證碼" maxlength="4"></ud-input>
  <ud-captcha v-model="formData.captchaCode"></ud-captcha>
  ```
  ### props
  * color: 字體顏色 | String("#989799")
  * bgColor: 背景顏色 | String("#000")
  * randomColor: 隨機點線的顏色 | String("#777")
  * font: 字體設定 | String("20px Arial")
  * noLine: 無隨機線 | Boolean(false)
  * noDots: 無隨機點 | Boolean(false)
  * noRefresh: 無刷新鈕 | Boolean(false)

### <font color=#ebc600>ud-form-item：表單驗證容器</font>
  ``` html
  <ud-form :rules="rules" :model="formData" ref="form">
    <ud-form-item label="姓名" prop="name" flex>
      <ud-input v-model.trim="formData.name" placeholder="請輸入您的姓名"></ud-input>
    </ud-form-item>
  </ud-form>
  <ud-button @click="formSubmit">送出表單</ud-button>
  ```
  ``` js
  methods: {
    formSubmit() {
      this.$refs.form.validate(() => {
        // 驗證成功後的處理
      });
    },
  }
  ```
  ### props
  * required: 必填提示 | Boolean(false),
  * icon: icon路徑 | String
  * label: 標籤內容 | String
  * prop: 驗證名稱 | String
  * flex: 是否並排 | Boolean(false)
  * labelWidth: 標籤寬度 | String
  * labelAlign: 標籤對齊 | String

### <font color=#ebc600>ud-form：表單驗證</font>
  ``` html
  <ud-form :rules="rules" :model="formData" ref="form">
    <ud-form-item label="姓名" prop="name" flex>
      <ud-input v-model.trim="formData.name" placeholder="請輸入您的姓名"></ud-input>
    </ud-form-item>
  </ud-form>
  <ud-button @click="formSubmit">送出表單</ud-button>
  ```
  ``` js
  methods: {
    formSubmit() {
      this.$refs.form.validate(() => {
        // 驗證成功後的處理
      });
    },
  }
  ```
  ### props
  * model: 驗證資料 | Object
  * rules: 驗證規則 | Object
  * noErrorMsg: 有無錯誤提示 | Boolean(false)
  * noErrorScroll: 驗證時不滾動至錯誤項目 | Boolean(false)

## Layout
### <font color=#ebc600>ud-arrow：CSS箭頭</font>
  ``` html
  <ud-arrow width="5" size="6" direction="down">
  ```
  ### props
  * color: 顏色 | String("#333")
  * width: 寬度 | String("3")
  * size: 大小 | String("3")
  * direction: 方向 | String("right")

### <font color=#ebc600>ud-collapse：摺疊容器</font>
  ``` html
  <ud-button @click="isCollapse = !isCollapse">摺疊容器</ud-button>
    <ud-arrow color="#fff" :size="4" :width="2" :direction="isCollapse ? 'up' : 'down'">
  <ud-collapse v-model="isCollapse" :duration="0.4">
    <p>這是文字</p>
    <p>這是文字</p>
    <p>這是文字</p>
  </ud-collapse>
  ```
  ### props
  * duration: 開闔速度 | Number(0.2)

### <font color=#ebc600>ud-ratio：等比例自適應容器</font>
  ``` html
  <ud-ratio src="img/01.jpg" bg-size="contain"></ud-ratio>
  ```
  ### props
  * duration: 開闔速度 | Number(0.2)

## Notice
### <font color=#ebc600>ud-alert：警告彈窗</font>
  ``` js
  this.udAlert("發生錯誤\n請稍候再試<i>！</i>");
  // or
  this.udAlert({
    confirm: true,
    maskClose: true,
    btnClose: true,
    scrollLock: false,
    title: "錯誤",
    message: "發生錯誤\n請稍候再試<i>！</i>",
    confirmText: "確定鈕",
    onConfirm: () => {
      console.log("點擊確定");
    },
    cancelText: "取消鈕",
  }).catch(() => {
    console.log("點擊取消");
  })
  ```
  ### options
  * confirm: 是否有確認+取消鈕 | Boolean(false)
  * maskClose: 點擊遮罩關閉 | Boolean(false)
  * btnClose: 右上關閉按鈕 | Boolean(false)
  * scrollLock: 是否鎖定背景頁面捲動 | Boolean(true)
  * title: 標題文字 | String("")
  * message: 訊息文字(msg也可以，接受html語法) | String("")
  * cancelText: 取消鈕文字 | String("取消")
  * onCancel: 取消鈕callback(也可使用.then) | Function(() => {})
  * confirmText: 確認鈕文字 | String("確定")
  * onConfirm: () => 確認鈕callback(也可使用.catch) | Function(() => {})

### <font color=#ebc600>ud-modal：通用彈窗</font>
  ``` html
  <ud-modal v-model="isModalShow" mask-close btn-close>
    <ud-button @click="isModalShow = false" plain>關閉</ud-button>
  </ud-modal>
  ```
  ### props
  * title: 通用標題 | String("通用標題")
  * message: 通用訊息 | String("通用訊息")
  * maskClose: 點擊遮罩關閉 | Boolean(false)
  * btnClose: 右上關閉按鈕 | Boolean(false)
  * fullScreen: 是否全螢幕 | Boolean(false)
  * zIndex: z-index層級 | Number(100)
  * noBg: 背景是否透明 | Boolean(false)

### <font color=#ebc600>ud-loading：載入中</font>
  ``` js
  // 開啟Loading效果
  this.udLoading.open({
    fixed: true,
    message: "測試"
  });
  // 關閉Loading效果
  this.udLoading.close();
  ```
  ### options
  * fixed: 是否固定body | Boolean(false)
  * theme: 戴入主題 | String(例："white")
  * iconType: icon類型 | String("css")[css:CSS, font:字型, img:圖片]
  * iconFont: 字型icon的class | String(例："fas fa-spinner fa-pulse")
  * iconImg: 圖片icon的路徑 | String(例："https://image.flaticon.com/icons/svg/553/553265.svg")
  * message: 載入訊息 | String("")

## Tools
### <font color=#ebc600>ud-html：自定義訊息</font>
  ``` html
  <ud-html text="<i>用戶</i>自定\n<h3>義訊息</h3>"></ud-html>
  ```
  ### props
  * text: 文字 | String("可帶入含標籤的HTML字段")

### <font color=#ebc600>ud-ellipsis：文字省略</font>
  超過指定行數的文字不顯示且在最後顯示省略符號
  ``` html
  <ud-ellipsis :max-line="2">這是文字</ud-ellipsis>
  ```
  ### props
  * maxLine: 指定省略行數 | Number(1)

### <font color=#ebc600>ud-countdown：倒數計時</font>
  顯示倒數計時的文字
  ``` html
  <ud-countdown ref="cd" :time="120" @timeup="timeup" type="minute" delay></ud-countdown>
  ```
  ``` js
  methods: {
    timeup() {
      udAlert("時間到！");
    },
    start() {
      this.$refs.cd.countdown();
    },
    reset() {
      this.$refs.cd.reset();
    },
  }
  ```
  ### props
  * time: 倒數秒數 | Number(60)
  * delay: 是否不要立刻開始倒數 | Boolean(1)
  * type: 時間格式 | String("second")["second": 顯示秒, "minute": 顯示分秒]
  ### methods
  * countdown: 開始倒數 | Function(() => {})
  * reset: 重新開始倒數 | Function(() => {})

# <font color="aqua">ud-utils 常用函式</font>
## String
### <font color=#ebc600>nl2br：將字串內換行符\n轉為\<br\></font>
  ``` js
  nl2br(val="這是\n文字");
  ```
  ### options
  * val: 傳入值 | String("")
  * is_xhtml: 是否為xhtml | Boolean(false)

### <font color=#ebc600>getRandomString：取得隨機字串</font>
  ``` js
  getRandomString(:length="15");
  ```
  ### options
  * length: 指定字串長度 | Number(10)