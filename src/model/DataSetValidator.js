import MemoryCard from './MemoryCard';

export default class DataSetValidator {

  static getHandler() {
    return {
      construct(target, args) {
        const instance = new target(...args);

        if ([...instance].length % 2 !== 0) {
          throw new TypeError('Set must return odd number of cards');
        }

        for (const card of instance) {
          if (card.__proto__ !== MemoryCard.prototype) {
            throw new TypeError('Every Card must be MemoryCard instance');
          }
        }

        return instance;
      },
    };
  }
}
