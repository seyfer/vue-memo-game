<template>
    <section class="memory-game">
        <memory-card v-for="(card, index) in shuffledDoubleCards" :key="card + index"
                     :card="card"/>
    </section>
</template>

<script>
  import MemoryCard from './MemoryCard';
  import DataSetFactory from '../datasets/DataSetFactory';
  import ArrayMixin from './mixins/array-mixin';

  export default {
    data () {
      return {
        cards: (new DataSetFactory()).create('cats'),
        hasFlippedCard: false,
        lockBoard: false,
      };
    },
    components: {
      MemoryCard,
    },
    mixins: [ArrayMixin],
    computed: {
      doubleCards () {
        return [...this.cards, ...this.cards];
      },
      shuffledDoubleCards () {
        return this.shuffle(this.doubleCards);
      },
    },
    mounted () {
      const self = this;

      let firstCard, secondCard;

      function flipCard () {
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

      function checkForMatch () {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
      }

      function disableCards () {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
      }

      function unflipCards () {
        self.lockBoard = true;

        setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');

          resetBoard();
        }, 700);
      }

      function resetBoard () {
        [self.hasFlippedCard, self.lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
      }

      const cards = document.querySelectorAll('.memory-card');
      cards.forEach(card => card.addEventListener('click', flipCard));
    },
  };
</script>
