<template>
    <div v-if="card"
         class="memory-card" :class="classes"
         :data-name="card.name"
         @click="flipCard(card)"
    >
        <img class="front-face" :src="cardImagePath" :alt="card.name|ucFirst" />
        <img class="back-face" :src="badgeImagePath" :alt="card.dataSetName + 'Badge'" />
    </div>
</template>

<script>
  import MemoryCard from '../model/MemoryCard';
  import FilterMixin from './mixins/filter-mixin';
  import { mapActions } from 'vuex';

  export default {
    mixins: [FilterMixin],
    props: {
      card: {
        type: MemoryCard,
        default: null,
      },
    },
    computed: {
      cardImagePath() {
        return `/img/datasets/${this.card.dataSetName}/${this.card.name}.${this.card.extension}`;
      },
      badgeImagePath() {
        return `/img/datasets/${this.card.dataSetName}/badge.${this.card.extension}`;
      },
      classes() {
        return this.card.flipped ? ['flip'] : [];
      },
    },
    methods: {
      ...mapActions(['flipCard']),
    },
  };
</script>
