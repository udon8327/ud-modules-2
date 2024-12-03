var vm = new Vue({
    el: "#app",
    data: {
        isModalShow: false,
        isCollapse: false,
        profile: {
            userId: "",
            displayName: "",
            pictureUrl: "",
            info: "",
        },
        formData: {
            name: "",
            phone: "",
            email: "",
            age: "",
            birthday: "",
            radio: "",
            checkbox: [],
            select: "",
            selectLink: ["", "", ""],
            selectLinkSp: ["", "", ""],
            twzip: ["", ""],
            date: ["", "", ""],
            isActive: false,
            captcha: "",
            captchaCode: "",
            isAgree: false,
            note: "",
        },
        rules: {
            name: [{ type: "required" }, { type: "name" }],
            phone: [{ type: "required" }, { type: "phone" }],
            email: [{ type: "required" }, { type: "email" }],
            age: [{ type: "required" }, { type: "number" }],
            birthday: [{ type: "required" }, { type: "date" }],
            radio: [{ type: "required" }],
            checkbox: [{ type: "required" }],
            select: [{ type: "required" }],
            selectLink: [{ type: "required" }],
            selectLinkSp: [{ type: "required" }],
            twzip: [{ type: "required" }],
            date: [{ type: "required" }],
            isAgree: [{ type: "required", message: "請先同意相關使用條款" },],
            captcha: [{ type: "required" }, { type: "equal", equalTo: "captchaCode", caseIgnore: "true" }],
        },
        options: [
            { label: "甲", value: "a", disabled: true },
            { label: "乙", value: "b" },
            { label: "丙", value: "c" },
        ],
        storeOptions: [
            { label: "台北市", value: "taipei", children: [
                    { label: "中正區", value: "100", children: [
                            { label: "2023-12-01", value: "1" },
                            { label: "2023-12-02", value: "2", disabled: "true" }
                        ] },
                    { label: "大安區", value: "106", disabled: true, children: [
                            { label: "2023-12-03", value: "3" },
                            { label: "2023-12-04", value: "4" },
                        ] },
                    { label: "信義區", value: "110", children: [
                            { label: "2023-12-05", value: "5" },
                            { label: "2023-12-06", value: "6" },
                        ] },
                ] },
            { label: "新北市", value: "newTaipei", children: [
                    { label: "板橋區", value: "220", children: [
                            { label: "2023-12-07", value: "7" },
                            { label: "2023-12-08", value: "8" },
                        ] },
                    { label: "永和區", value: "234", children: [
                            { label: "2023-12-09", value: "9" },
                            { label: "2023-12-10", value: "10", disabled: true },
                        ] },
                    { label: "新店區", value: "231", children: [
                            { label: "2023-12-11", value: "11", disabled: true },
                            { label: "2023-12-12", value: "12", disabled: true },
                        ] },
                ] },
        ],
    },
    mounted: function () {
        this.liffLogin();
    },
    computed: {},
    methods: {
        liffLogin: function () {
            var _this = this;
            liff
                .init({
                liffId: LINE_LIFF_ID,
            })
                .then(function () {
                // 檢查是否登入
                if (!liff.isLoggedIn()) {
                    liff.login({ redirectUri: location.href });
                    return;
                }
                // 檢查是否好友
                liff
                    .getFriendship()
                    .then(function (data) {
                    if (data.friendFlag) {
                        liff.getProfile().then(function (res) {
                            _this.profile = res;
                            _this.profile.info =
                                liff.isInClient() + ", " +
                                    liff.getOS() + ", " +
                                    liff.getLineVersion() + ", " +
                                    liff.getLanguage();
                        });
                    }
                    else {
                        location.href = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=" + LINE_LOGIN_CHANNEL_ID + "&redirect_uri=" + encodeURIComponent(location.href) + "&scope=profile%20openid%20phone%20email&bot_prompt=aggressive&prompt=consent&state=" + Date.now();
                    }
                })
                    .catch(function () {
                    udAlert("LIFF\u521D\u59CB\u5316\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66").then(function () {
                        location.href = LINE_OA_URL;
                    });
                });
            })
                .catch(function (err) {
                udAlert("[" + err.code + "] " + err.message + "\nLIFF\u521D\u59CB\u5316\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66").then(function () {
                    location.href = LINE_OA_URL;
                });
            });
        },
        getData: function () {
            udAxios.get('test')
                .then(function (res) {
                console.log('res: ', res);
            });
        },
        postData: function () {
            udAxios.post('test', {
                name: "UDON"
            }, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
                .then(function (res) {
                console.log('res: ', res);
            });
        },
        alert: function () {
            udAlert("警告\n彈窗");
        },
        timeup: function () {
            console.log('時間到');
        },
        formSubmit: function () {
            var _this = this;
            this.$refs.form.validate(function () {
                _this.udAlert({ msg: "驗證成功!!" });
            });
        },
        clearVerify: function () {
        },
        toUrl: function (url) {
            location.href = url;
        },
        sendMessage: function () {
            liff.sendMessages([
                {
                    "type": "text",
                    "text": "Hello, World!(sendMessages)"
                }
            ])
                .then(function () {
                console.log('Message sent successfully!');
            })
                .catch(function (err) {
                console.error('Error sending message:', err);
            });
        },
        shareTargetPicker: function () {
            var _this = this;
            // shareTargetPicker只能在LIFF或外部瀏覽器(除了LINE內建瀏覽器)使用
            if (!liff.isApiAvailable('shareTargetPicker')) {
                this.udAlert("您的設備不支援好友分享功能\n請更新手機系統或LINE版本").then(function () {
                    location.href = LINE_OA_URL;
                });
                return;
            }
            if (!liff.isInClient() && liff.getLineVersion()) {
                this.udAlert("請點擊活動LIFF連結進入頁面\n才可使用好友分享功能").then(function () {
                    // location.href = LINE_OA_URL;
                    liff.openWindow({
                        url: location.href,
                        external: true,
                    });
                });
                return;
            }
            liff.shareTargetPicker([
                {
                    "type": "text",
                    "text": "Hello, World!(shareTargetPicker)"
                }
            ])
                .then(function (res) {
                if (res) {
                    _this.udAlert("分享成功！").then(function () {
                        liff.closeWindow();
                    });
                }
                else {
                    var _a = (liff.getLineVersion() || "").split('.'), majorVer = _a[0], minorVer = _a[1];
                    if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
                        _this.udAlert("您的 LINE 版本較舊，可能會造成無法分享成功。若分享失敗，請升級 LINE APP 後再嘗試。");
                        return;
                    }
                    _this.udAlert("已取消分享"); // LINE 10.11.0 -
                }
            })
                .catch(function (error) {
                _this.udAlert({
                    msg: (error.code === 'EXCEPTION_IN_SUBWINDOW' ? '請在 LINE APP中 開啟活動\n以便使用好友分享功能' : '訊息分享失敗，請稍後再試') + "\n[" + error.code + "] " + error.message,
                }).then(function () {
                    location.href = LINE_OA_URL;
                });
            });
        },
    }
});
//# sourceMappingURL=demo.js.map