import Popup from './popup/popup';

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      this.popup = new Popup();
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

export { Singleton };
