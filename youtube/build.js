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
/* harmony export (immutable) */ __webpack_exports__["a"] = search;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__display__ = __webpack_require__(2);




let nextPage;
let totalResults;

function search(query, data = null) {

	let nextPageToken = '';
	if (data !== null) {
		if (data.nextPage) {
			nextPageToken = 'pageToken=' + data.nextPage + '&';
		}
	}

	let url = 'https://www.googleapis.com/youtube/v3/search?' + 'key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&' + 'type=video&' + 'part=snippet&' + 'maxResults=15&' + nextPageToken + 'q=' + query;
	httpGet(url).then(response => {
		let url = createURL(response);
		if (url) {
			return httpGet(url);
		}
		return null;
	}, error => alert(`Rejected: ${error}`)).then(response => {
		handlingResponse(response, query, data);
	}, error => alert(`Rejected: ${error}`));
};

function handlingResponse(response, query, data) {
	let items = JSON.parse(response);
	if (response) {
		if (data === null) {
			data = new __WEBPACK_IMPORTED_MODULE_0__data__["a" /* default */](items['items'], nextPage, totalResults, query);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__display__["a" /* displayPages */])(data);
		} else {
			data.add(items['items'], nextPage, totalResults);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__display__["b" /* updateData */])(data);
		}
	} else {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__display__["a" /* displayPages */])(null);
	}
}

