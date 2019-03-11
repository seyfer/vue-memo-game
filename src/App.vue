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
    mounted() {
      console.log(this.$store);
    },
  };
</script>

<style lang="scss">
    @import "assets/main";
</style>
