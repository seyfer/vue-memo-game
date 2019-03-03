<template>
    <div class="memory-card" :data-framework="frameworkName">
        <img class="front-face" :src="cardImagePath" :alt="frameworkName|ucFirst"/>
        <img class="back-face" src="../../public/img/js-badge.svg" alt="JS Badge"/>
    </div>
</template>

<script>
  export default {
    props: {
      frameworkName: {
        type: String,
      },
    },
    filters: {
      ucFirst (value) {
        return value.toUpperCase();
      },
    },
    computed: {
      cardImagePath () {
        return `/img/${this.frameworkName}.svg`;
      },
    },
  };
</script>
