//AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw
//https://www.googleapis.com/youtube/v3/search?key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&type=video&part=snippet&maxResults=15&q=js
//https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics
//https://www.youtube.com/watch?v=T5ZkSWTdbb4
//'use strict';

'use strict';

//Create container and search field
createContainer();
//console.log('I am in create');
/*    let div = document.createElement('div');
    div.innerHTML = "<strong>"+items['items'][0]['snippet']['publishedAt']+"</strong>";
    div.style.background = '#909090';
    div.style.width = '200px';
    console.log(document.documentElement.clientWidth);
    div.classList.add('gridcontainer');
    document.body.appendChild(div);*/

let elem = document.getElementById('search');
//let searchHandler = require('./search');
import search from './search';

//elem.addEventListener("click", searchHandler(query));

elem.addEventListener("click", function() {
   	console.log("Кнопка нажата.");
   	let query = document.getElementById('query').value;

   	console.log("query.value = " + query);
    //query.
   	search(query);
})

//elem.style.background = 'red';


function createContainer(){
    console.log('I am in create');
    let div = document.createElement('div');
    //div.innerHTML = "<strong>"+items['items'][0]['snippet']['publishedAt']+"</strong>";
    //div.style.background = '#909090';
    //div.style.width = '200px';
    //console.log(document.documentElement.clientWidth);
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
    //input.setAttribute('autofocus', true);
    //input.setAttribute('onmousedown', 'true');
    //input.setAttribute('onselectstart', 'true');
    //input.setAttribute('autofocus', false);
    div3.appendChild(input);

    let button = document.createElement('button');
    button.setAttribute('id', 'search');
    button.setAttribute('type', 'button');
    button.innerHTML = "Search";
    div3.appendChild(button);    

    document.body.setAttribute('type', '1');
}