class Controller {

  handleEvent(event, model, value) {
    switch (event) {
      case 'loadSource':
        //alert('loadSource');
        //console.log(model);
        model.getSource();
        break;
      case 'click':
        console.log('value = ' + value);
        model.getNews(value);
        break;
    }
  }
}

export default Controller;
