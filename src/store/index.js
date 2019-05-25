import Vue from 'vue';
import Vuex from 'vuex';
import pathify, { make } from 'vuex-pathify';
import { DIFFICULTY_TO_FLIPS } from '../constants';
// set options
pathify.options.mapping = 'simple';

Vue.use(Vuex);

const state = {
  flipCounter: 0,
  flipLimit: 100,
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
      return 'doubleCards' in state.cards ? state.cards.doubleCards() : [...state.cards, ...state.cards];
    },
    flipsLeft(state) {
      return state.flipCounter < state.flipLimit ? state.flipLimit - state.flipCounter : 0;
    },
    notSolvedCardsCount(state) {
      return state.playCards.filter((card) => !card.solved).length;
    },
    isWin(state, getters) {
      return state.playCards.length > 0 && getters.notSolvedCardsCount === 0 && getters.flipsLeft >= 0;
    },
    isLose(state, getters) {
      return getters.flipsLeft === 0 && getters.notSolvedCardsCount > 0;
    },
    isEndGame(state, getters) {
      return getters.isWin || getters.isLose;
    },
    score(state, getters) {
      return getters.isEndGame ? state.flipLimit - state.flipCounter : 0;
    },
  },
  actions: {
    setDifficulty({state}, value) {
      const flips = Math.ceil([...state.cards].length * DIFFICULTY_TO_FLIPS[value]);
      store.set('flipLimit', flips || 100);
    },
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
      commit('incrementFlipCounter');

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
