<template>
    <div class="container">
        <section class="header">
            <selector :label="'Selected Cards Data Set'" :options="$options.dataSets" v-model="selectedDataSet" />
            <selector :label="'Difficulty'" :options="$options.difficulties" v-model="selectedDifficulty" />

            <button @click="startGame(selectedDataSet)"
                    class="header__button">New Game
            </button>
        </section>
        <section class="stats">
            <span>Clicks count: {{ flipCounter }}</span>
            <span>Clicks left: {{ flipsLeft }}</span>
        </section>
        <section class="memory-game" v-if="!cards.isEmpty()">
            <memory-card v-for="(card, index) in shuffledDoubleCards" :key="card.name + index"
                         :card="card" />
        </section>
        <section v-else>
            <div class="error">{{ cards.emptinessReason }}</div>
        </section>
    </div>
</template>

<script>
  import MemoryCard from './MemoryCard';
  import DataSetFactory from '../model/DataSetFactory';
  import ArrayMixin from './mixins/array-mixin';
  import Selector from './common/Selector';
  import { DATA_SETS, DIFFICULTIES } from '../constants';

  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    dataSets: DATA_SETS,
    difficulties: DIFFICULTIES,
    components: {
      MemoryCard,
      Selector,
    },
    mixins: [ArrayMixin],
    data() {
      return {
        hasFlippedCard: false,
        lockBoard: false,
        selectedDataSet: DATA_SETS.FRAMEWORKS,
        selectedDifficulty: DIFFICULTIES.NORMAL,
      };
    },
    computed: {
      shuffledDoubleCards() {
        return this.shuffle(this.playCards);
      },
      ...mapState(['cards', 'playCards', 'flipCounter']),
      ...mapGetters(['flipsLeft']),
    },
    watch: {
      async selectedDataSet(dataSetName) {
        await this.startGame(dataSetName, this.selectedDifficulty);
      },
      async selectedDifficulty(value) {
        await this.startGame(this.selectedDataSet, value);
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
