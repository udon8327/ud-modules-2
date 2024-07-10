<template lang="pug">
#demo
  .link-button
    ud-button(@click="toIndex" circle plain) X
  ud-form(:rules="rules" :model="user" ref="form")
    ud-form-item(label="姓名" prop="name" flex)
      ud-input(placeholder="請輸入您的姓名" v-model="user.name")
    p {{ user.name || "user.name" }}
    ud-textarea(placeholder="請輸入您的備註" v-model="user.note" show-limit :limit="10" @change="onChange" @blur="onBlur" @focus="onFocus")
    p {{ user.note || "user.note" }}
    ud-html(:text="user.note")
    ud-input(placeholder="請輸入您的年齡" v-model="user.age" type="tel")
    p {{ user.age || "user.age" }}
    ud-radio(v-model="user.radio" :options="options" flex)
    p {{ user.radio || "user.radio" }}
    ud-checkbox(v-model="user.checkbox" :options="options" flex)
    p {{ user.checkbox || "user.checkbox" }}
    ud-select(v-model="user.select" :options="options" flex center)
    p {{ user.select || "user.select" }}
    ud-select-link(v-model="user.selectLink" :options="storeOptions" :placeholder="['縣市', '行政區', '分店']" flex third)
    p {{ user.selectLink || "user.selectLink" }}
    .d-flex
      ud-select(v-model="user.selectLinkSp[0]" :options="storeOptions" :group="user.selectLinkSp" :index="0" placeholder="請選擇縣市")
      ud-select(v-model="user.selectLinkSp[1]" :options="storeOptions" :group="user.selectLinkSp" :index="1" placeholder="請選擇店點")
      ud-select(v-model="user.selectLinkSp[2]" :options="storeOptions" :group="user.selectLinkSp" :index="2" placeholder="請選擇日期")
    p {{ user.selectLinkSp || "user.selectLinkSp" }}
    ud-select-twzip(ref="zip" v-model="user.twzip" flex)
    p {{ user.twzip || "user.twzip" }}
    ud-select-date(v-model="user.date" flex third roc)
      p 年
      p(slot="second") 月
      p(slot="third") 日
    p {{ user.date || "user.date" }}
    ud-switch(v-model="user.isActive")
    p {{ user.isActive }}
    //- ud-checkbox(v-model="user.isAgree" options="我同意使用者條款" solid)
    ud-checkbox(v-model="user.isAgree")
      p 我同意#[a(href="https://www.google.com.tw/") 使用者條款]
    p {{ user.isAgree }}
    .captcha-wrapper
      ud-input(v-model="user.captcha" placeholder="驗證碼" maxlength="4")
      ud-captcha(v-model="user.captchaCode")
    div(style="margin-bottom: 60px")

    ud-button(@click="formSubmit") 送出表單
    ud-button(@click="isCollapse = !isCollapse") 摺疊容器&nbsp
      ud-arrow(color="#fff" :size="4" :width="2" :direction="isCollapse ? 'up' : 'down'")
    ud-collapse(v-model="isCollapse" :duration="0.4")
      ud-ratio(src="img/01.jpg" bg-size="contain")
    ud-button(@click="alert()") Alert
    ud-button(@click="isModalShow = true") Model

    ud-html(text="<i>用戶</i>自定\n<h3>義訊息</h3>")
    br
    ud-ellipsis(:max-line="2") 文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略
    br
    ud-countdown(:time="120" @timeup="timeup()" type="minute")
</template>

<script>

export default {
  name: "Index",
  components: {},
  data() {
    return {
      name: "",
      test: true,
      isModalShow: false,
      isCollapse: false,
      sessionStorage: "",
      localStorage: "",
      liffStatus: "",
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
    };
  },
  mounted() {},
  methods: {
    onTest() {
      console.log(this.getRandom());
    },
    formSubmit() {
      this.$refs.form.validate(() => {
        console.log("驗證成功");
      });
    },
    toIndex() {
      this.$router.push("/index");
    },
    onChange() {
      console.log("onChange", this.name); 
    },
    onBlur(e) {
      console.log("onBlur", e); 
    },
    onFocus(e) {
      console.log("onFocus", e); 
    }
  },
};
</script>

<style lang="sass" scoped>
.link-button
  position: absolute
  right: 10px
  top: 10px
</style>