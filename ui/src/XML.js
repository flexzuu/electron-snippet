import { extendObservable, autorun, computed } from 'mobx';
import { remote } from 'electron';

class XML {
  constructor() {
    extendObservable(this, {
      loadedData: "",
      path: "",
      pathInfo: {},
      saved: false,
      extention: computed(() => {
        if(this.pathInfo.ext)
          return this.pathInfo.ext.slice(1);
        return "no file";
      }),
      mode: computed(() => {
        switch (this.extention) {
          case "dtd":
            return "application/xml-dtd"
          case "json":
            return "application/json"
          case "jsx":
            return "jsx"
          case "xml":
            return "application/xml"
          case "js":
            return "text/javascript"
          default:
            return this.extention
        }
      })
    });
  }
}

const instance = new XML();
autorun(() => {
  // console.log("Saved:", instance.saved )
  remote.getCurrentWindow().setDocumentEdited(!instance.saved)
});
autorun(() => {
  // console.log("Path:", instance.path )
  remote.getCurrentWindow().setRepresentedFilename(instance.path)
});
export default instance;
