import CatsDataSet from '../datasets/CatsDataSet';
import JSFrameworksDataSet from '../datasets/JSFrameworksDataSet';

export default class DataSetFactory {
  classMap = {
    __default: JSFrameworksDataSet,
    cats: CatsDataSet,
    frameworks: JSFrameworksDataSet,
  };

  create (name, ...args) {
    const CLASS = this.classMap[name] || this.classMap.__default;
    return new CLASS(...args);
  }
}
