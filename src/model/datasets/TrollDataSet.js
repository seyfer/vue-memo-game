import AbstractDataSet from './AbstractDataSet';
import MemoryCard from '../MemoryCard';

export default class TrollDataSet extends AbstractDataSet {

  * trollCards() {
    yield new MemoryCard('troll1', 'troll', 'png');
    //haha
    yield new MemoryCard('troll2', 'troll', 'png');
  }

  doubleCards() {
    return [...this.trollCards()];
  }

  [Symbol.iterator] = this.trollCards;

}
