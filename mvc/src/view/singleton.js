import Popup from './popup/popup';

class Singleton {
  constructor() {
    if(!Singleton.instance){
      //this.data = 'hello';
      this.popup = new Popup();
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

export { Singleton };
