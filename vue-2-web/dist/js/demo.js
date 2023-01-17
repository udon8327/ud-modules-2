var vm = new Vue({
    el: "#app",
    data: {
        aaa: "",
        aaaOptions: [
            {
                label: "aaa", value: "aaa"
            },
            {
                label: "bbb", value: "bbb"
            },
        ],
        test1: "",
        test2: "",
        test3: "",
        test4: "",
        store: ["", "", "", ""],
        fileList: [],
        file: "",
        isModalShow: false,
        user: {
            name: "",
            age: "",
            birthday: "",
            code: "test",
            verify: "",
            radio: "",
            agree: false,
            checkbox: [],
            select: "",
            store: ["", "", ""],
            twzip: ["", ""],
            date: ["", "", ""]
        },
        rules: {
            name: [{ type: "required" }, { type: "name" }],
            birthday: [{ type: "required" }, { type: "date" }],
            age: [{ type: "required" }, { type: "number" },],
            verify: [{ type: "required" }, { type: "equal", equalTo: "code", caseIgnore: "true" }],
            radio: [{ type: "required" },],
            agree: [{ type: "required", message: "請先同意相關使用條款" },],
            checkbox: [{ type: "required" },],
            select: [{ type: "required" },],
            store: [{ type: "required", message: "櫃點為必填項目" }],
            twzip: [{ type: "required" }],
            date: [{ type: "required" }],
        },
        charaOptions: [
            { label: "妮可", value: "nico" },
            { label: "花丸", value: "maru" },
            { label: "步夢", value: "pomu" },
        ],
        storeOptions: [
            { label: "台北市", value: "01", children: [
                    { label: "中正區", value: "011", children: [
                            { label: "中正01", value: "0111", disabled: "true" },
                            { label: "中正02", value: "0112" },
                        ] },
                    { label: "大安區", value: "012", disabled: true, children: [
                            { label: "大安01", value: "0121" },
                            { label: "大安02", value: "0122" },
                        ] },
                    { label: "信義區", value: "013", children: [
                            { label: "信義01", value: "0131" },
                            { label: "信義02", value: "0132" },
                        ] },
                ] },
            { label: "台中市", value: "02", children: [
                    { label: "西屯區", value: "021", children: [
                            { label: "中正01", value: "0211" },
                            { label: "中正02", value: "0212" },
                        ] },
                    { label: "北屯區", value: "022", children: [
                            { label: "大安01", value: "0221" },
                            { label: "大安02", value: "0222" },
                        ] },
                    { label: "中區", value: "023", children: [
                            { label: "信義01", value: "0231" },
                            { label: "信義02", value: "0232" },
                        ] },
                ] },
        ],
        param: "",
        paramOptions: [
            { label: "妮可", value: "1" },
            { label: "花丸", value: "2" },
            { label: "步夢", value: "3" },
        ],
    },
    mounted: function () {
        // udAlert(123)
        // udAlert(queryString('id'))
        // console.log(this.funcUrlDel('id'))
        // window.history.replaceState(null, null,'demo.html');
        // this.param = queryString('id')
        // var url = window.location.href; 
        // this.changeURLArg(url, 'id', 5);
        // udAxios.get('test/500')
        //   .then(res => {
        //     udAlert({
        //       msg: 1234,
        //       onConfirm: () => {
        //         udAlert('確定');
        //       },
        //     })
        //   })
    },
    computed: {
        testArr: function () {
            return [this.test1, this.test2, this.test3];
        }
    },
    methods: {
        onParamChange: function () {
            window.history.replaceState("", "", "demo.html?id=" + this.param);
        },
        toG: function () {
            location.href = 'https://www.google.com.tw/';
        },
        test: function () {
            udAlert(this.aaa);
        },
        download: function () {
            imageDownload('#image');
        },
        upload: function (param) {
            console.log('param: ', param);
            // let file = this.$refs.file.files[0];
            var formData = new FormData();
            formData.append('image', param.file);
            udAxios.post('https://api.imgur.com/3/image', formData, {
                headers: {
                    Authorization: "Client-ID " + '0259aa13deafaac' //放置你剛剛申請的Client-ID
                },
            }).then(function (res) { return console.log(res); })
                .catch(function (err) { return console.log(err); });
        },
        formSubmit: function () {
            var _this = this;
            this.$refs.form.validate(function () {
                _this.udAlert({ msg: "驗證成功!!" });
            });
        },
        toUrl: function (url) {
            location.href = url;
        },
        //API
        init: function () {
            udAxios.post("echo.php", { '123': 456 }, {
                params: {
                    from: "02-22",
                    to: "02-29"
                },
                headers: {
                    channel_id: "12345678"
                },
            })
                .then(function (res) { return console.log('res', res); })
                .catch(function (err) { return console.log('err', err); });
        },
        getData: function () {
            var _this = this;
            udAxios.get(BASE_URL + "ajax/success.php").then(function (res) {
                _this.userData = res.userData;
            });
        },
        postData: function () {
            udAxios.post(BASE_URL + "ajax/success.php", {
                mail: "udon8327@gmail.com",
                name: "UDON",
            }, {
                params: {
                    from: 123,
                    to: 456
                }
            })
                .then(function (res) {
                console.log("res: ", res);
            });
        },
        checkAlert: function () {
            this.udAlert({
                msg: "測試",
                confirm: true
            })
                .then(function () { })
                .catch(function () { });
        },
        handlePreview: function (item) {
            console.log(item);
        },
        handleRemove: function (item) {
            console.log(item);
        },
        beforeUpload: function (item) {
            console.log(item);
        }
    }
});
//# sourceMappingURL=demo.js.map