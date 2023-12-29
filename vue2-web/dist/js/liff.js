var vm = new Vue({
    el: "#app",
    data: {
        profile: {},
    },
    mounted: function () {
        var _this = this;
        liff
            .init({
            liffId: "1655285115-WMzxMo6m",
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
                    });
                }
                else {
                    location.href = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655285115&redirect_uri=" + encodeURIComponent(location.href) + "&scope=profile%20openid%20phone%20email&bot_prompt=aggressive&prompt=consent&state=" + Date.now();
                }
            })
                .catch(function () {
                liff.logout();
                location.reload();
            });
        })
            .catch(function (err) {
            udAlert("[" + err.code + "] " + err.message + "\nLIFF\u521D\u59CB\u5316\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66").then(function () { return location.reload(); });
        });
    },
    computed: {},
    methods: {}
});
//# sourceMappingURL=liff.js.map