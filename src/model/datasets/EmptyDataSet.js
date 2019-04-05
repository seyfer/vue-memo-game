import AbstractDataSet from './AbstractDataSet';

export default class EmptyDataSet extends AbstractDataSet {
  isEmpty() {
    return true;
  }

  _emptinessReason = '';

  set emptinessReason(value) {
    if (this._emptinessReason.length === 0) {
      Reflect.set(this, '_emptinessReason', value);
    }
  }

  get emptinessReason() {
    return Reflect.get(this, '_emptinessReason');
  }

  [Symbol.iterator] = [][Symbol.iterator];
}
