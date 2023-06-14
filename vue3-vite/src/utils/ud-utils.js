/*
==================== 工具函數目錄 ====================
String
  nl2br：將字串內換行符\n轉為<br>
  getRandomString：取得隨機字串
  copyTextToClipboard：複製文字至剪貼簿

Number
  getRandom：取得範圍內隨機整數
  roundNumber：四捨五入到指定位數
  formatNumber：數字加入千分位逗號
  padStart：數字補零

Image
  imageLoaded：單張圖片載入完成
  imageAllLoaded：多張圖片載入完成
  imageDownload：下載Img圖片
  canvasImageDownload：下載Canvas圖片

Array
  isArrayRepeat：陣列是否有重複值(不分型別)
  removeArrayRepeat：移除陣列中的重複元素
  flatArray：二維陣列扁平化
  indexOfAll：返回陣列中某值的所有索引
  intersectionArray：兩陣列的交集
  shuffleArray：洗牌陣列

Object
  typeOf：精準型別判斷
  filterObj：過濾物件鍵值
  deleteObj：刪除物件鍵值
  deepCloneSimple：深拷貝(簡易版)
  deepClone：深拷貝(完全版)

Time
  isLeapYear：判斷是否為閏年
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
  getCookie：取得Cookie的值
  debounce：函式防抖
  throttle：函式節流
  queryString：查詢網址所帶參數
  parseUrl：解析網址
  toUrl：網址跳轉
  jumpReload：跳頁重整
  isMobile：判斷是否移動裝置
*/

//-----------------------String-----------------------
/**
 * 將字串內換行符\n轉為<br>
 * @param {string} val 傳入值
 * @param {boolean} is_xhtml 是否為xhtml 預設為false
 */
