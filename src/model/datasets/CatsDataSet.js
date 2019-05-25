import MemoryCard from '../MemoryCard';
import { DEFAULT_COUNT } from '../../constants';
import AbstractDataSet from './AbstractDataSet';

export default class CatsDataSet extends AbstractDataSet {
  static get name() {
    return 'cats';
  }

  static get extension() {
    return 'jpg';
  }

  baseName = 'cat';

  constructor(count = DEFAULT_COUNT) {
    super();
    this.count = count;
  }

  * catsGenerator() {
    for (const index of [...Array(this.count).keys()]) {
      yield new MemoryCard(this.baseName + (index + 1), CatsDataSet.name, CatsDataSet.extension);
    }
  }

  [Symbol.iterator] = this.catsGenerator;
}
