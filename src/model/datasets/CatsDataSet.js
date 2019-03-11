import MemoryCard from '../MemoryCard';
import { SET_REQUIRED_COUNT } from '../../constants';
import AbstractDataSet from './AbstractDataSet';

export default class CatsDataSet extends AbstractDataSet {
  static get name() {
    return 'cats';
  }

  static get extension() {
    return 'jpg';
  }

  baseName = 'cat';

  constructor(count = SET_REQUIRED_COUNT) {
    super();
    this.count = count;
  }

  * catsGenerator() {
    for (const index of [...Array(this.flipCounter).keys()]) {
      yield new MemoryCard(this.baseName + (index + 1), CatsDataSet.name, CatsDataSet.extension);
    }
  }

  [Symbol.iterator] = this.catsGenerator;
}
