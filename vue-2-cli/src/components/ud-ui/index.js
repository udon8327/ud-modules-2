/*
==================== Vue組件庫(Basic)目錄 ====================
Form
  ud-button：按鈕
  ud-input：輸入框
  ud-textarea：多行輸入框
  ud-radio：單選框
  ud-checkbox：多選框
  ud-select：下拉框
  ud-select-multiple：下拉多選框
  ud-select-link：連動下拉框
  ud-select-date：日期連動下拉框
  ud-select-twzip：台灣行政區連動下拉框
  ud-switch：開關
  ud-date-picker：日期選擇器
  ud-captcha：圖形驗證碼
  ud-form-item：表單驗證容器
  ud-form：表單驗證

Layout
  ud-flex：通用排版容器
  ud-arrow：CSS箭頭
  ud-collapse：摺疊容器
  ud-ratio：等比例自適應容器

Notice
  ud-alert：警告彈窗
  ud-modal：通用彈窗
  ud-loading：載入中

Tools
  ud-html：用戶自定義訊息
  ud-ellipsis：文字省略
  ud-countdown：倒數計時
  ud-qrcode：取得QRcode圖片
*/

import Vue from 'vue'
import udAxios from '@/services/ud-axios'
import * as udUtils from '@/utils/ud-utils'

import UdAlert from './UdAlert'
import UdArrow from './UdArrow'
import UdButton from "./UdButton"
import UdCaptcha from "./UdCaptcha"
import UdCheckbox from "./UdCheckbox"
import UdCollapse from "./UdCollapse"
import UdCountdown from "./UdCountdown"
import UdDatePicker from "./UdDatePicker"
import UdEllipsis from "./UdEllipsis"
import UdFlex from "./UdFlex"
import UdForm from "./UdForm"
import UdFormItem from "./UdFormItem"
import UdHtml from "./UdHtml"
import UdInput from "./UdInput"
import UdLoading from "./UdLoading"
import UdModal from "./UdModal"
import UdQrcode from "./UdQrcode"
import UdRadio from "./UdRadio"
import UdRatio from "./UdRatio"
import UdSelect from "./UdSelect"
import UdSelectMultiple from "./UdSelectMultiple"
import UdSelectDate from "./UdSelectDate"
import UdSelectLink from "./UdSelectLink"
import UdSelectTwzip from "./UdSelectTwzip"
import UdSwitch from "./UdSwitch"
import UdTextarea from "./UdTextarea"

// 組件註冊列表
const udComponents = [
  UdAlert,
  UdArrow,
  UdButton,
  UdCaptcha,
  UdCheckbox,
  UdCollapse,
  UdCountdown,
  UdDatePicker,
  UdEllipsis,
  UdFlex,
  UdForm,
  UdFormItem,
  UdHtml,
  UdInput,
  UdLoading,
  UdModal,
  UdQrcode,
  UdRadio,
  UdRatio,
  UdSelect,
  UdSelectMultiple,
  UdSelectDate,
  UdSelectLink,
  UdSelectTwzip,
  UdSwitch,
  UdTextarea,
]

// 組件呼叫方法
const udAlertExtend = Vue.extend(UdAlert);
const udAlert = options => {
  let instance = new udAlertExtend();
  typeof options === 'string' ? instance.msg = options : Object.assign(instance, options);
  document.body.appendChild(instance.$mount().$el);
  return instance.show();
};
export { udAlert }

const udLoadingExtend = Vue.extend(UdLoading);
const udLoading = {
  instance: null,
  open: (options = {}) => {
    udLoading.instance = new udLoadingExtend({
      el: document.createElement("div"),
      data() { return options }
    })
    if(udLoading.instance.fixed) document.body.style.overflowY = 'hidden';
    document.body.appendChild(udLoading.instance.$el);
  },
  close: () => udLoading.instance.destroy()
};
export { udLoading }

// ud-ui插件註冊方法
const install = Vue => {
  Object.keys(udUtils).forEach(item => Vue.prototype[item] = udUtils[item]);
  udComponents.forEach(item => Vue.component(item.name, item));
  Vue.prototype.udAxios = udAxios;
  Vue.prototype.udAlert = udAlert;
  Vue.prototype.udLoading = udLoading;
}

export default install;