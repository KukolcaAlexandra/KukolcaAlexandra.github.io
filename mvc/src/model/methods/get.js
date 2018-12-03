class Get {
  constructor() {
    this.type = 'get';
  }
  async get(url) {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  }
}

export default Get;
