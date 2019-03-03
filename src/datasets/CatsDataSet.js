import MemoryCard from '../model/MemoryCard';

export default class CatsDataSet {
  static get name() {
    return 'cats';
  }

  static get extension() {
    return 'jpg';
  }

  baseName = 'cat';

  constructor(count = 6) {
    this.count = count;
  }

  * catsGenerator() {
    for (const index of [...Array(this.count).keys()]) {
      yield new MemoryCard(this.baseName + (index + 1), CatsDataSet.name, CatsDataSet.extension);
    }
  }

  [Symbol.iterator] = this.catsGenerator;
}
