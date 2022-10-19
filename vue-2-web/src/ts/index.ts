declare var $: (selector: string) => any;

let vm = new Vue({
  el: "#app",
  data: {
    isModalShow: true
  },
  mounted() {
    this.getData();
  },
  computed: {
  },
  methods: {
    getData() {
      udAxios.get(`products`)
        .then(res => {
        }).catch(err => {});
    },
    toDemo() {
      location.href = 'demo.html';
    },
    submitForm(event) {
      console.log('submit!!');
      event.preventDefault(event);
      document.getElementById('form').submit();
    }
  }
});