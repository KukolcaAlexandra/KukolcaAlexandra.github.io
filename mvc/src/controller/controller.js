class Controller {

  handleEvent(event, model, value) {
    switch (event) {
      case 'loadSource':
        model.getSource();
        break;
      case 'click':
        model.getNews(value);
        break;
    }
  }
}

export default Controller;
