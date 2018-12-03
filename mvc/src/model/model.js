import RequestFactory from './requestFactory';
import apiKey from '../settings/settings';
import { getSourceNames, getSourceNamesWithId } from '../services/getSourceNames';

class Model {
  constructor() {
    this.events = {};
    this.subId = -1;
    this.requestFactory = new RequestFactory();
    this.getInstance = this.requestFactory.createRequest('get');
    this.postInstance = this.requestFactory.createRequest('post');
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  
  publish(event, ...args) {
    console.log('publish');
    console.log(args);
    if (!this.events[event]) {
      return false;
    }
  
    const subscribers = this.events[event];
    let len = subscribers ? subscribers.length : 0;
  
    while (len--) {
      subscribers[len].func(event, args);
    }
  
    return this;
  }
  
  subscribe(event, func) {
    console.log('subscribe');
    if (!this.events[event]) {
      this.events[event] = [];
    }
  
    const token = (++this.subId).toString();
    this.events[event].push({token, func});
    return token;
  }

  async getSource() {
    const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
    const res = await this.getInstance.get(url);
    console.log(res);
    if (res.status === 'ok') {
      const sourceNames = getSourceNames(res.sources);
      this.sourceNamesWithId = getSourceNamesWithId(res.sources);
      this.publish('newsSource', sourceNames);
      //console.log('error of loading data');
      //console.log(res);
    } else if (res.status === 'error') {
      this.publish('error', res.message);
    }
    //const sourceNames = getSourceNames(res.sources);
    //this.sourceNamesWithId = getSourceNamesWithId(res.sources);
    //this.publish('newsSource', sourceNames);
  }

  async getNews(source) {
    console.log('get news');
    const sourceCode = this.sourceNamesWithId.get(source) ? this.sourceNamesWithId.get(source) : source;
    const url = `https://newsapi.org/v2/top-headlines?sources=${sourceCode}&apiKey=${apiKey}`;
    const res = await this.getInstance.get(url);
    console.log(res);
    if (res.status === 'ok') {
      this.publish('news', res.articles);
    } else if (res.status === 'error') {
      this.publish('error', 'Error of loading data', res.message);
    }
  }
}
  
export default Model;
