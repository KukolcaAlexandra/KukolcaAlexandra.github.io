import Get from './methods/get';
import Post from './methods/post';
import Put from './methods/put';

class RequestFactory {
  
  traceRequestCalls(obj) {
    let handler = {
      get(target, propKey, receiver) {
        const origMethod = target[propKey];
        return function (...args) {
          console.log(`Proxy: ${propKey} request with url = ${args[0]}`);
          return origMethod.apply(this, args);
        };
      }
    };
    return new Proxy(obj, handler);
  }

  createRequest(method) {
    switch (method) {
      case 'get':
        this.proxy = this.traceRequestCalls(new Get());
        break;
      case 'post':
        this.proxy = this.traceRequestCalls(new Post());
        break;
      case 'put':
        this.proxy = this.traceRequestCalls(new Put());
        break;
      default: 
        this.proxy = this.traceRequestCalls(new Get());
        break;
    }
    
    return this.proxy;
  }
}

export default RequestFactory;
