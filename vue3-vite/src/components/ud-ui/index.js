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
*/

// import udAxios from '@/services/ud-axios'
import * as udUtils from '@/utils/ud-utils'

import UdAlert from "./UdAlert.vue"
import UdArrow from "./UdArrow.vue"
import UdButton from "./UdButton.vue"
import UdCaptcha from "./UdCaptcha.vue"
import UdCheckbox from "./UdCheckbox.vue"
import UdCollapse from "./UdCollapse.vue"
import UdCountdown from "./UdCountdown.vue"
import UdDatePicker from "./UdDatePicker.vue"
import UdEllipsis from "./UdEllipsis.vue"
import UdForm from "./UdForm.vue"
import UdFormItem from "./UdFormItem.vue"
import UdHtml from "./UdHtml.vue"
import UdInput from "./UdInput.vue"
import UdLoading from "./UdLoading.vue"
import UdModal from "./UdModal.vue"
import UdRadio from "./UdRadio.vue"
import UdRatio from "./UdRatio.vue"
import UdSelect from "./UdSelect.vue"
import UdSelectMultiple from "./UdSelectMultiple.vue"
import UdSelectDate from "./UdSelectDate.vue"
import UdSelectLink from "./UdSelectLink.vue"
import UdSelectTwzip from "./UdSelectTwzip.vue"
import UdSwitch from "./UdSwitch.vue"
import UdTextarea from "./UdTextarea.vue"

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
  UdForm,
  UdFormItem,
  UdHtml,
  UdInput,
  UdLoading,
  UdModal,
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
// const udAlertExtend = Vue.extend(UdAlert);
// const udAlert = options => {
//   let instance = new udAlertExtend();
//   typeof options === 'string' ? instance.msg = options : Object.assign(instance, options);
//   document.body.appendChild(instance.$mount().$el);
//   return instance.show();
// };
// export { udAlert }

// const udLoadingExtend = Vue.extend(UdLoading);
// const udLoading = {
//   instance: null,
//   open: (options = {}) => {
//     udLoading.instance = new udLoadingExtend({
//       el: document.createElement("div"),
//       data() { return options }
//     })
//     if(udLoading.instance.fixed) document.body.style.overflowY = 'hidden';
//     document.body.appendChild(udLoading.instance.$el);
//   },
//   close: () => udLoading.instance.destroy()
// };
// export { udLoading }

// ud-ui插件註冊方法
const install = (app) => {
  Object.keys(udUtils).forEach(item => app.config.globalProperties[item] = udUtils[item]);
  udComponents.forEach(item => app.component(item.name, item));
  // app.config.globalProperties.udAxios = udAxios;
  // app.config.globalProperties.udAlert = udAlert;
  // app.config.globalProperties.udLoading = udLoading;
}

export default install;