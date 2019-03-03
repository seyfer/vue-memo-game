export default {
  methods: {
    shuffle(array) {
      const tmpArray = array.slice();
      for (let i = tmpArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tmpArray[i], tmpArray[j]] = [tmpArray[j], tmpArray[i]];
      }
      return tmpArray;
    },
  },
};
