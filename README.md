# ud-modules 文件

# Form 表單
## <font color=#ebc600>Button 按鈕 ud-button</font>
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

## <font color=#ebc600>Input 輸入框 ud-input</font>
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

## <font color=#ebc600>Textarea 多行輸入框 ud-textarea</font>
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

## <font color=#ebc600>Radio 單選框 ud-radio</font>
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

## <font color=#ebc600>Checkbox 多選框 ud-checkbox</font>
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

## <font color=#ebc600>Select 下拉框 ud-select</font>
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
  將多個獨立的ud-select進行連動
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
  * group: 是否群組(雙向綁定的值所組成的陣列) | Array
  * index: 群組索引(由0開始的數字) | Number
  * labelBy: label替代值 | String("label")
  * valueBy: value替代值 | String("value")
  * childrenBy: children替代值 | String("children")
  ``` html
  <ud-select v-model="valueGroup[0]" :options="storeOptions" :group="valueGroup" :index="0" placeholder="請選擇縣市" label-by="name" value-by="id" children-by="list"></ud-select>
  <ud-select v-model="valueGroup[1]" :options="storeOptions" :group="valueGroup" :index="1" placeholder="請選擇櫃點" label-by="name" value-by="id" children-by="list"></ud-select>
  <ud-select v-model="valueGroup[2]" :options="storeOptions" :group="valueGroup" :index="2" placeholder="請選擇日期" label-by="name" value-by="id" children-by="list"></ud-select>
  ```

## <font color=#ebc600>SelectMultiple 下拉複選框 ud-select-multiple</font>

## <font color=#ebc600>SelectLink 連動下拉框 ud-select-link</font>

## <font color=#ebc600>SelectDate 日期連動下拉框 ud-select-date</font>

## <font color=#ebc600>SelectTwzip 台灣行政區連動下拉框 ud-select-twzip</font>

## <font color=#ebc600>Switch 開關 ud-switch</font>

## <font color=#ebc600>DatePicker 日期選擇器 ud-date-picker</font>

## <font color=#ebc600>Captcha 圖形驗證碼 ud-captcha</font>

## <font color=#ebc600>FormItem 表單驗證容器 ud-form-item</font>

## <font color=#ebc600>Form 表單驗證 ud-form</font>

# Layout
## <font color=#ebc600>Arrow CSS箭頭 ud-arrow</font>
``` html
<ud-arrow width="5" size="6" direction="down">
```
## <font color=#ebc600>Collapse 摺疊容器 ud-collapse</font>

## <font color=#ebc600>Ratio 等比例自適應容器 ud-ratio</font>

# Notice
## <font color=#ebc600>Alert 警告彈窗 ud-alert</font>
  ### options
  * confirm: false 是否有確認+取消鈕
  * maskClose: false 點擊遮罩關閉
  * btnClose: false 右上關閉按鈕
  * scrollLock: true 是否鎖定背景頁面捲動
  * title: "" 標題文字
  * message: "" 訊息文字(msg也可以，接受html語法)
  * cancelText: "取消" 取消鈕文字
  * onCancel: () => {} 取消鈕callback(也可使用.then)
  * confirmText: "確定" 確認鈕文字
  * onConfirm: () => {} 確認鈕callback(也可使用.catch)

  ```js
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

## <font color=#ebc600>Modal 通用彈窗 ud-modal</font>

## <font color=#ebc600>Loading 載入中 ud-loading</font>

# Tools
## <font color=#ebc600>Html 自定義訊息 ud-html</font>

## <font color=#ebc600>Ellipsis 文字省略 ud-ellipsis</font>

## <font color=#ebc600>Countdown 倒數計時 ud-countdown</font>