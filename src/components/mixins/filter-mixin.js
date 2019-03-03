export default {
  filters: {
    ucFirst(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
