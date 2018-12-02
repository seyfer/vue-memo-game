<template>
    <section class="memory-game">
        <div class="memory-card" data-framework="aurelia">
            <img class="front-face" src="../../public/img/aurelia.svg" alt="Aurelia"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>
        <div class="memory-card" data-framework="aurelia">
            <img class="front-face" src="../../public/img/aurelia.svg" alt="Aurelia"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>

        <div class="memory-card" data-framework="vue">
            <img class="front-face" src="../../public/img/vue.svg" alt="Vue"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>
        <div class="memory-card" data-framework="vue">
            <img class="front-face" src="../../public/img/vue.svg" alt="Vue"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>

        <div class="memory-card" data-framework="angular">
            <img class="front-face" src="../../public/img/angular.svg" alt="Angular"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>
        <div class="memory-card" data-framework="angular">
            <img class="front-face" src="../../public/img/angular.svg" alt="Angular"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>

        <div class="memory-card" data-framework="ember">
            <img class="front-face" src="../../public/img/ember.svg" alt="Ember"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>
        <div class="memory-card" data-framework="ember">
            <img class="front-face" src="../../public/img/ember.svg" alt="Ember"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>

        <div class="memory-card" data-framework="backbone">
            <img class="front-face" src="../../public/img/backbone.svg" alt="Backbone"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>
        <div class="memory-card" data-framework="backbone">
            <img class="front-face" src="../../public/img/backbone.svg" alt="Backbone"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>

        <div class="memory-card" data-framework="react">
            <img class="front-face" src="../../public/img/react.svg" alt="React"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>
        <div class="memory-card" data-framework="react">
            <img class="front-face" src="../../public/img/react.svg" alt="React"/>
            <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'CardGame',
    mounted () {
      const cards = document.querySelectorAll('.memory-card');

      let hasFlippedCard = false;
      let lockBoard = false;
      let firstCard, secondCard;

      function flipCard () {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
          // first click
          hasFlippedCard = true;
          firstCard = this;

          return;
        }

        // second click
        secondCard = this;

        checkForMatch();
      }

      function checkForMatch () {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        isMatch ? disableCards() : unflipCards();
      }

      function disableCards () {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
      }

      function unflipCards () {
        lockBoard = true;

        setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');

          resetBoard();
        }, 1500);
      }

      function resetBoard () {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
      }

      (function shuffle () {
        cards.forEach(card => {
          let randomPos = Math.floor(Math.random() * 12);
          card.style.order = randomPos;
        });
      })();

      cards.forEach(card => card.addEventListener('click', flipCard));
    },
  };
</script>

<style scoped>

</style>
