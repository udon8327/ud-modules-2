var vm = new Vue({
    el: "#app",
    data: {
        isModalShow: true
    },
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
        toDemo: function () {
            location.href = 'demo.html';
        },
        submitForm: function (event) {
            console.log('submit!!');
            event.preventDefault(event);
            document.getElementById('form').submit();
        }
    }
});
//# sourceMappingURL=index.js.map