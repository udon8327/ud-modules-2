<template lang="pug">
#demo
  .link-button
    ud-button(@click="toIndex" circle plain) X
  ud-form(:rules="rules" :model="formData" ref="form")
    ud-form-item(label="姓名" prop="name" flex)
      ud-input(placeholder="請輸入您的姓名" v-model="formData.name")
    ud-form-item(label="備註" prop="note" flex)
      ud-textarea(placeholder="請輸入您的備註" v-model="formData.note" show-limit :limit="10" no-resize)
    ud-form-item(label="年齡" prop="age" flex) 
      ud-input(placeholder="請輸入您的年齡" v-model="formData.age" type="tel")
    ud-form-item(label="單選" prop="radio" flex)
      ud-radio(v-model="formData.radio" :options="options" flex @change="onChange" @blur="onBlur" @focus="onFocus")
    ud-form-item(label="多選" prop="checkbox" flex)
      ud-checkbox(v-model="formData.checkbox" :options="options" flex @change="onChange" @blur="onBlur" @focus="onFocus")
    ud-form-item(label="下拉" prop="select" flex)
      ud-select(v-model="formData.select" :options="options" flex center)
    ud-form-item(label="下拉連動" prop="selectLink" flex)
      ud-select-link(v-model="formData.selectLink" :options="storeOptions" :placeholder="['縣市', '行政區', '分店']" flex third)
    ud-form-item(label="下拉連動(獨立)" prop="selectLinkSp")
      .d-flex
        ud-select(v-model="formData.selectLinkSp[0]" :options="storeOptions" :group="formData.selectLinkSp" :index="0" placeholder="請選擇縣市")
        ud-select(v-model="formData.selectLinkSp[1]" :options="storeOptions" :group="formData.selectLinkSp" :index="1" placeholder="請選擇店點")
        ud-select(v-model="formData.selectLinkSp[2]" :options="storeOptions" :group="formData.selectLinkSp" :index="2" placeholder="請選擇日期")
    ud-form-item(label="地址" prop="twzip" flex)
      ud-select-twzip(ref="zip" v-model="formData.twzip" flex)
    ud-form-item(label="預約日期" prop="date" flex)
      ud-select-date(v-model="formData.date" flex third roc)
        p 年
        p(slot="second") 月
        p(slot="third") 日
    ud-form-item(label="是否啟用" prop="isActive" flex)
      ud-switch(v-model="formData.isActive")
    ud-form-item(label="" prop="isAgree")
      ud-checkbox(v-model="formData.isAgree")
        p 我同意#[a(href="https://www.google.com.tw/") 使用者條款]
    //- ud-form-item(label="驗證碼" prop="captcha" flex)
    //-   .captcha-wrapper
    //-     ud-input(v-model="formData.captcha" placeholder="驗證碼" maxlength="4")
    //-     ud-captcha(v-model="formData.captchaCode")
    hr(style="margin-bottom: 20px")

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
import Tree from "@/components/Tree.vue";

export default {
  name: "Index",
  components: {
    Tree,
  },
  data() {
    return {
      isModalShow: false,
      isCollapse: false,
      formData: {
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
        {label: "甲", value: "a"},
        {label: "乙", value: "b"},
        {label: "丙", value: "c", disabled: true},
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
  mounted() {
  },
  methods: {
    getRandom() {
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
    onChange(e) {
      console.log("onChange", e); 
    },
    onBlur(e) {
      console.log("onBlur", e); 
    },
    onFocus(e) {
      console.log("onFocus", e); 
    },
    timeup() {
      console.log('timeup');
    },
  },
};
</script>

<style lang="sass" scoped>
.link-button
  position: absolute
  right: 10px
  top: 10px
</style>