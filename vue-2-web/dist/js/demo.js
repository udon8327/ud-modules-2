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
        isModalShow: 0,
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
        storeOptions: [],
    },
    mounted: function () {
    },
    computed: {
        testArr: function () {
            return [this.test1, this.test2, this.test3];
        }
    },
    methods: {
        getStoreOptions: function () {
            var _this = this;
            udAxios.post('https://polls.apiblueprint.org/questions', {
                question: "Favourite programming language?",
                choices: [
                    "Swift",
                    "Python",
                    "Objective-C",
                    "Ruby"
                ]
            })
                .then(function (res) { return _this.storeOptions = res.options; });
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