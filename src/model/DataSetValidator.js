import MemoryCard from './MemoryCard';
import { SET_REQUIRED_COUNT } from '../constants';

export default class DataSetValidator {

  static getHandler() {
    return {
      construct(target, args) {
        const instance = new target(...args);

        if ([...instance].length !== SET_REQUIRED_COUNT) {
          throw new TypeError(`Set must return ${SET_REQUIRED_COUNT} cards`);
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
