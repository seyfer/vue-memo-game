import uuidv4 from 'uuid/v4';

export default class MemoryCard {
  name = '';
  dataSetName = '';
  extension = 'png';
  flipped = false;
  solved = false;
  uuid = uuidv4();

  constructor(name, dataSetName, extension) {
    this.name = name;
    this.dataSetName = dataSetName;
    this.extension = extension;
  }
}