function createURL(response) {

	let items = JSON.parse(response);
	nextPage = items['nextPageToken'];
	totalResults = items['pageInfo']['totalResults'];

	if (totalResults > 0) {
		let size = items['items'].length;
		let id = items['items'][0]['id']['videoId'];
		for (let i = 1; i < size; i++) {
			id += ',' + items['items'][i]['id']['videoId'];
		}

		let url = 'https://www.googleapis.com/youtube/v3/videos?' + 'key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&' + 'id=' + id + '&' + 'part=snippet,statistics';
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return displayPages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(0);




let selectedElem;
let curData;
let curWidthMin;

function displayPages(data) {

	let width = document.documentElement.clientWidth;
	if (data) {
		if (width >= 1080) {
			data.sizePages = 4;
			data.sizePagination = 3;
			curWidthMin = 1080;
		} else if (width >= 720) {
			data.sizePages = 3;
			data.sizePagination = 4;
			curWidthMin = 720;
		} else if (width >= 460) {
			data.sizePages = 2;
			data.sizePagination = 5;
			curWidthMin = 460;
		} else {
			data.sizePages = 1;
			data.sizePagination = 7;
			curWidthMin = 450;
		}
		curData = data;
		paintPages(1, data.sizePages, data);

		if (data.sizePagination * data.sizePages < data.totalResults) {
			paintPagination(1, data.sizePagination);
			paintNext();
		} else {
			paintPagination(1, Math.ceil(data.totalResults / data.sizePages));
		}

		let div = document.getElementsByClassName('pagination');
		div[0].children[0].setAttribute('style', 'background-color:#b2d320');
		selectedElem = div[0].children[0];

		window.addEventListener("resize", onResize);
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("touchstart", onTouchStart, false);
		window.addEventListener("touchend", onTouchEnd, false);
	} else {
		removePages();
		removePagination();
	}
};

function updateData(data) {
	curData = data;
}

function paintPages(start, count, data, dir) {
	//alert(curWidthMin);
	removePages();
	start = start - 1;
	let div = document.getElementsByClassName('gridwrapper');
	let max = count + start;
	if (start + count > data.totalResults) count = data.totalResults - start;
	//let width =  document.documentElement.clientWidth;
	for (let i = start; i < start + count; i++) {
		if (data.items[i]) {
			let div1 = document.createElement('div');
			div1.classList.add('gridbox');
			div1.classList.add('gridpage');
			/////////////////////////
			//add animation
			/////////////////////////
			if (dir) {
				div1.style.position = "relative";
				if (dir > 0) {
					div1.style.transform = "translate(0px,0px)";
					div1.style.animation = 'mymoveback 1s';
				} else {
					div1.style.transform = "translate(-" + curWidthMin + "px,0px)";
					div1.style.animation = 'mymove 1s';
				}

				div1.style.animationTimingFunction = 'ease';
				div1.style.animationIterationCount = '1';
				div1.style.animationFillMode = "forwards";
			}
			////////////////////////

			div[0].appendChild(div1);

			let div2 = document.createElement('div');
			div2.classList.add('page');
			div1.appendChild(div2);

			//add header-title
			let h2 = document.createElement('h2');
			div2.appendChild(h2);

			let title = data.items[i]['snippet']['title'];
			let href = "https://www.youtube.com/watch?v=" + data.items[i]['id'];
			let a = document.createElement('a');
			a.innerHTML = title;
			a.setAttribute('href', href);
			a.setAttribute('target', '_blank');
			h2.appendChild(a);

			let src;
			if (curData.sizePages === 1) src = data.items[i]['snippet']['thumbnails']['medium']['url'];else src = data.items[i]['snippet']['thumbnails']['high']['url'];

			let img = document.createElement('img');
			img.setAttribute('src', src);
			div2.appendChild(img);

			let h3 = document.createElement('h3');
			let author = data.items[i]['snippet']['channelTitle'];
			h3.innerHTML = "Author: " + author;
			div2.appendChild(h3);

			h3 = document.createElement('h3');
			let published = data.items[i]['snippet']['publishedAt'];
			h3.innerHTML = "Published at: " + published.substring(0, 10);
			div2.appendChild(h3);

			h3 = document.createElement('h3');
			let count = data.items[i]['statistics']['viewCount'];
			h3.innerHTML = "Count: " + count;
			div2.appendChild(h3);

			let div3 = document.createElement('div');
			let description = data.items[i]['snippet']['description'];
			div3.classList.add('description');
			div3.innerHTML = description;
			div2.appendChild(div3);
		}
	}
	curData.curPage = start + 1;
}

function removePages() {
	let elems = document.getElementsByClassName('gridpage');

	if (elems.length) {
		elems = Array.prototype.slice.call(elems);
		elems.forEach(function (elem) {
			//elem.remove();
			//elem.style.background-color = "green";
			elem.style.position = "relative";
			elem.style.transform = "translate(-500px,100px)";
			elem.style.animation = 'mymove 2s';
			elem.style.animationTimingFunction = 'ease';
			elem.style.animationIterationCount = '1';
			elem.style.animationFillMode = "forwards";
			elem.classList.add('del');
		});
	}
	//setTimeout(remove, 1000);
	remove();
}

function remove() {
	//alert( 'Привет' );
	let elems = document.getElementsByClassName('del');
	if (elems.length) {
		elems = Array.prototype.slice.call(elems);
		elems.forEach(function (elem) {
			elem.remove();
		});
	}
}

function paintPagination(start, count, selected) {
	removePagination();

	let div = document.getElementsByClassName('gridwrapper');

	let div1 = document.createElement('div');
	div1.classList.add('gridbox');
	div1.classList.add('gridpagination');
	div[0].appendChild(div1);

	let div2 = document.createElement('div');
	div2.classList.add('pagination');
	div1.appendChild(div2);

	let a;
	let pos = 1;
	for (let i = start; i < start + count; i++) {

		a = document.createElement('a');
		a.setAttribute('href', '#' + i);
		a.innerHTML = i;
		a.value = i;
		a.pos = pos++;
		a.addEventListener('click', onPageClick);
		a.number = i;
		if (a.pos === selected) a.setAttribute('style', 'background-color: #b2d320');
		div2.appendChild(a);
	}
}

function addPagination(elemValue, elemPos, dir) {
	let halfPosition = Math.floor(curData.sizePagination / 2) + 1;
	let needPages = (elemValue + Math.ceil(curData.sizePagination / 2) - 1) * curData.sizePages;
	let itemsCount = curData.items.length;
	curData.curPagination = elemValue;
	//alert(dir);
	// elem > half
	if (elemPos > halfPosition) {
		//totalResults > needful
		if (needPages < curData.totalResults) {
			if (needPages >= itemsCount) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* default */])(curData.query, curData);
			}
			let startPage = (elemValue - 1) * curData.sizePages + 1;
			paintPages(startPage, curData.sizePages, curData, dir);

			let startPagination = elemValue - Math.floor(curData.sizePagination / 2);
			paintPagination(startPagination, curData.sizePagination, halfPosition);

			paintNext();
			paintPrev();
		} else if (needPages === curData.totalResults) {
			if (needPages >= itemsCount) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* default */])(curData.query, curData);
			}
			let startPage = (elemValue - 1) * curData.sizePages + 1;
			paintPages(startPage, curData.sizePages, curData, dir);

			let startPagination = elemValue - Math.floor(curData.sizePagination / 2);
			paintPagination(startPagination, curData.sizePagination, halfPosition);

			removeNext();
			paintPrev();
			//totalResults < needful
		} else {
			if (curData.totalResults > itemsCount) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* default */])(curData.query, curData);
			}
			let startPage = (elemValue - 1) * curData.sizePages + 1;
			paintPages(startPage, curData.sizePages, curData, dir);
			paintPagination(elemValue - elemPos + 1, curData.sizePagination, elemPos);
			removeNext();
			if (elemValue - elemPos + 1 !== 1) {
				paintPrev();
			}
		}
	} else {
		needPages = curData.sizePagination * curData.sizePages;
		if (needPages > curData.totalResults) {
			//let sizePagination = Math.ceil(curData.totalResults/curData.sizePages);
			curData.sizePagination = Math.ceil(curData.totalResults / curData.sizePages);
		}
		// elem <= half
		let diff = halfPosition - elemPos;
		//1 elem - diff
		let firstElem = elemValue - elemPos + 1;

		if (firstElem - diff <= 1) {
			let startPage = (elemValue - 1) * curData.sizePages + 1;
			paintPages(startPage, curData.sizePages, curData, dir);
			if (firstElem === 1) {
				paintPagination(1, curData.sizePagination, elemPos);
			} else {
				paintPagination(1, curData.sizePagination, elemPos + 1);
				removePrev();
			}
		} else {
			let startPage = (elemValue - 1) * curData.sizePages + 1;
			paintPages(startPage, curData.sizePages, curData, dir);
			paintPagination(firstElem - diff, curData.sizePagination, elemPos + diff);
			paintPrev();
		}

		if (needPages < curData.totalResults) {
			paintNext();
		}
	}
}

