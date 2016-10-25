import { observable, computed } from 'mobx';
export default class File {
  @computed get path() {
    return `${this.pathInfo.dir}/${this.pathInfo.name}${this.pathInfo.ext}`
  }
  @observable pathInfo = {
    dir: "",
    name: "",
    ext: "",
  }
  @observable saved = false
  @observable loading = false
}
