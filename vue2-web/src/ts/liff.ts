let vm = new Vue({
  el: "#app",
  data: {
    profile: {},
    liffState: "",
    id: "",
  },
  mounted() {
    this.liffState = queryString("liff.state");
    this.id = queryString("id");
    liff
      .init({
        liffId: "1655285115-WMzxMo6m",
      })
      .then(() => {
        // 檢查是否登入
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: location.href });
          return;
        }
        // 檢查是否好友
        liff
          .getFriendship()
          .then((data) => {
            if (data.friendFlag) {
              liff.getProfile().then((res) => {
                this.profile = res;
              })
            } else {
              location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655285115&redirect_uri=${encodeURIComponent(
                location.href
              )}&scope=profile%20openid%20phone%20email&bot_prompt=aggressive&prompt=consent&state=${Date.now()}`;
            }
          })
          .catch(() => {
            liff.logout();
            location.reload();
          });
      })
      .catch((err) => {
        udAlert(`[${err.code}] ${err.message}\nLIFF初始化失敗，請稍後再試`).then(
          () => location.reload()
        );
      });
  },
  computed: {
  },
  methods: {
  }
});