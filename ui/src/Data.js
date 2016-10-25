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
  @action updateData(data){
    this.data=data
  }
}
