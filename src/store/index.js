import Vue from 'vue';
import Vuex from 'vuex';
import pathify, { make } from 'vuex-pathify';
// set options
pathify.options.mapping = 'simple';

Vue.use(Vuex);

const state = {
  flipCounter: 0,
  cards: [],
  playCards: [],
  hasFlippedCard: false,
  lockBoard: false,
  firstFlippedCard: null,
  secondFlippedCard: null,
};

const findCard = (cards, uuid) => cards.find(playCard => playCard.uuid === uuid);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    pathify.plugin,
  ],
  state: state,
  mutations: {
    incrementFlipCounter(state) {
      state.flipCounter++;
    },
    dropFlipCounter(state) {
      state.flipCounter = 0;
    },
    resetBoard(state) {
      state.hasFlippedCard = state.lockBoard = false;
      state.firstFlippedCard = state.secondFlippedCard = false;
    },
    setCardFlipped(state, card) {
      findCard(state.playCards, card.uuid).flipped = true;
    },
    setCardUnFlipped(state, card) {
      findCard(state.playCards, card.uuid).flipped = false;
    },
    ...make.mutations(state),
  },
  getters: {
    doubleCards(state) {
      return [...state.cards, ...state.cards];
    },
  },
  actions: {
    initCards({ getters }, cards) {
      store.set('cards', cards);
      store.set('playCards', getters.doubleCards);
    },
    initGame({ commit }) {
      commit('dropFlipCounter');
      commit('resetBoard');
    },
    flipCard({ dispatch, commit, state }, card) {
      if (card.solved || state.lockBoard || card.uuid === state.firstFlippedCard.uuid) {
        return;
      }

      commit('setCardFlipped', card);

      if (!state.hasFlippedCard) {
        // first click
        store.set('hasFlippedCard', true);
        store.set('firstFlippedCard', card);

        return;
      }

      // second click
      store.set('secondFlippedCard', card);

      dispatch('checkForMatch');
    },
    checkForMatch({ dispatch, state }) {
      const isMatch = state.firstFlippedCard.name === state.secondFlippedCard.name;

      isMatch ? dispatch('solveCards') : dispatch('unFlipCards');
    },
    solveCards({ commit }) {
      store.set('firstFlippedCard@solved', true);
      store.set('secondFlippedCard@solved', true);

      commit('resetBoard');
    },
    unFlipCards({ commit, state }) {
      store.set('lockBoard', true);

      setTimeout(() => {
        commit('setCardUnFlipped', state.firstFlippedCard);
        commit('setCardUnFlipped', state.secondFlippedCard);

        store.set('firstFlippedCard@flipped', false);
        store.set('secondFlippedCard@flipped', false);

        commit('resetBoard');
      }, 700);
    },
  },
});

export default store;
