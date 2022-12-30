var vm = new Vue({
    el: "#app",
    data: {},
    mounted: function () {
        this.getData();
    },
    computed: {},
    methods: {
        getData: function () {
            udAxios.get("products")
                .then(function (res) {
            }).catch(function (err) { });
        },
    }
});
//# sourceMappingURL=index.js.map