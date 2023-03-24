declare var $: (selector: string) => any;

let vm = new Vue({
  el: "#app",
  data: {
    messageId: "1655285121",
    loginId: "1655285115",
    AddFriendLine: "https://line.me/R/ti/p/@524wuemo",
    LiffId: "1655285115-GJW2kzl7",
  },
  mounted() {
    this.lineLogin();
  },
  computed: {
  },
  methods: {
    lineLogin() {
      location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${this.loginId}redirect_uri=${encodeURIComponent(location.href)}&state=coolbe&scope=openid%20profile`
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
  }
});