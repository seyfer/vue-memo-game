import MemoryCard from './MemoryCard';
import { MAX_COUNT, MIN_COUNT } from '../constants';

export default class DataSetValidator {

  static getHandler() {
    return {
      construct(target, args) {
        const instance = new target(...args);

        const cardsCount = [...instance].length;

        if (cardsCount < MIN_COUNT || cardsCount > MAX_COUNT) {
          throw new TypeError(`Set cards count must be between ${MIN_COUNT} and ${MAX_COUNT}`);
        }

        if (cardsCount % 2 !== 0) {
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
