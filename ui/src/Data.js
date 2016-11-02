import { observable, action } from 'mobx';
export default class Data {
  @observable data = {
    codes:{
      snippet:[{
          $:{
            name: 'Untitled',
          },
          codeA: [''],
        }
      ]
    }
  }
  @observable active = 0
  @action updateData(data){
    this.data=data
  }
}
