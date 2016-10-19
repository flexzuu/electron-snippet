import { extendObservable, autorun, computed, toJS } from 'mobx';
import { remote } from 'electron';
class File {
  constructor() {
    extendObservable(this, {
      path: "",
      pathInfo: {},
      saved: false,
    });
  }
}

const instance = new File();
autorun(() => {
  // console.log("Saved:", instance.saved )
  remote.getCurrentWindow().setDocumentEdited(!instance.saved)
});
autorun(() => {
  // console.log("Path:", instance.path )
  remote.getCurrentWindow().setRepresentedFilename(instance.path)
});
export default instance;
