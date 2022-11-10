declare var $: (selector: string) => any;

let vm = new Vue({
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
      code: "test", // verify需相等
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
      verify: [{ type: "required" }, { type: "equal", equalTo: "code", caseIgnore: "true"}],
      radio: [{ type: "required" },],
      agree: [{ type: "required", message: "請先同意相關使用條款"},],
      checkbox: [{ type: "required" },],
      select: [{ type: "required" },],
      store: [{ type: "required", message: "櫃點為必填項目" }],
      twzip: [{ type: "required" }],
      date: [{ type: "required" }],
    },
    charaOptions: [
      {label: "妮可", value: "nico"},
      {label: "花丸", value: "maru"},
      {label: "步夢", value: "pomu"},
    ],
    storeOptions: [
    ],
  },
  mounted() {
  },
  computed: {
    testArr() {
      return [this.test1, this.test2, this.test3]
    }
  },
  methods: {
    getStoreOptions() {
      udAxios.post('https://polls.apiblueprint.org/questions', {
        question: "Favourite programming language?",
        choices: [
            "Swift",
            "Python",
            "Objective-C",
            "Ruby"
        ]
    })
        .then(res => this.storeOptions = res.options)
    },
    download() {
      imageDownload('#image');
    },
    upload(param) {
      console.log('param: ', param);
      // let file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('image', param.file);
      udAxios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          Authorization: "Client-ID " + '0259aa13deafaac' //放置你剛剛申請的Client-ID
        },
      }).then(res => console.log(res))
      .catch(err => console.log(err));
    },
    formSubmit: function(){
      this.$refs.form.validate(() => {
        this.udAlert({msg: "驗證成功!!"})
      });
    },
    toUrl(url) {
      location.href = url;
    },
    //API
    init() {
      udAxios.post(`echo.php`, {'123': 456}, {
          params: {
            from: "02-22",
            to: "02-29"
          },
          headers: {
            channel_id: "12345678"
          },
        }
      )
        .then(res => console.log('res', res))
        .catch(err => console.log('err', err))
    },
    getData() {
      udAxios.get(BASE_URL + `ajax/success.php`).then(res => {
        this.userData = res.userData;
      });
    },
    postData() {
      udAxios.post(BASE_URL + `ajax/success.php`, {
          mail: "udon8327@gmail.com",
          name: "UDON",
        }, {
        params: {
          from: 123,
          to: 456
        }
      })
        .then(res => {
          console.log("res: ", res);
        })
    },
    checkAlert() {
      this.udAlert({
        msg: "測試",
        confirm: true
      })
        .then(() => {})
        .catch(() => {})
    },
    handlePreview(item) {
      console.log(item);
    },
    handleRemove(item) {
      console.log(item);
    },
    beforeUpload(item) {
      console.log(item);
    }
  }
});