import './css/style.css';

class Popup {
  constructor() {
    this.close = this.close.bind(this);
  }

  show (header, message) {
    const body = document.querySelector('body');
    /*const container = document.createElement('div');
    container.classList.add('b-container');
    container.innerHTML = 'Sample text';*/

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
    //popup.classList.toggle('show');
    //popup.onclick = this.close;
    //body.appendChild(container);
    body.appendChild(popup);
    const button = document.querySelector('.close');
    button.onclick = this.close;
  }

  close () {
    const body = document.querySelector('body');
    const popup = document.querySelector('.b-popup');
    body.removeChild(popup);
  }
}

export default Popup;
/*
<div class="b-container">
    Sample Text
</div>
<div class="b-popup">
    <div class="b-popup-content">
        Text in Popup
    </div>
</div>*/