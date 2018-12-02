<template>
    <card-game/>
</template>

<script>
  import CardGame from './components/CardGame';

  export default {
    name: 'app',
    components: {
      CardGame,
    },
  };
</script>

<style lang="scss">
    @import "assets/main";
</style>
