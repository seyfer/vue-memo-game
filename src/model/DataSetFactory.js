import CatsDataSet from './datasets/CatsDataSet';
import JSFrameworksDataSet from './datasets/JSFrameworksDataSet';
import DataSetValidator from './DataSetValidator';
import EmptyDataSet from './datasets/EmptyDataSet';
import InvalidDataSet from './datasets/InvalidDataSet';

export default class DataSetFactory {
  classMap = {
    default: JSFrameworksDataSet,
    cats: CatsDataSet,
    frameworks: JSFrameworksDataSet,
    invalid: InvalidDataSet,
  };

  create(name, ...args) {
    const instanceClass = this.classMap[name] || this.classMap.default;

    try {
      //validate
      const validationProxy = new Proxy(instanceClass, DataSetValidator.getHandler());

      console.clear();

      return new validationProxy(...args);
    } catch (e) {
      console.error(e.message);

      const emptySet = new EmptyDataSet();
      emptySet.emptinessReason = e.message;
      return emptySet;
    }
  }
}
