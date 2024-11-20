var vm = new Vue({
    el: "#app",
    data: {
        isCrossOrigin: true,
        imageUrl: "",
        link: "",
    },
    mounted: function () {
        this.initWidget();
    },
    computed: {},
    methods: {
        initWidget: function () {
            var _this = this;
            window.addEventListener("message", function (event) {
                try {
                    var params = JSON.parse(event.data);
                    // console.log('fromMainParams: ', params);
                    if (params.imageUrl)
                        _this.imageUrl = params.imageUrl;
                }
                catch (error) {
                    console.log(error);
                }
            });
        },
        toLink: function () {
            this.postMain({ link: true });
        },
        close: function () {
            this.postMain({ close: true });
        },
        // tools
        // 向主頁面發送數據
        postMain: function (data) {
            window.parent.postMessage(JSON.stringify(data), this.isCrossOrigin ? "*" : location.origin);
        },
    }
});
//# sourceMappingURL=index拷貝.js.map