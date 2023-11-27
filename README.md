# ud-modules 文件

# Form
## Button 按鈕 ud-button
### props
  * icon：CSS的icon，直接帶入class
    ``` html
    <ud-button icon="el-icon-refresh">按鈕</ud-button> <!-- element ui icon -->
    <ud-button icon="bi bi-apple">按鈕</ud-button> <!-- bootstrap icon -->
    <ud-button icon="fa-solid fa-poo">按鈕</ud-button> <!-- font awesome icon -->
    ```
  * image：圖片的icon，直接帶入圖片url
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
  * loading：載入中，預設為false
    ``` html
    <ud-button loading>按鈕</ud-button> 
    ```
  * disabled：禁止點擊，預設為false
    ``` html
    <ud-button disabled>按鈕</ud-button> 
    ```
  * plain：線條化，預設為false
    ``` html
    <ud-button plain>按鈕</ud-button> 
    ```
  * round：圓角，預設為false
    ``` html
    <ud-button round>按鈕</ud-button> 
    ```
  * circle：圓型，預設為false
    ``` html
    <ud-button circle>按鈕</ud-button> 
    ```
  * throttle：函式節流，幾秒內最多觸發一次，預設為false
    ``` html
    <ud-button throttle @click="test">按鈕</ud-button> 
    ```
  * throttleTime：函式節流間隔時間(ms)，預設為1000
    ``` html
    <ud-button throttle :throttle-time="2000" @click="test">按鈕</ud-button> 
    ```

## Input 輸入框 ud-input
### props
  * icon：CSS的icon，直接帶入class
    ``` html
    <ud-button icon="el-icon-refresh">按鈕</ud-button> <!-- element ui icon -->
    <ud-button icon="bi bi-apple">按鈕</ud-button> <!-- bootstrap icon -->
    <ud-button icon="fa-solid fa-poo">按鈕</ud-button> <!-- font awesome icon -->
    ```

## InputPhone 電話號碼連動輸入框 ud-input-phone

## Textarea 多行輸入框 ud-textarea

## Radio 單選框 ud-radio

## Checkbox 多選框 ud-checkbox

## Select 下拉框 ud-select

## SelectMultiple 下拉複選框 ud-select-multiple

## SelectLink 連動下拉框 ud-select-link

## SelectDate 日期連動下拉框 ud-select-date

## SelectTwzip 台灣行政區連動下拉框 ud-select-twzip

## Switch 開關 ud-switch

## DatePicker 日期選擇器 ud-date-picker

## Captcha 圖形驗證碼 ud-captcha

## FormItem 表單驗證容器 ud-form-item

## Form 表單驗證 ud-form

#Layout
## Arrow CSS箭頭 ud-arrow
``` html
<ud-arrow width="5" size="6" direction="down">
```
## Collapse 摺疊容器 ud-collapse

## Ratio 等比例自適應容器 ud-ratio

#Notice
## Alert 警告彈窗 ud-alert
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

## Modal 通用彈窗 ud-modal

## Loading 載入中 ud-loading

#Tools
## Html 自定義訊息 ud-html

## Ellipsis 文字省略 ud-ellipsis

## Countdown 倒數計時 ud-countdown