var vm = new Vue({
    el: "#app",
    data: {},
    mounted: function () {
        // this.getData();
        var video = document.getElementById("video");
        video.play();
    },
    computed: {},
    methods: {
        play: function () {
            var video = document.getElementById("video");
            video.play();
        },
        getData: function () {
            udAxios.get("products")
                .then(function (res) {
            }).catch(function (err) { });
        },
    }
});
//# sourceMappingURL=index.js.map