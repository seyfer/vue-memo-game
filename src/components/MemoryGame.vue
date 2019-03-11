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

  export default {
    components: {
      MemoryCard,
      DataSetSelector,
    },
    mixins: [ArrayMixin],
    data() {
      return {
        cards: (new DataSetFactory()).create(this.selectedDataSet),
        hasFlippedCard: false,
        lockBoard: false,
        selectedDataSet: DATA_SETS.FRAMEWORKS,
      };
    },
    computed: {
      doubleCards() {
        return [...this.cards, ...this.cards];
      },
      shuffledDoubleCards() {
        return this.shuffle(this.doubleCards);
      },
    },
    watch: {
      async selectedDataSet(value) {
        this.cards = (new DataSetFactory()).create(value);

        await this.$nextTick();

        this.initGame();
      },
    },
    mounted() {
      this.initGame();
    },
    methods: {
      initGame() {
        const self = this;

        let firstCard = null;
        let secondCard = null;
        this.hasFlippedCard = this.lockBoard = false;

        function flipCard() {
          if (self.lockBoard) return;
          if (this === firstCard) return;

          this.classList.add('flip');

          if (!self.hasFlippedCard) {
            // first click
            self.hasFlippedCard = true;
            firstCard = this;

            return;
          }

          // second click
          secondCard = this;

          checkForMatch();
        }

        function checkForMatch() {
          // todo: should use MemoryCard class
          const isMatch = firstCard.dataset.name === secondCard.dataset.name;

          isMatch ? disableCards() : unflipCards();
        }

        function disableCards() {
          firstCard.removeEventListener('click', flipCard);
          secondCard.removeEventListener('click', flipCard);

          resetBoard();
        }

        function unflipCards() {
          self.lockBoard = true;

          setTimeout(() => {
            // todo: should use MemoryCard class property - flipped
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
          }, 700);
        }

        function resetBoard() {
          [self.hasFlippedCard, self.lockBoard] = [false, false];
          [firstCard, secondCard] = [null, null];
        }

        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => card.addEventListener('click', flipCard));
      },
    },
  };
</script>
