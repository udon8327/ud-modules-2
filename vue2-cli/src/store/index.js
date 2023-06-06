import Vue from "vue";
import Vuex from "vuex";
import udAxios from "@/services/ud-axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    profile: null,
  },
  getters: {},
  actions: {
    getProfile({ commit }) {
      return udAxios
        .get(`/api/v1/personnel/user/profile`)
        .then((res) => {
          commit("setProfile", res);
          return res;
        })
        .catch(() => {});
    },
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload.data.personnel;
    },
  },
  modules: {},
});

export default store;
