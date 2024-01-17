declare var $: (selector: string) => any;

let vm = new Vue({
  el: "#app",
  data: {
    isModalShow: false,
    isCollapse: false,
    sessionStorage: "",
    localStorage: "",
    gender: "",
    birth: "",
    user: {
      name: "",
      phone: ["", "", ""],
      note: "",
      age: "",
      birthday: "",
      radio: "",
      checkbox: [],
      select: "",
      selectLink: ["", "", ""],
      selectLinkSp: ["", "", ""],
      twzip: ["", ""],
      date: ["", "", ""],
      isActive: false,
      captcha: "",
      captchaCode: "",
      isAgree: false,
    },
    rules: {
      name: [{type: "required"}, {type: "name" }],
      phone: [{type: "required"}],
      note: [{type: "required"}],
      age: [{type: "required"}, {type: "number" }],
      birthday: [{type: "required"}, {type: "date" }],
      radio: [{type: "required"}],
      checkbox: [{type: "required"}],
      select: [{type: "required"}],
      selectLink: [{type: "required"}],
      selectLinkSp: [{type: "required"}],
      twzip: [{type: "required"}],
      date: [{type: "required"}],
      isAgree: [{type: "required", message: "請先同意相關使用條款"},],
      captcha: [{type: "required"}, {type: "equal", equalTo: "captchaCode", caseIgnore: "true"}],
    },
    options: [
      {label: "甲", value: "a", disabled: true},
      {label: "乙", value: "b"},
      {label: "丙", value: "c"},
    ],
    storeOptions: [
      {label: "台北市", value: "taipei", children: [
        {label: "中正區", value: "100", children: [
          {label: "2023-12-01", value: "1" },
          {label: "2023-12-02", value: "2", disabled: "true" }
        ]},
        {label: "大安區", value: "106", disabled: true, children: [
          {label: "2023-12-03", value: "3" },
          {label: "2023-12-04", value: "4" },
        ]},
        {label: "信義區", value: "110", children: [
          {label: "2023-12-05", value: "5" },
          {label: "2023-12-06", value: "6" },
        ]},
      ]},
      {label: "新北市", value: "newTaipei", children: [
        {label: "板橋區", value: "220", children: [
          {label: "2023-12-07", value: "7" },
          {label: "2023-12-08", value: "8" },
        ]},
        {label: "永和區", value: "234", children: [
          {label: "2023-12-09", value: "9" },
          {label: "2023-12-10", value: "10", disabled: true },
        ]},
        {label: "新店區", value: "231", children: [
          {label: "2023-12-11", value: "11", disabled: true },
          {label: "2023-12-12", value: "12", disabled: true },
        ]},
      ]},
    ],
  },
  mounted() {
    liff.init({liffId: "1655285115-LaWdxbOP"}).then(() => {
      console.log("liff init success");
      this.sessionStorage = sessionStorage.getItem("sessionStorage");
      this.localStorage = localStorage.getItem("localStorage");
    }).catch(() => {
      console.log("liff init error");
    })
    // udAxios.post("/tests", {}, {
    //   noAlert: true,
    // })
    //   .then((res) => {
    //     console.log('res: ', res);
    //   })
    // this.udAlert({
    //   confirm: true,
    //   maskClose: true,
    //   btnClose: true,
    //   scrollLock: false,
    //   title: "錯誤",
    //   message: "發生錯誤\n請稍候再試<i>！</i>",
    //   confirmText: "確定鈕",
    //   onConfirm: () => {
    //     console.log("點擊確定");
    //   },
    //   cancelText: "取消鈕",
    // }).catch(() => {
    //   console.log("點擊取消");
    // })
    // this.postData();
  },
  computed: {
  },
  methods: {
    setItem() {
      sessionStorage.setItem("sessionStorage", "true");
      localStorage.setItem("localStorage", "true");
    },
    removeItem() {
      sessionStorage.removeItem("sessionStorage");
      localStorage.removeItem("localStorage");
    },
    test() {
      console.log(Date.now());
    },
    focus(type) {
      $(type).focus();
      // $(type).trigger("click");
    },
    getData() {
      udAxios.get('test')
        .then(res => {
          console.log('res: ', res);
        })
    },
    postData() {
      udAxios.post('test', {
        name: "UDON"
      }, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then(res => {
          console.log('res: ', res);
        })
    },
    alert() {
      udAlert("警告\n彈窗");
    },
    timeup() {
      console.log('時間到');
    },
    formSubmit: function(){
      this.$refs.form.validate(() => {
        this.udAlert({msg: "驗證成功!!"})
      });
    },
  }
});