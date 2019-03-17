import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    flipCounter: 0,
    cards: [],
  },
  mutations: {
    incrementFlipCounter(state) {
      state.flipCounter++;
    },
    setCards(state, cards) {
      state.cards = cards;
    },
  },
  getters: {
    doubleCards(state) {
      return [...state.cards, ...state.cards];
    },
    cards(state) {
      return state.cards;
    },
  },
});

export default store;
