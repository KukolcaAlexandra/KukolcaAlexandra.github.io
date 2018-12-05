import { getSourceNames, getSourceNamesWithId } from '../services/getSourceNames';

class Model {
  constructor() {
    this.events = {};
    this.subId = -1;
    this.header = 'Error of loading data';
   
    this.subscribe = this.subscribe.bind(this);
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

  updateSource(res) {
    if (res.status === 'ok') {
      const sourceNames = getSourceNames(res.sources);
      this.sourceNamesWithId = getSourceNamesWithId(res.sources);
      this.publish('newsSource', sourceNames);
    } else if (res.status === 'error') {
      const data = [this.header, res.message];
      this.publish('error', data);
    }
  }

  updateNews(res) {
    if (res.status === 'ok') {
      this.publish('news', res.articles);
    } else if (res.status === 'error') {
      const data = [this.header, res.message];
      this.publish('error', ...data);
    }
  }
}

export default Model;
