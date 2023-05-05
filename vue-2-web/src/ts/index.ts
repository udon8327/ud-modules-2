declare var $: (selector: string) => any;

let vm = new Vue({
  el: "#app",
  data: {
  },
  mounted() {
    // this.getData();
    let video = document.getElementById("video");
    video.play();
  },
  computed: {
  },
  methods: {
    play() {
      let video = document.getElementById("video");
      video.play();
    },
    getData() {
      udAxios.get(`products`)
        .then(res => {
        }).catch(err => {});
    },
  }
});