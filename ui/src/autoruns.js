import { remote } from 'electron';
import { autorun, toJS } from 'mobx';
export default (data,file,debug) => {
  if(debug){
    autorun(()=>console.log("State:", {...toJS(file), ...toJS(data)}));
  }
  autorun(() => {
    // console.log("Saved:", instance.saved )
    remote.getCurrentWindow().setDocumentEdited(!file.saved)
  });
  autorun(() => {
    // console.log("Path:", instance.path )
    remote.getCurrentWindow().setRepresentedFilename(file.path)
  });
}
