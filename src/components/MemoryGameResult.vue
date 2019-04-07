<template>
    <section class="end-status">
        <h1 class="end-status__win" v-if="isWin">You win!</h1>
        <h1 class="end-status__lose" v-else>You lose!</h1>

        <div class="end-status__score">
            Your Score:
            <h1 class="end-status__score-number">{{ score }}</h1>
        </div>
    </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'MemoryGameResult',
    computed: {
      ...mapGetters(['isWin', 'isLose', 'score']),
    },
  };
</script>
