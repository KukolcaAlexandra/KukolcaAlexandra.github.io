import RequestFactory from './requestFactory';
import apiKey from '../settings/settings';
import { getSourceNames, getSourceNamesWithId } from '../services/getSourceNames';

class Model {
  constructor() {
    this.events = {};
    this.subId = -1;
    this.header = 'Error of loading data';
    this.requestFactory = new RequestFactory();
    this.getInstance = this.requestFactory.createRequest('get');
    this.postInstance = this.requestFactory.createRequest('post');

    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.header = 'Error of loading data';
  }
  
  publish(event, ...args) {
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
    if (!this.events[event]) {
      this.events[event] = [];
    }
  
    const token = (++this.subId).toString();
    this.events[event].push({ token, func });
    return token;
  }

  async getSource() {
    const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
    const res = await this.getInstance.get(url);
    if (res.status === 'ok') {
      const sourceNames = getSourceNames(res.sources);
      this.sourceNamesWithId = getSourceNamesWithId(res.sources);
      this.publish('newsSource', sourceNames);
    } else if (res.status === 'error') {
      const data = [this.header, res.message];
      this.publish('error', data);
    }
  }

  async getNews(source) {
    const sourceCode = this.sourceNamesWithId.get(source) ? this.sourceNamesWithId.get(source) : source;
    const url = `https://newsapi.org/v2/top-headlines?sources=${sourceCode}&apiKey=${apiKey}`;
    const res = await this.getInstance.get(url);
    if (res.status === 'ok') {
      this.publish('news', res.articles);
    } else if (res.status === 'error') {
      
      const data = [this.header, res.message];
      this.publish('error', ...data);
    }
  }
}

export default Model;
