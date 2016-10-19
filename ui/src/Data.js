import { extendObservable, autorun, computed, toJS } from 'mobx';
import { remote } from 'electron';
class Data {
  constructor() {
    extendObservable(this, {
      data: {},
    });
  }
}

const instance = new Data();
export default instance;