const nl2br = (val = '', is_xhtml = false) => {
  if(val == null) return val;
  let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (val + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

/**
 * 取得隨機字串
 * @param {number} length 指定字串長度 預設為10
 */
const getRandomString = (length = 10) =>{
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let temp = "";
  for (let i = 0; i < length; i++) {
    temp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return temp;
}

/**
 * 複製文字至剪貼簿
 * @param {string} id 要複製文字的元素id
 * @example copyTextToClipboard('id').then(res => udAlert(`已複製\n${ res }`));
 */
const copyTextToClipboard = id => {
  return new Promise(resolve => {
    let textRange = document.createRange();
    textRange.selectNode(document.getElementById(id));
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(textRange);
    document.execCommand("copy");
    resolve(textRange);
  })
}

//-----------------------Number-----------------------
/**
 * 取得範圍內隨機整數
 * @param {number} min 隨機數最小值 預設為0
 * @param {number} max 隨機數最大值 預設為100
 * @example getRandom(5, 10) -> 7
 */
const getRandom = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 四捨五入到指定位數
 * @param {number} val 傳入值
 * @param {number} decimals 指定位數 預設為0
 * @example roundNumber(1.235, 2) -> 1.24
 */
const roundNumber = (val, decimals = 0) => {
  if(val == null) return val;
  return Number(`${ Math.round(`${ val }e${ decimals }`)}e-${ decimals }`);
}

/**
 * 數字加入千分位逗號
 * @param {number} val 傳入值
 * @example formatNumber(99999) -> 99,999
 */
const formatNumber = val => {
  if(val == null) return val;
  let temp = val.toString();
  let pattern = /(-?\d+)(\d{3})/;
  while(pattern.test(temp)){
    temp = temp.replace(pattern, "$1,$2");
  }
  return temp;
}

/**
 * 數字補零
 * @param {number|string} val 傳入值
 * @param {number} length 要補到幾位 預設為2
 * @param {number|string} string 要補的值 預設為0
 * @example padStart(5) -> '05'
 * @example padStart(5, 4) -> '0005'
 * @example padStart(5, 4, 2) -> '2225'
 */
const padStart = (val, length = 2, string = 0) => {
  if(val == null) return val;
  if(!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if(this.length > targetLength) {
        return String(this);
      }else {
        targetLength = targetLength - this.length;
        if(targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
      }
    };
  }
  return val.toString().padStart(length, string);
}

//-----------------------Image-----------------------
/**
 * 單張圖片載入完成
 * @param {string} url 圖片路徑
 * @example imageLoaded('imgUrl').then(...) -> 圖片讀取完成時返回該Image物件
 */
const imageLoaded = url => {
  let img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    if(img.complete) {
      resolve(img);
    }else {
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    }
  })
}

/**
 * 多張圖片載入完成
 * @param {array} arr 多張圖片路徑陣列
 * @example imageAllLoaded(['imgUrl1','imgUrl2']).then(...) -> 全部圖片都讀取完成時返回該Image物件組成的陣列
 */
const imageAllLoaded = arr => {
  let result = [];
  arr.forEach(item => {
    result.push(imageLoaded(item));
  });
  return new Promise((resolve, reject) => {
    Promise.all(result)
      .then(res => resolve(res))
      .catch(err => reject(err));
  })
}

/**
 * 下載Img圖片
 * @param {string} selector 圖片元素選擇器
 * @param {string} name 圖片名稱 預設為'下載圖片'
 * @example imageDownload('#image', '自訂圖片名稱')
 */
const imageDownload = (selector, name = '下載圖片') => { 
  let image = new Image();
  image.setAttribute('crossOrigin', 'anonymous'); // 解決跨域 Canvas 污染問題
  image.src = document.querySelector(selector).src;
  image.onload = function() {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL('image/jpg');
    let a = document.createElement('a');
    let event = new MouseEvent('click');
    a.download = name;
    a.href = url;
    a.dispatchEvent(event);
  }
}

/**
 * 下載Canvas圖片
 * @param {string} selector canvas元素選擇器
 * @param {string} name 圖片名稱 預設為'下載圖片'
 * @example canvasImageDownload('canvas', '自訂圖片名稱')
 */
const canvasImageDownload = (selector, name = '下載圖片') => {
  let canvas = document.querySelector(selector);
  let url = canvas.toDataURL('image/png');
  let a = document.createElement('a');
  let event = new MouseEvent('click');
  a.download = name; 
  a.href = url;
  a.dispatchEvent(event);
}

//-----------------------Array-----------------------
/**
 * 陣列是否有重複值(不分型別)
 * @param {array} arr 傳入值
 * @example isArrayRepeat([1, 2, 2, 3]) -> true
 */
const isArrayRepeat = arr => {
  if(arr == null) return arr;
  let obj = {};
  for(let i in arr) {
    if(obj[arr[i]]) return true;
    obj[arr[i]] = true;
  }
  return false;
}

/**
 * 移除陣列中的重複元素
 * @param {array} arr 傳入值
 * @example removeArrayRepeat([1, 2, 2, 3]) -> [1, 2, 3]
 */
const removeArrayRepeat = arr => {
  if(arr == null) return arr;
  let newArr = arr.filter((el, i, arr) => arr.indexOf(el) === i);
  return newArr;
}

/**
 * 二維陣列扁平化
 * @param {array} arr 傳入值
 * @param {number} depth 指定深度
 * @example flatArray([1, [2], 3, 4]); -> [1, 2, 3, 4]
 * @example flatArray([1, [2, [3, [4, 5], 6], 7], 8], 2); -> [1, 2, 3, [4, 5], 6, 7, 8]
 */
const flatArray = (arr, depth = 1) => {
  if(arr == null) return arr;
  return arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatArray(v, depth - 1) : v), []);
}

/**
 * 返回陣列中某值的所有索引
 * @param {array} arr 傳入值
 * @param {number} val 指定值
 * @example indexOfAll([1, 2, 3, 1, 2, 3], 1); -> [0,3]
 * @example indexOfAll([1, 2, 3], 4); -> []
 */
