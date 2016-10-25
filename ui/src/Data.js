import { observable, action } from 'mobx';
export default class Data {
  @observable data = {}
  @action updateData(data){
    this.data=data
  }
}
