export default class InvalidDataSet {
  * dumbGenerator() {
    yield * [...Array(5).keys()];
  }

  [Symbol.iterator] = this.dumbGenerator;
}