const indexOfAll = (arr, val) => {
  if(arr == null) return arr;
  return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * 兩陣列的交集
 * @param {array} arrA 陣列A
 * @param {array} arrB 陣列B
 * @example intersectionArray([1, 2, 3], [4, 3, 2]); -> [2, 3]
 */
const intersectionArray = (arrA, arrB) => {
  if(arrA == null || arrB == null) return null;
  const s = new Set(arrB);
  return arrA.filter(x => s.has(x));
};

/**
 * 洗牌陣列
 * @param {array} arr 傳入值
 * @example shuffleArray([1, 2, 3]); -> [2, 3, 1];
 */
const shuffleArray = arr => {
  if(arr == null) return arr;
  let arrCopy = [...arr];
  let m = arrCopy.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arrCopy[m], arrCopy[i]] = [arrCopy[i], arrCopy[m]];
  }
  return arrCopy;
};

//-----------------------Object-----------------------
/**
 * 精準型別判斷
 * @param {any} val 傳入值
 */
const typeOf = val => {
  return val === undefined ? 'undefined' : val === null ? 'null' : val.constructor.name.toLowerCase();
}

/**
 * 過濾物件鍵值
 * @param {object} val 傳入值
 * @param {array} arr 過濾值的陣列
 * @example filterObj(obj, ["keyA", "keyB"]);
 */
const filterObj = (val, arr) => {
  let tempObj = JSON.parse(JSON.stringify(val));
  for(let i in tempObj){
    if(arr.indexOf(i) === -1) delete tempObj[i];
  }
  return tempObj;
}

/**
 * 刪除物件鍵值
 * @param {object} obj 傳入值
 * @param {array} arr 刪除值的陣列
 * @example deleteObj(obj, ["keyA", "keyB"]);
 */
const deleteObj = (obj, arr) => {
  let tempObj = JSON.parse(JSON.stringify(obj));
  for(let i in tempObj){
    if(arr.indexOf(i) !== -1) delete tempObj[i];
  }
  return tempObj;
}

/**
 * 深拷貝(簡易版)
 * @param {object} obj 傳入值
 */
const deepCloneSimple = obj => {
  if(obj == null) return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 深拷貝(完全版)
 * @param {object} obj 傳入值
 */
const deepClone = (obj, hash = new WeakMap()) => {
  if(obj == null) return obj;
  if(obj instanceof RegExp) return new RegExp(obj);
  if(obj instanceof Date) return new Date(obj);
  if(obj instanceof Error) return new Error(obj);
  if(typeof obj !== 'object') return obj;
  if(hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor;
  hash.set(obj, cloneObj);
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) cloneObj[key] = deepClone(obj[key], hash);
  }
  return cloneObj;
}

/**
 * 物件key重命名
 * @param {object} obj 傳入值
 * @example renameKeys(obj, { line_uid: "lineUid", is_past: "isPast" });
 */
const renameKeys = (obj, keysMap) => {
  return Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    ...{ [keysMap[key] || key]: obj[key] }
  }), {});
}

//-----------------------Time-----------------------
/**
 * 判斷是否為閏年
 * @param {number} year 年份
 */
const isLeapYear = year => {
  if(year == null) return year;
  return new Date(year, 1, 29).getDate() === 29;
}

/**
 *  判斷日期是否存在
 * @param {string} date 日期字串
 * @param {string} split 分割符 預設為"-"
 * @example isExistDate("2020-02-29"); -> true
 * @example isExistDate("2019/02/29", "/"); -> false
 */
const isExistDate = (date, split = "-") => {
  if(date == null) return date;
  let dateArr = date.split(split);
  let limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let theYear = parseInt(dateArr[0]);
  let theMonth = parseInt(dateArr[1]);
  let theDay = parseInt(dateArr[2]);
  let isLeap = new Date(theYear, 1, 29).getDate() === 29;
  if(isLeap) limitInMonth[1] = 29;
  return theDay > 0 && theDay <= limitInMonth[theMonth - 1];
}

