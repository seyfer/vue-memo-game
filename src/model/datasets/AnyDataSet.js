import AbstractDataSet from './AbstractDataSet';
import MemoryCard from '../MemoryCard';

/* eslint-disable */
export default class AnyDataSet extends AbstractDataSet {
  count = 12;

  static get extension() {
    return 'png';
  }

  * anyGenerator() {
    for (const index of [...Array(this.count).keys()]) {
      yield new MemoryCard('any', 'any', AnyDataSet.extension);
    }
  }

  [Symbol.iterator] = this.anyGenerator;
}
