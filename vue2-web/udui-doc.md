# UD-UI Document

#Form
## Button 按鈕 -----> ud-button
### options

### sample
``` html
<ud-button @click="onClick">按鈕</ud-button>
```
---


## Input 輸入框 -----> ud-input
## InputPhone 電話號碼連動輸入框 -----> ud-input-phone
## Textarea 多行輸入框 -----> ud-textarea
## Radio 單選框 -----> ud-radio
## Checkbox 多選框 -----> ud-checkbox
## Select 下拉框 -----> ud-select
## SelectMultiple 下拉複選框 -----> ud-select-multiple
## SelectLink 連動下拉框 -----> ud-select-link
## SelectDate 日期連動下拉框 -----> ud-select-date
## SelectTwzip 台灣行政區連動下拉框 -----> ud-select-twzip
## Switch 開關 -----> ud-switch
## DatePicker 日期選擇器 -----> ud-date-picker
## Captcha 圖形驗證碼 -----> ud-captcha
## FormItem 表單驗證容器 -----> ud-form-item
## Form 表單驗證 -----> ud-form

#Layout
## Arrow CSS箭頭 -----> ud-arrow
## Collapse 摺疊容器 -----> ud-collapse
## Ratio 等比例自適應容器 -----> ud-ratio

#Notice
## Alert 警告彈窗 -----> ud-alert
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

### sample
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
---

## Modal 通用彈窗 -----> ud-modal
## Loading 載入中 -----> ud-loading

#Tools
## Html 自定義訊息 -----> ud-html
## Ellipsis 文字省略 -----> ud-ellipsis
## Countdown 倒數計時 -----> ud-countdown


## 建議環境
* `NPM` v7.19.1
* `Node` v14.15.0
* `Yarn` v1.22.10

---

## 包管理器
* `yarn`

  常用指令：
  ```
  $ yarn 或 yarn install   // 安裝package.json上的所有套件

  $ yarn add [package]   // 安裝套件 後面加上@可指定版本

  $ yarn add [package] -D   // 安裝套件(於devDependencies)

  $ yarn remove [package]  // 移除套件

  $ yarn upgrade   // 更新node-modules
  ```

---

## 預處理語言

https://medium.com/itsems-frontend/adding-pug-sass-to-your-project-a77668123f6b
* `pug`
  ```
  $ vue add pug  // 於vue-cli安裝vue官方pug插件
  ```
  
  以`<template lang="pug"></template>`使用

  線上轉換工具：https://html2pug.vercel.app/
  
  vscode轉換套件：[html2pug](https://marketplace.visualstudio.com/items?itemName=dbalas.vscode-html2pug)

* `sass`

  以`<stype lang="sass"></style>`使用

  目前sass編譯器使用dart-sass

  深層嵌套請使用`::v-deep`或`/deep/`語法

  線上轉換工具：http://css2sass.herokuapp.com/

---
## 使用套件

* [vue](https://cn.vuejs.org/v2/guide/) v2.6.11：漸進式JavaScript框架  

* [vue-router](https://router.vuejs.org/zh/guide/#html) v3.2.0：Vue.js官方的路由管理器

* [vuex](https://router.vuejs.org/zh/guide/#html) v3.4.0：Vue.js應用程式開發的狀態管理模式

* [axios](https://axios-http.com/zh/docs/intro) v0.21.1：處理AJAX請求

* `其他套件可依專案需求自行安裝👌`

---
## 組件與工具

* 組件

  src/components/`ud-ui`：已全域註冊可直接使用的一些常用前端組件，用以快速搭建前端應用，可依專案需求直接修改做客製化，說明文件待補😭

* 工具

  src/utils/`ud-utils`：已全域註冊可直接使用的一些常用工具函式，用以快速搭建前端應用，可依專案需求直接修改做客製化，說明文件待補😭

---

## 專案使用說明

### `前端安裝方式`

 1. 打開git clone下來的專案目錄

 2. 打開終端機輸入下列指令安裝套件

```
$ yarn
```

 3. 複製.env.example範例檔並更名為.env填入專案需要的環境變數

 4. 輸入以下指令開始 Enjoy!

```
$ yarn serve
```
### `前端部署方式`

* 有CICD：

1. 調整/deployment資料夾內的檔案來設定流程

2. 推上git測試或正式分支後便會開始跑自動部署流程

* 無CICD：

1. 需自行打包成dist並放至正確目錄，可新增.env.development和.env.production分別對應開發與生產環境
```
$ yarn build
```

---

## 專案src目錄介紹

* `assets`：靜態資源目錄，放置圖片、影片或字型等靜態資源檔

* `components`：組件目錄，放置非頁面級的單獨vue組件檔

* `router`：前端路由目錄，放置Vue Router路由設定檔

* `services`：api服務目錄，放置與api服務相關的封裝檔

* `store`：Vuex目錄，放置Vuex設定檔

* `style`：樣式目錄，放置css、scss、sass等樣式檔

* `utils`：工具目錄，放置各種工具類函式或資源

* `views`：視圖目錄，放置頁面級的vue視圖組件檔

---

## 關於架構

1. 命名盡量採取`駝峰式`

2. 檔案請依照上述`專案src目錄介紹`的結構分類擺放

3. 如果只有單一個頁面會用到的 **CSS** 請寫在 **Vue** 檔裡，且使用 `<style scoped></style>` 包裝起來，scoped 可防止影響到其他檔案的 **CSS**

4. 路由請按照 **功能分類**，請參照 `src/router/index.js`，將路由以 `import` 方式引入進去，防止日後檔案維護困難

5. 需要組件間通信或維持狀態的資料才使用`Vuex`

---

## 手機開發

由於目前的cookie登入機制會被瀏覽器跨網站追蹤阻擋而導致無限登入，若要於手機上開發請先於手機設定裡暫時允許chrome或safari的跨網站追蹤。
 
## 備註

  感謝您花時間看到這裡！🙏