function onPageClick(event) {
	let elem = event.currentTarget;
	//alert(selectedElem.value);
	//alert(elem.value);
	let dir = elem.value - selectedElem.value;
	if (elem !== selectedElem) {
		elem.setAttribute('style', 'background-color: #b2d320');
		selectedElem.setAttribute('style', 'background-color: lightblue');
		addPagination(elem.value, elem.pos, dir);
		selectedElem = elem;
	}
}

function removePagination() {
	let elems = document.getElementsByClassName('gridpagination');
	if (elems.length) {
		elems = Array.prototype.slice.call(elems);
		elems.forEach(function (elem) {
			elem.remove();
		});
	}
}

function paintNext() {
	let div = document.getElementsByClassName('pagination');
	let a = document.createElement('a');
	a.setAttribute('href', '#');
	a.classList.add('next');
	a.innerHTML = 'next';
	a.addEventListener('click', onNextClick);
	div[0].appendChild(a);
}

function removeNext() {
	let elems = document.getElementsByClassName('next');
	if (elems[0]) elems[0].remove();
}

function onNextClick() {
	let lastPage = Math.ceil(curData.totalResults / curData.sizePages);
	if (curData.curPagination < lastPage) {
		selectedElem.setAttribute('style', 'background-color: lightblue');
		addPagination(selectedElem.value + 1, selectedElem.pos + 1, 1);
		let div = document.getElementsByClassName('pagination');
		let children = div[0].children;
		let selected;
		if (children.length) {
			children = Array.prototype.slice.call(children);
			children.forEach(function (elem) {
				if (elem.value === selectedElem.value + 1) {
					selected = elem;
					return elem;
				}
			});
		}
		selectedElem = selected;
	}
}

function paintPrev() {
	let div = document.getElementsByClassName('pagination');
	let a = document.createElement('a');
	a.setAttribute('href', '#');
	a.classList.add('prev');
	a.innerHTML = 'prev';
	a.addEventListener('click', onPrevClick);
	div[0].insertBefore(a, div[0].children[0]);
}

function removePrev() {
	let elems = document.getElementsByClassName('prev');
	if (elems[0]) elems[0].remove();
}

function onPrevClick() {
	if (curData.curPagination > 1) {
		addPagination(selectedElem.value - 1, selectedElem.pos - 1, -1);
		let div = document.getElementsByClassName('pagination');
		let children = div[0].children;
		let selected;
		if (children.length) {
			children = Array.prototype.slice.call(children);
			children.forEach(function (elem) {
				if (elem.value === selectedElem.value - 1) {
					selected = elem;
					return elem;
				}
			});
		}
		selectedElem = selected;
	}
}

function onResize() {
	let width = document.documentElement.clientWidth;
	if (width >= 1080) {
		if (curData.sizePages !== 4) {
			curData.sizePages = 4;
			curData.sizePagination = 3;
			curWidthMin = 1080;
			resizePages();
		}
	} else if (width >= 720) {
		if (curData.sizePages !== 3) {
			curData.sizePages = 3;
			curData.sizePagination = 4;
			curWidthMin = 720;
			resizePages();
		}
	} else if (width >= 460) {
		if (curData.sizePages !== 2) {
			curData.sizePages = 2;
			curData.sizePagination = 5;
			curWidthMin = 460;
			resizePages();
		}
	} else {
		if (curData.sizePages !== 1) {
			curData.sizePages = 1;
			curData.sizePagination = 7;
			curWidthMin = 450;
			resizePages();
		}
	}
}

function resizePages() {
	let value = Math.ceil(curData.curPage / curData.sizePages);
	let pos = curData.curPage % curData.sizePages;
	addPagination(value, 1);
}

let startX;
let endX;

function onMouseDown(event) {
	startX = event.clientX;
	let input = document.getElementById('query');
	if (input === event.target) {
		input.focus();
	}
}

function onMouseUp(event) {
	let input = document.getElementById('query');
	if (input !== event.target) {
		if (event.clientX - startX > 100) {
			onPrevClick();
		}

		if (event.clientX - startX < -100) {
			onNextClick();
		}
	}
}

function onTouchStart(event) {
	let touches = event.changedTouches;
	startX = touches[0].pageX;
	let input = document.getElementById('query');
	if (input === touches[0].target) {
		input.focus();
	}
}

function onTouchEnd(event) {
	let touches = event.changedTouches;
	if (touches[0].pageX - startX > 100) {
		onPrevClick();
	}

	if (touches[0].pageX - startX < -100) {
		onNextClick();
	}
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(0);


createContainer();

let elem = document.getElementById('search');


elem.addEventListener("click", function () {
    let query = document.getElementById('query').value;
    let input = document.getElementById('query');
    input.blur();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* default */])(query);
});

function createContainer() {
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

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map