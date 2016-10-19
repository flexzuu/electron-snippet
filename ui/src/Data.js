import { extendObservable, autorun, toJS } from 'mobx';
class Data {
  constructor() {
    extendObservable(this, {
      data: {},
    });
  }
}
const instance = new Data();
autorun(()=>console.dir(toJS(instance)));

export default instance;
