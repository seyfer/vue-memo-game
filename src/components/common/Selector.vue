<template>
    <section class="selector">
        <label v-if="label.length > 0">{{ label }}</label>
        <div class="selector__select">
            <select @change="onChange">
                <option v-for="option in options"
                        :key="option"
                        :value="option"
                        :selected="option === value"
                >
                    {{ option|ucFirst }}
                </option>
            </select>
        </div>
    </section>
</template>

<script>
  import FilterMixin from './../mixins/filter-mixin';

  export default {
    mixins: [FilterMixin],
    props: {
      value: {
        type: String,
      },
      label: {
        type: String,
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
      onChange(e) {
        this.$emit('input', e.target.value);
      },
    },
  };
</script>
