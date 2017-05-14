'use strict';

createContainer();

let elem = document.getElementById('search');
import search from './search';

elem.addEventListener("click", function() {
   	let query = document.getElementById('query').value;
    let input = document.getElementById('query');
    input.blur();
   	search(query);
})

function createContainer(){
    let div = document.createElement('div');
    div.classList.add('gridcontainer');
    document.body.appendChild(div);

    let div2 = document.createElement('div');
    div2.classList.add('gridwrapper');
    div.appendChild(div2);

    let div3 = document.createElement('div');
    div3.classList.add('searchbox');
    div2.appendChild(div3); 

    let input = document.createElement('input');
    input.setAttribute('id', 'query');
    input.setAttribute('autofocus', true);
    div3.appendChild(input);

    let button = document.createElement('button');
    button.setAttribute('id', 'search');
    button.setAttribute('type', 'button');
    button.innerHTML = "Search";
    div3.appendChild(button);    

    document.body.setAttribute('type', '1');
}