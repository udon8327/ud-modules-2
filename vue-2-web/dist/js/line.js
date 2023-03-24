var vm = new Vue({
    el: "#app",
    data: {
        messageId: "1655285121",
        loginId: "1655285115",
        AddFriendLine: "https://line.me/R/ti/p/@524wuemo",
        LiffId: "1655285115-GJW2kzl7",
    },
    mounted: function () {
        this.lineLogin();
    },
    computed: {},
    methods: {
        lineLogin: function () {
            location.href = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=" + this.loginId + "redirect_uri=" + encodeURIComponent(location.href) + "&state=coolbe&scope=openid%20profile";
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
    }
});
//# sourceMappingURL=line.js.map