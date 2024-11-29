var BASE_URL = "";
var LINE_LOGIN_CHANNEL_ID = "";
var LINE_OA_URL = "";
var LINE_LIFF_ID = "";

switch (location.hostname) {
    // 正式機
    case "linebc.lancome.com.tw":
        BASE_URL = "https://linebc.lancome.com.tw";
        LINE_LOGIN_CHANNEL_ID = "1478980612";
        LINE_OA_URL = "https://line.me/R/ti/p/@503aklvi";
        LINE_LIFF_ID = "";
        break;
    // 測試機
    case "linebcqa.lancome.com.tw":
        BASE_URL = "https://linebcqa.lancome.com.tw";
        LINE_LOGIN_CHANNEL_ID = "1501264018";
        LINE_OA_URL = "https://line.me/R/ti/p/@591zlzjn";
        LINE_LIFF_ID = "";
        break;
    // 本機開發
    default:
        BASE_URL = "https://linebcqa.lancome.com.tw";
        LINE_LOGIN_CHANNEL_ID = "1501264018";
        LINE_OA_URL = "https://line.me/R/ti/p/@591zlzjn";
        LINE_LIFF_ID = "";
        break;
}
//# sourceMappingURL=config.js.map