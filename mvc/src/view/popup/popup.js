import './css/style.less';

class Popup {
  constructor() {
    this.close = this.close.bind(this);
  }

  show(header, message) {
    const body = document.querySelector('body');
    const popup = document.createElement('div');
    popup.classList.add('b-popup');
    popup.innerHTML = `
      <div class="b-popup-content">
        <h3>${header}</h3>
        <div class="message">${message}</div>
        <div class="button-container">
          <button class="close">Close</button>
        </div>
      </div>`;
    body.appendChild(popup);
    const button = document.querySelector('.close');
    button.onclick = this.close;
  }

  close() {
    const body = document.querySelector('body');
    const popup = document.querySelector('.b-popup');
    body.removeChild(popup);
    return this;
  }
}

export default Popup;
