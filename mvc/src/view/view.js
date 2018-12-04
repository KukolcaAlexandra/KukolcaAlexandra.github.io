import '../../less/style.less';
import Autocomplete from './autocomplete';

class View {
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;
    this.renderNewsSource = this.renderNewsSource.bind(this);
    this.renderNews = this.renderNews.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  init() {
    this.renderMain();
    this.controller.handleEvent('loadSource', this.model);
    this.model.subscribe('newsSource', this.renderNewsSource);
    this.model.subscribe('news', this.renderNews);
    this.model.subscribe('error', this.renderPopup);
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
    this.input = document.getElementById('myInput');
    this.button = document.getElementById('button');
    const autocomplete = new Autocomplete(this.input, newsSources[0]);
    autocomplete.addHandlers();
    this.button.addEventListener('click', () => {
      this.controller.handleEvent('click', this.model, this.input.value);
    });
  }

  async renderNews(event, args) {
    const render = await import('./newsBlock/renderNewsBlock' /* webpackChunkName: 'renderNewsBlock' */);
    await import('./newsBlock/less/style.less' /* webpackChunkName: 'newsBlockStyle' */);
    render.renderNewsBlock(args[0]);
  }

  async renderPopup(event, args) {
    const module = await import('./singleton' /* webpackChunkName: 'singleton' */);
    const single = new module.Singleton();
    single.popup.show(args[0], args[1]);
  }
}

export default View;
