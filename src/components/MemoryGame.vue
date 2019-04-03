<template>
    <div class="container">
        <data-set-selector v-model="selectedDataSet" />
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
  import DataSetSelector from './DataSetSelector';
  import { DATA_SETS } from '../constants';

  import { mapState, mapActions } from 'vuex';

  export default {
    components: {
      MemoryCard,
      DataSetSelector,
    },
    mixins: [ArrayMixin],
    data() {
      return {
        hasFlippedCard: false,
        lockBoard: false,
        selectedDataSet: DATA_SETS.FRAMEWORKS,
      };
    },
    computed: {
      shuffledDoubleCards() {
        return this.shuffle(this.playCards);
      },
      ...mapState(['cards', 'playCards']),
    },
    watch: {
      async selectedDataSet(value) {
        await this.initCards((new DataSetFactory()).create(value));

        await this.$nextTick();

        this.initGame();
      },
    },
    async created() {
      await this.initCards((new DataSetFactory()).create(this.selectedDataSet));

      await this.$nextTick();

      this.initGame();
    },
    methods: {
      ...mapActions(['initGame', 'initCards']),
    },
  };
</script>
