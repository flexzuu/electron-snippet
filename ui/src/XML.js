import { extendObservable } from 'mobx';

class XML {
  constructor() {
    extendObservable(this, {
      loadedData: "",
      path: "",
      saved: false,
    });
  }
}

export default new XML();
