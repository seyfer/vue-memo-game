<template>
    <section class="data-set-selector">
        <label>Selected Cards Data Set</label>
        <div class="data-set-selector-select">
            <select @change="onChange">
                <option v-for="dataSet in $options.dataSets"
                        :key="dataSet"
                        :value="dataSet"
                        :selected="dataSet === selected"
                >
                    {{dataSet|ucFirst}}
                </option>
            </select>
        </div>
    </section>
</template>

<script>
  import { DATA_SETS } from '../constants';
  import FilterMixin from './mixins/filter-mixin';

  export default {
    dataSets: DATA_SETS,
    mixins: [FilterMixin],
    props: {
      selected: {
        type: String,
      },
    },
    methods: {
      onChange (e) {
        this.$emit('input', e.target.value);
      },
    },
  };
</script>
