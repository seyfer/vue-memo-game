import MemoryCard from '../MemoryCard';
import AbstractDataSet from './AbstractDataSet';

export default class JSFrameworksDataSet extends AbstractDataSet {
  static get name() {
    return 'frameworks';
  }

  static get extension() {
    return 'svg';
  }

  _cardsSet = ['aurelia', 'vue', 'angular', 'ember', 'backbone', 'react'];

  [Symbol.iterator] = () => {
    let index = 0;
    const data = this._cardsSet;
    return {
      next() {
        return {
          value: new MemoryCard(data[index], JSFrameworksDataSet.name, JSFrameworksDataSet.extension),
          done: index++ >= data.length,
        };
      },
    };
  };
}
