let BASE_URL = "";
let LINE_LOGIN_CHANNEL_ID = "";
let LINE_OA_URL = "";
let LINE_LIFF_ID = "";

switch (location.hostname) {
    // 正式機
    case "ud-modules-vue2.udons.site":
        BASE_URL = "https://mock.udons.site";
        LINE_LOGIN_CHANNEL_ID = "1655285115";
        LINE_OA_URL = "https://line.me/R/ti/p/@524wuemo";
        LINE_LIFF_ID = "1655285115-AYjbLKMr";
        break;
    // 測試機
    case "ud-modules-vue2.udons.site":
        BASE_URL = "https://mock.udons.site";
        LINE_LOGIN_CHANNEL_ID = "1655285115";
        LINE_OA_URL = "https://line.me/R/ti/p/@524wuemo";
        LINE_LIFF_ID = "1655285115-AYjbLKMr";
        break;
    // 本機開發
    default:
        BASE_URL = "https://mock.udons.site";
        LINE_LOGIN_CHANNEL_ID = "1655285115";
        LINE_OA_URL = "https://line.me/R/ti/p/@524wuemo";
        LINE_LIFF_ID = "1655285115-AYjbLKMr";
        break;
}
//# sourceMappingURL=config.js.map