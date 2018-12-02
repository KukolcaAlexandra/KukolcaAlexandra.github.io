import Get from './methods/get';
import Post from './methods/post';
import Put from './methods/put';

class RequestFactory {
  constructor() {
    this.Method = Get;
  }

  createRequest(method) {
    switch (method) {
      case 'GET':
        this.Method = Get;
        break;
      case 'POST':
        this.Method = Post;
        break;
      case 'PUT':
        this.Method = Put;
        break;
      default: 
        break;
    }

    return new this.Method();
  }
}

export default RequestFactory;
