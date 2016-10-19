import { extendObservable, autorun, computed, toJS } from 'mobx';
import { remote } from 'electron';
class File {
  constructor() {
    extendObservable(this, {
      path: computed(()=>`${this.pathInfo.dir}/${this.pathInfo.name}${this.pathInfo.ext}`),
      pathInfo: {
        dir: "",
        name: "",
        ext: "",
      },
      saved: false,
      loading: false,
    });
  }
}

const instance = new File();
autorun(()=>console.dir(toJS(instance)));
autorun(() => {
  // console.log("Saved:", instance.saved )
  remote.getCurrentWindow().setDocumentEdited(!instance.saved)
});
autorun(() => {
  // console.log("Path:", instance.path )
  remote.getCurrentWindow().setRepresentedFilename(instance.path)
});
export default instance;
