<template>
    <div class="container">
        <section class="header">
            <app-selector
                    :id="'data-set-selector'"
                    :label="'Selected Cards Data Set'" :options="$options.dataSets" v-model="selectedDataSet"
            />
            <app-selector
                    :id="'difficulty-selector'"
                    :label="'Difficulty'" :options="$options.difficulties" v-model="selectedDifficulty" />

            <button @click="startGame(selectedDataSet, selectedDifficulty)"
                    class="header__button">
                New Game
            </button>
        </section>

        <section class="stats">
            <span>Clicks count: {{ flipCounter }}</span>
            <span>Clicks left: {{ flipsLeft }}</span>
        </section>

        <memory-game-result v-if="endGame" />
        <section class="container__game" v-else>
            <section class="memory-game" v-if="!cards.isEmpty()">
                <memory-card v-for="(card, index) in shuffledDoubleCards" :key="card.name + index"
                             :card="card" />
            </section>
            <section v-else>
                <div class="error">{{ cards.emptinessReason }}</div>
            </section>
        </section>
    </div>
</template>

<script>
  import MemoryCard from './MemoryCard';
  import DataSetFactory from '../model/DataSetFactory';
  import ArrayMixin from './mixins/array-mixin';
  import AppSelector from './common/AppSelector';
  import { DATA_SETS, DIFFICULTIES } from '../constants';
  import { delay } from 'lodash';
  import { mapState, mapActions, mapGetters } from 'vuex';
  import MemoryGameResult from './MemoryGameResult';

  export default {
    dataSets: DATA_SETS,
    difficulties: DIFFICULTIES,
    components: {
      MemoryGameResult,
      MemoryCard,
      AppSelector,
    },
    mixins: [ArrayMixin],
    data() {
      return {
        selectedDataSet: DATA_SETS.FRAMEWORKS,
        selectedDifficulty: DIFFICULTIES.NORMAL,
        endGame: false,
      };
    },
    computed: {
      shuffledDoubleCards() {
        return this.shuffle(this.playCards);
      },
      ...mapState(['cards', 'playCards', 'flipCounter']),
      ...mapGetters(['flipsLeft', 'notSolvedCardsCount', 'isEndGame']),
    },
    watch: {
      async selectedDataSet(dataSetName) {
        await this.startGame(dataSetName, this.selectedDifficulty);
      },
      async selectedDifficulty(value) {
        await this.startGame(this.selectedDataSet, value);
      },
      isEndGame(newValue) {
        newValue
          ? delay(() => this.endGame = newValue, 1000)
          : this.endGame = false;
      },
    },
    async created() {
      await this.startGame(this.selectedDataSet, this.selectedDifficulty);
    },
    methods: {
      async startGame(dataSetName, difficulty) {
        await this.initCards((new DataSetFactory()).create(dataSetName));
        this.setDifficulty(difficulty);

        await this.$nextTick();

        this.initGame();
      },
      ...mapActions(['initGame', 'initCards', 'setDifficulty']),
    },
  };
</script>
