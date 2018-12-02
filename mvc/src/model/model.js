import RequestFactory from './requestFactory';
import apiKey from '../settings/settings';
import { getSourceNames, getSourceNamesWithId } from '../services/getSourceNames';

class Model {
  constructor() {
    this.events = {};
    this.subId = -1;
    this.requestFactory = new RequestFactory();
    this.getMethod = this.requestFactory.createRequest();
    //model.events = this.events.bind(this);
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  
  publish(event, args) {
    console.log('publish');
    console.log(this.events);
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
    console.log('load source');
    const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
    const res = await this.getMethod.get(url);
    if (res.status !== 'ok') {
      console.log('error of loading data');
    }
    console.log(res);
    const sourceNames = getSourceNames(res.sources);
    this.sourceNamesWithId = getSourceNamesWithId(res.sources);
    console.log('this.sourceNamesWithId');
    console.log(this.sourceNamesWithId);
    this.publish('newsSource', sourceNames);
  }

  async getNews(source) {
    console.log('get news');
    console.log('source');
    console.log(source);
    console.log('this.sourceNamesWithId');
    console.log(this.sourceNamesWithId);
    const sourceCode = this.sourceNamesWithId.get(source);
    console.log(sourceCode);
    const url = `https://newsapi.org/v2/top-headlines?sources=${sourceCode}&apiKey=${apiKey}`;
    const res = await this.getMethod.get(url);
    if (res.status !== 'ok') {
      console.log('error of loading data');
    }
    console.log(res);
    this.publish('news', res.article);
  }
}
  
export default Model;
  
