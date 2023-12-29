var liffLogin = function (callback) {
    liff
        .init({
        liffId: "",
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
                // 檢查有無Token
                if (!sessionStorage.getItem("token")) {
                    request({
                        url: "/line-crm-main/api/frontend/v1/line-liff/token",
                        method: "post",
                        data: {
                            id_token: liff.getIDToken(),
                        },
                    })
                        .then(function (res) {
                        sessionStorage.setItem("token", res.data.token);
                        callback();
                    })
                        .catch(function () {
                        udAlert("Token取得失敗，請稍後再試").then(function () {
                            return location.reload();
                        });
                    });
                }
                else {
                    callback();
                }
            }
            else {
                sessionStorage.setItem("loginRedirectUrl", location.href);
                location.href = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=" + process.env.VUE_APP_LINE_LOGIN_CHANNEL_ID + "&redirect_uri=" + encodeURIComponent(location.origin + "/cb-web") + "&scope=profile%20openid%20phone%20email&bot_prompt=aggressive&prompt=consent&state=" + Date.now();
            }
        })
            .catch(function () {
            sessionStorage.removeItem("token");
            liff.logout();
            location.reload();
        });
    })
        .catch(function (err) {
        udAlert("[" + err.code + "] " + err.message + "\nLIFF\u521D\u59CB\u5316\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66").then(function () { return location.reload(); });
    });
};
//# sourceMappingURL=liff-login.js.map