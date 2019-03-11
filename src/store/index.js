import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    flipCounter: 0,
  },
  mutations: {
    incrementFlipCounter(state) {
      state.flipCounter++;
    },
  },
});

export default store;
