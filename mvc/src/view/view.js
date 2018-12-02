import '../../css/style.less';
import Autocomplete from './autocomplete';

class View {
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;
    // this.model.subscribe('error', this.render);
    //this.controller.handleEvent = this.controller.handleEvent.bind(this);
    //this.call = this.call.bind(this);
    this.handler = this.handler.bind(this);
    this.renderNewsSource = this.renderNewsSource.bind(this);
    this.renderNews = this.renderNews.bind(this);
  }

  init() {
    this.renderMain();
    this.controller.handleEvent('loadSource', this.model);
    this.model.subscribe('newsSource', this.renderNewsSource);
    this.model.subscribe('news', this.renderNews);
    //this.button = document.getElementById('button');
    //this.button.onclick = this.handler;
    //this.input = document.getElementById('myInput');
    console.log(this.input);
  }


  renderMain() {
    const mainBlock = document.createElement('div');
    mainBlock.classList.add('content');
    mainBlock.innerHTML = `
      <header>
        <h1>The latest news</h1>
      </header>
      <div class="main-container">
        <div class="search-container">
          <div class="autocomplete">
            <input id="myInput" type="text" name="sourceNews" placeholder="Enter source news">
          </div>
          <button type="button" id="button">Get news</button>
        </div>
        <div class="news-container"></div>
      </div>`;
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <span>
        Source - 
        <a href="https://newsapi.org/" target="_blank">
          News API
        </a>
      </span>`;
    const body = document.querySelector('body');
    body.appendChild(mainBlock);
    body.appendChild(footer);
  }

  renderNewsSource(event, newsSources) {
    console.log('renderNewsSource');
    console.log(event);
    console.log(newsSources);
    this.input = document.getElementById('myInput');
    this.button = document.getElementById('button');
    const autocomplete = new Autocomplete(this.input, newsSources);
    autocomplete.addHandlers();
    this.button.addEventListener('click', () => {
      this.controller.handleEvent('click', this.model, this.input.value);
    });
  }

  renderNews(event, news) {
    console.log('renderNewsBlock');
  }

  handler() {
    //alert('call');
    //console.log('param');
    console.log(this.input.value);
    this.controller.handleEvent('click', this.model, this.input.value);
  }
}

export default View;
