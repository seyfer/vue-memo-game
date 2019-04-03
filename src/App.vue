<template>
    <memory-game />
</template>

<script>
  import MemoryGame from './components/MemoryGame';

  export default {
    name: 'app',
    components: {
      MemoryGame,
    },
  };
</script>

<style lang="scss">
    @import "assets/main";
</style>
