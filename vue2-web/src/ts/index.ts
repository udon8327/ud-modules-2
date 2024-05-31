declare var $: (selector: string) => any;

let vm = new Vue({
  el: "#app",
  data: {
    isCrossOrigin: true,
    imageUrl: "",
    link: "",
  },
  mounted() {
    this.initWidget();
  },
  computed: {
  },
  methods: {
    initWidget() {
      window.addEventListener("message", (event) => {
        try {
          let params = JSON.parse(event.data);
          // console.log('fromMainParams: ', params);
          if (params.imageUrl) this.imageUrl = params.imageUrl;
        } catch (error) {
          console.log(error);
        }
      });
    },
    toLink() {
      this.postMain({ link: true });
    },
    close() {
      this.postMain({ close: true });
    },
    // tools
    // 向主頁面發送數據
    postMain(data) {
      window.parent.postMessage(
        JSON.stringify(data),
        this.isCrossOrigin ? "*" : location.origin
      );
    },
  }
});