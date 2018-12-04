class Get {
  async get(url) {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  }
}

export default Get;
