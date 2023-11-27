# ud-modules 文件

# Form
## <font color=#ebc600>Button 按鈕 ud-button</font>
  ### props
  * icon: CSS的icon，直接帶入class
    ``` html
    <ud-button icon="el-icon-refresh">按鈕</ud-button> <!-- element ui icon -->
    <ud-button icon="bi bi-apple">按鈕</ud-button> <!-- bootstrap icon -->
    <ud-button icon="fa-solid fa-poo">按鈕</ud-button> <!-- font awesome icon -->
    ```
  * image: 圖片的icon，直接帶入圖片url
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
  * loading: 載入中，預設為false
    ``` html
    <ud-button loading>按鈕</ud-button> 
    ```
  * disabled: 禁止點擊，預設為false
    ``` html
    <ud-button disabled>按鈕</ud-button> 
    ```
  * plain: 線條化，預設為false
    ``` html
    <ud-button plain>按鈕</ud-button> 
    ```
  * round: 圓角，預設為false
    ``` html
    <ud-button round>按鈕</ud-button> 
    ```
  * circle: 圓型，預設為false
    ``` html
    <ud-button circle>按鈕</ud-button> 
    ```
  * throttle: 函式節流，幾秒內最多觸發一次，預設為false
    ``` html
    <ud-button throttle @click="test">按鈕</ud-button> 
    ```
  * throttleTime: 函式節流間隔時間(ms)，預設為1000
    ``` html
    <ud-button throttle :throttle-time="2000" @click="test">按鈕</ud-button> 
    ```

## <font color=#ebc600>Input 輸入框 ud-input</font>
  ### props
  * placeholder: 替代文字
    ``` html
    <ud-input v-model="test" center></ud-input>
    ```
  * center: 文字是否置中，預設為false
    ``` html
    <ud-input v-model="test" center></ud-input>
    ```
  ### methods
  * focus: 焦點
    ``` html
    <ud-input ref="input"></ud-input>
    ```
    ``` js
    this.$refs.input.focus();
    ```
  * blur: 離開焦點
    ``` html
    <ud-input ref="input"></ud-input>
    ```
    ``` js
    this.$refs.input.blur();
    ```

## <font color=#ebc600>InputPhone 電話號碼連動輸入框 ud-input-phone</font>

## <font color=#ebc600>Textarea 多行輸入框 ud-textarea</font>

## <font color=#ebc600>Radio 單選框 ud-radio</font>

## <font color=#ebc600>Checkbox 多選框 ud-checkbox</font>

## <font color=#ebc600>Select 下拉框 ud-select</font>

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