/**
 * 取得前後幾天的日期
 * @param {number} days 指定天數 可為負值
 * @example getDiffDate(1); -> "2020-07-01"
 * @example getDiffDate(0); -> "2020-06-30"
 * @example getDiffDate(-2); -> "2020-06-28"
 */
const getDiffDate = (days = 0) => {
  let t = new Date();
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
const formatTime = (date = new Date(), format = "yyyy-MM-dd hh:mm:ss") => {
  let o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "H+": date.getHours(), // 小時
    "h+": date.getHours(), // 小時
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds() // 毫秒
  };
  if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if(new RegExp("(" + k + ")").test(format)) {
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
 * @example scrollTo(); -> 滾動回項部
 * @example scrollTo('top', 1); -> 瞬間回項部
 * @example scrollTo('.foobar', 10, -30, () => {console.log('滾動完成')});
 */
const scrollTo = (el = "top", speed = 5, offset = 0, callback = () => {}) => {
  let scrollTop = document.scrollingElement.scrollTop;
  let top = 0;
  if(typeof el === 'number') {
    top = el + offset;
  }else {
    if(el === 'top') {
      top = 0 + offset;
    }else if(el === 'bottom') {
      top = document.body.scrollHeight - document.body.clientHeight + offset;
    }else {
      top = document.querySelector(el).offsetTop + offset;
    }
  }
  const scroll = () => {
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
const getPageScroll = (type = 'height') => {
  if(type === 'width') {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }
  if(type === 'height') {
    let bodyTop = 0;
    if(typeof window.pageYOffset != "undefined") {
      bodyTop = window.pageYOffset;
    }else if(typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") {
      bodyTop = document.documentElement.scrollTop;
    }else if(typeof document.body != "undefined") {
      bodyTop = document.body.scrollTop;
    }
    return bodyTop;
  }
}

/**
 * 取得頁面尺寸
 * @param {string} scope 範圍(view: 可視頁面, full: 完整頁面)
 */
const getPageSize = (scope = 'view') => {
  let el = document.compatMode == "BackCompat" ? document.body : document.documentElement;
  if(scope === 'view') {
    return [el.clientWidth, el.clientHeight];
  }
  if(scope === 'full') {
    return [
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth,el.clientWidth),
      Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, el.clientHeight)
    ];
  }
}

//-----------------------Verify-----------------------
/**
 * 常用驗證函式
 * @param {any} val 傳入值
 * @param {string|regex} type 驗證類型(可接受正則表達式)
 * @example isVerify('1988-05-27', 'date') -> true
 * @example isVerify('ABC', /[A-Z]/) -> true
 */
const isVerify = (val, type) => {
  if(val == null) return val;
  switch (type) {
    // 姓名驗證
    case "name":
      return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(val);
    // 電話驗證
    case "phone":
      return /^09[0-9]{8}$/.test(val);
    // 電子郵件驗證
    case "email":
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val);
    // 日期驗證
    case "date":
      return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(val);
    // 數字驗證
    case "number":
      return !isNaN(val);
    // 網址驗證
    case "url":
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
      );
    return pattern.test(val);
    // IP地址驗證
    case "ip":
      return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val);
    // Hex色碼驗證
    case "hex":
      return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(val);
    // 身分證字號驗證
    case "id":
      let letters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O');
      let multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
      let nums = new Array(2);
      let firstChar;
      let firstNum;
      let lastNum;
      let total = 0;
      let regExpID=/^[a-z](1|2)\d{8}$/i; 
      if(val.search(regExpID)==-1) {
        return false;
      }else {
        firstChar = val.charAt(0).toUpperCase();
        lastNum = val.charAt(9);
      }
      for(var i=0; i<26; i++) {
        if(firstChar == letters[i]) {
          firstNum = i + 10;
          nums[0] = Math.floor(firstNum / 10);
          nums[1] = firstNum - (nums[0] * 10);
          break;
        } 
      }
      for(var i=0; i<multiply.length; i++){
        if(i<2) {
          total += nums[i] * multiply[i];
        }else {
          total += parseInt(val.charAt(i-1)) * multiply[i];
        }
      }
      if((10 - (total % 10))!= lastNum) {
        return false;
      } 
      return true;
    // 正則表達式驗證
    default:
      let regexMode = new RegExp(type);
      return regexMode.test(val);
  }
}

