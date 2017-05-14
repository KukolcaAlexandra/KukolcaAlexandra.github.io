/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__display__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__display___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__display__);
/* harmony export (immutable) */ __webpack_exports__["a"] = search;

//let displayPages = require('./display');



let nextPage;
let totalResults;

//module.exports = function(query, part){
function search(query, data = null) {
	//debugger;
	//alert('Welcome ' + query);
	console.log("query = " + query);
	//data = null;
	console.log("data = " + data);
	let nextPageToken = '';
	if (data !== null) {
		//alert('data!==null ' + data.nextPage);
		if (data.nextPage) {
			nextPageToken = 'pageToken=' + data.nextPage + '&';
			//alert(nextPageToken);
		}
	}

	let url = 'https://www.googleapis.com/youtube/v3/search?' + 'key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&' + 'type=video&' + 'part=snippet&' + 'maxResults=15&' + nextPageToken + 'q=' + query;
	httpGet(url).then(
	//response => alert(`Fulfilled: ${response}`),
	response => {
		//alert(response);
		let url = createURL(response);
		//console.log("response = " + response);
		//console.log("url = " + url);
		if (url) {
			return httpGet(url);
			console.log("url = " + url);
		}
		console.log("url = null");
		return null;
	}, error => alert(`Rejected: ${error}`))
	//;

	//httpGet(url)
	/*.then(
 	response => {
 		console.log("All done");
 		return httpGet(url);
 		//console.log("response " + response);
 		//parseResult(response);
 		//httpGet(url);
 	},
 	error => alert(`Rejected: ${error}`)
 )*/
	.then(response => {
		//console.log("response " + response);
		console.log("data in then = " + data);
		handlingResponse(response, query, data);
		//parseResult(response);
	}, error => alert(`Rejected: ${error}`));
};

//AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw
//https://www.googleapis.com/youtube/v3/search?key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&type=video&part=snippet&maxResults=15&q=js
//https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics
//https://www.youtube.com/watch?v=T5ZkSWTdbb4
//'use strict';
function handlingResponse(response, query, data) {
	let items = JSON.parse(response);
	//alert(items['kind']);
	//alert(items['pageInfo']['totalResults']);
	//alert(items['nextPageToken']);
	//console.log("data = " + data);
	//console.log("items['nextPageToken'] = " + items['nextPageToken']);
	//console.log("response = " + response);
	if (response) {
		if (data === null) {
			console.log("data  in handlingResponse = " + data);
			data = new __WEBPACK_IMPORTED_MODULE_0__data__["a" /* default */](items['items'], nextPage, totalResults, query);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__display__["displayPages"])(data);
			//data.add(items['items'], nextPage);
		} else {
			data.add(items['items'], nextPage, totalResults);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__display__["updateData"])(data);
		}

		//displayPages(data);
	} else {
		console.log("in handlingResponse: response = null");
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__display__["displayPages"])(null);
	}
}

function createURL(response) {
	//alert(`I'm from parseResult` + response);

	let items = JSON.parse(response);

	//nextPageToken = items['pageInfo']['totalResults'];
	nextPage = items['nextPageToken'];
	totalResults = items['pageInfo']['totalResults'];
	//alert(nextPage);

	if (totalResults > 0) {
		let size = items['items'].length;
		//console.log("count items = " + items['items'].length);
		let id = items['items'][0]['id']['videoId'];
		for (let i = 1; i < size; i++) {
			id += ',' + items['items'][i]['id']['videoId'];
		}

		let url = 'https://www.googleapis.com/youtube/v3/videos?' + 'key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&' + 'id=' + id + '&' + 'part=snippet,statistics';

		//console.log("id = " + id);
		//displayPages(items);
		return url;
	}
	return null;
}

function httpGet(url) {

	return new Promise(function (resolve, reject) {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		xhr.onload = function () {
			if (this.status == 200) {
				resolve(this.response);
			} else {
				var error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function () {
			reject(new Error("Network Error"));
		};

		xhr.send();
	});
}

//export search;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Data {
    constructor(items, nextPage, totalResults, query) {
        this.items = items;
        this.nextPage = nextPage;
        this.totalResults = totalResults;
        this.query = query;

        this.curPage = 1;
        this.curPagination = 1;
        this.sizePages = 0;
        this.sizePagination = 0;
    }

    add(items, nextPage, totalResults) {
        let index = this.items.length;
        let size = items.length;
        for (let i = 0; i < size; i++) {
            if (items[i]) {
                this.items.push(items[i]);
            }
        }
        this.nextPage = nextPage;
        this.totalResults = totalResults;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Data;
;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: D:/js/webpack/youtube/display.js: Unexpected token (91:7)\n\n  89 | \t\t   \n  90 | \t\t   \tif(curData.sizePages === 1)\n> 91 | \t\t   \t\tlet src = data.items[i]['snippet']['thumbnails']['default']['url'];\n     | \t\t   \t\t^\n  92 | \t\t   \telse\n  93 | \t\t    \tlet src = data.items[i]['snippet']['thumbnails']['high']['url'];\n  94 | \t\t\t    \n");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(0);
//AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw
//https://www.googleapis.com/youtube/v3/search?key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&type=video&part=snippet&maxResults=15&q=js
//https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics
//https://www.youtube.com/watch?v=T5ZkSWTdbb4
//'use strict';



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


//elem.addEventListener("click", searchHandler(query));

elem.addEventListener("click", function () {
    console.log("Кнопка нажата.");
    let query = document.getElementById('query').value;
    let input = document.getElementById('query');
    input.blur();
    console.log("query.value = " + query);
    //query.
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* default */])(query);
});

//elem.style.background = 'red';


function createContainer() {
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
    input.setAttribute('autofocus', true);
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

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map