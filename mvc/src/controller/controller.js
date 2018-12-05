import apiKey from '../settings/settings';
import RequestFactory from './requestFactory';

class Controller {

  constructor(model) {
    this.model = model;
    this.requestFactory = new RequestFactory();
    this.getInstance = this.requestFactory.createRequest('get');
    this.postInstance = this.requestFactory.createRequest('post');
  }

  handleEvent(event, value) {
    switch (event) {
      case 'loadSource':
        this.getSource();
        break;
      case 'click':
        this.getNews(value);
        break;
    }
  }

  async getSource() {
    const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
    const res = await this.getInstance.get(url);
    this.model.updateSource(res);
  }

  async getNews(source) {
    const sourceCode = this.model.sourceNamesWithId.get(source) ? this.model.sourceNamesWithId.get(source) : source;
    const url = `https://newsapi.org/v2/top-headlines?sources=${sourceCode}&apiKey=${apiKey}`;
    const res = await this.getInstance.get(url);
    this.model.updateNews(res);
  }

  subscribe(event, func){
    this.model.subscribe(event, func);
  }
}

export default Controller;