/**
 * 精準數字驗證
 * @param {any} val 傳入值
 */
const isNumber = val => {
  return typeOf(val) !== "number" ? false : !isNaN(val);
}

/**
 * 未填入驗證
 * @param {any} val 傳入值
 */
const isEmpty = val => {
  switch(typeOf(val)) {
    case "string":
      return (val.trim().length === 0) ? true : false;
    case "number":
      return false;
    case "boolean":
      return val ? false : true;
    case "array":
      if(val.length === 0) return true;
      return val.some(i => i.length === 0) ? true : false;
    case "object":
      return false;
    case "null":
      return true;
    case "undefined":
      return true;
    default:
      return false;
  }
}

//-----------------------Web-----------------------
/**
 * 取得Cookie的值
 * @param {string} key 傳入值
 */
const getCookie = key => {
  let arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

/**
 * 函式防抖
 * @description 將幾次操作合併為一次操作進行
 * @param {function} fn 處理函式
 * @param {number} wait 停止後等待時間 預設為200ms
 * @example window.addEventListener('scroll', debounce(() => console.log(getRandom), 500));
 */
const debounce = (fn, wait = 200) => {
  let timeout = null;
  return () => {
    if(timeout !== null)
      clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}

/**
 * 函式節流
 * @description 一定時間內只觸發一次函式
 * @param {function} fn 處理函式
 * @param {number} delay 處理間隔時間 預設為1000ms
 * @example window.addEventListener('scroll', throttle(() => console.log(getRandom), 2000));
 */
const throttle = (fn, delay = 1000) => {
  let prev = Date.now();
  return () => {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, args);
      prev = Date.now();
    }
  }
}

/**
 * 查詢網址所帶參數
 * @param {string} key 鍵值
 * @param {string} url 網址
 * @example queryString('id', https://foo?id=123) -> "123"
 */
const queryString = (key = "", url = location.href) => {
  let parseUrl = new URL(url);
  return parseUrl.searchParams.get(key);
}

/**
 * 解析網址
 * @param {string} url 網址
 */
const parseUrl = (url = location.href) => {
  if(url == null) return url;
  let parseUrl = new URL(url);
  return parseUrl;
}

/**
 * 網址跳轉
 * @param {string} url 欲跳轉的網址
 */
const toUrl = url => {
  if(url == null) return url;
  window.location.href = url;
}

/**
 * 跳頁重整
 */
const jumpReload = () => {
  window.onpageshow = event => {
    if(event.persisted) window.location.reload();
  };
}

/**
 * 判斷是否移動裝置
 * @param {string} os 作業系統('': 所有機型, apple: 蘋果, android: 安卓)
 */
const isMobile = (os = '') => {
  switch(os) {
    case 'apple':
      return /iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase());
    case 'android':
      return /android/i.test(navigator.userAgent.toLowerCase());
    default:
      return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase());
  }
}

export {
  nl2br,
  getRandomString,
  copyTextToClipboard,
  getRandom,
  roundNumber,
  formatNumber,
  padStart,
  imageLoaded,
  imageAllLoaded,
  imageDownload,
  canvasImageDownload,
  isArrayRepeat,
  removeArrayRepeat,
  flatArray,
  indexOfAll,
  intersectionArray,
  shuffleArray,
  typeOf,
  filterObj,
  deleteObj,
  deepCloneSimple,
  deepClone,
  renameKeys,
  isLeapYear,
  isExistDate,
  getDiffDate,
  formatTime,
  scrollTo,
  getPageScroll,
  getPageSize,
  isVerify,
  isNumber,
  isEmpty,
  getCookie,
  debounce,
  throttle,
  queryString,
  parseUrl,
  toUrl,
  jumpReload,
  isMobile,
};