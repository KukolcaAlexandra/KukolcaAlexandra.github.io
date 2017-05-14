'use strict';

import search from './search';

let selectedElem;
let curData;
let curWidthMin;
//let curWidthMax;

function displayPages(data){
		
	let width =  document.documentElement.clientWidth;
	//curWidth = width;

	if(data){
		if(width >= 1080){
			//console.log(">=1080 " + width);
			data.sizePages = 4;
			data.sizePagination = 3;
			curWidthMin = 1080;
		} else if(width >= 720){
			//console.log(">=720 " + width);
			data.sizePages = 3;
			data.sizePagination = 4;
			curWidthMin = 720;
		} else if(width >= 460){
			//console.log(">=460 " + width);
			data.sizePages = 2;
			data.sizePagination = 5;
			curWidthMin = 460;
		} else{
			//console.log("<460 " + width);
			data.sizePages = 1;
			data.sizePagination = 7;
			curWidthMin = 0;
		}
		curData = data;

		paintPages(1, data.sizePages, data);
		if(data.sizePagination*data.sizePages < data.totalResults){
			paintPagination(1, data.sizePagination);
			paintNext();
		}else{
			paintPagination(1, Math.ceil(data.totalResults/data.sizePages));
		}

		let div = document.getElementsByClassName('pagination');
		div[0].children[0].setAttribute('style','background-color:#b2d320');
    	selectedElem = div[0].children[0];
				
		window.addEventListener("resize", onResize);
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);
		window.addEventListener("touchstart", onTouchStart, false);
  		window.addEventListener("touchend", onStartEnd, false);
		//let input = document.getElementById('query');
		//input.addEventListener("mousedown", onInputMouseDown);
		//console.log('after displayPages');
	}else{
		removePages();
		removePagination();
	}
};

function updateData(data){
	curData = data;
}

function paintPages(start, count, data){
	removePages();
	start = start - 1;
	let div = document.getElementsByClassName('gridwrapper');
	//console.log("count = " + count);
	//console.log("data.totalResults = " + data.totalResults);
	let max = count+start;
	//console.log("max = " + max);
	//console.log("start = " + start);
	if((start + count) > data.totalResults)
		count = data.totalResults-start;
	//console.log("count after = " + count);
	//console.log('href = ' + data.items[0]['snippet']['thumbnails']['high']['url']);
	for(let i=start; i<start+count; i++){
		if( data.items[i]){
			let div1 = document.createElement('div');
			div1.classList.add('gridbox');
			div1.classList.add('gridpage');
			div[0].appendChild(div1);
		
			let div2 = document.createElement('div');
		    div2.classList.add('page');
		    div1.appendChild(div2);

		    //add header-title
		    let h2 = document.createElement('h2');
		    //h2.innerHTML = "";
		   	div2.appendChild(h2);

		    let title = data.items[i]['snippet']['title'];
		    let href = "https://www.youtube.com/watch?v=" + data.items[i]['id'];
		    let a = document.createElement('a');
		    a.innerHTML = title;
		    a.setAttribute('href', href);
		    a.setAttribute('target','_blank');
		    h2.appendChild(a);
		   	//div2.appendChild(a);

		   	/*let h1 = document.createElement('h1');
		    h1.innerHTML = title;
		   	div2.appendChild(h1);*/

		    let src = data.items[i]['snippet']['thumbnails']['high']['url'];
		    //let src = data.items[i]['snippet']['thumbnails']['default']['url'];
		    
		    let img = document.createElement('img');
		    img.setAttribute('src',src);
		    div2.appendChild(img);

		    /*let a = document.createElement('a');
		    let href = data.items[i]['snippet']['thumbnails']['high']['url'];
		    if(!href)
		    	return;
		    a.setAttribute('href', href);
		    div2.appendChild(a);

		    let img = document.createElement('img');
		    img.setAttribute('src',href);
		    img.setAttribute('alt','image');
		    a.appendChild(img);*/

		   	let h3 = document.createElement('h3');
		   	let author = data.items[i]['snippet']['channelTitle'];
		   	h3.innerHTML = "Author: " + author;
		   	div2.appendChild(h3);

		   	h3 = document.createElement('h3');
		   	let published = data.items[i]['snippet']['publishedAt'];
		   	h3.innerHTML = "Published at: " + published.substring(0,10);
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

		   	//let p = document.createElement('p');
		    
		    //p.innerHTML = description;
		   	//div3.appendChild(p);
		}
	}
	curData.curPage = start+1;
	console.log("curData.curPage = " + curData.curPage);
}

function removePages(){
	let elems = document.getElementsByClassName('gridpage');
	if(elems.length){
        elems = Array.prototype.slice.call(elems);
		//console.log("elems = " + elems);
		
		elems.forEach(function(elem){
			elem.remove();
		});
	}
}

function paintPagination(start, count, selected){
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
    for(let i=start; i<start+count; i++){
    	
	    a = document.createElement('a');
    	a.setAttribute('href', '#' + i);
    	//if(curData.sizePagination<=5){
    		a.innerHTML = i;
    	//}else{
    	//	a.innerHTML = " ";
    	//}
    	a.value = i;
    	a.pos = pos++;
    	a.addEventListener('click', onPageClick);
    	a.number = i;
    	if(a.pos === selected)
    		a.setAttribute('style','background-color: #b2d320');
    	div2.appendChild(a);
    }


}

function addPagination(elemValue, elemPos){
	//let elemPosition = elemValue%curData.sizePagination===0?curData.sizePagination:elemValue%curData.sizePagination;
	//console.log('                    elemPosition ' + elemPos);
	let halfPosition = Math.floor(curData.sizePagination/2)+1;
	//console.log('                    halfPosition ' + halfPosition);
	let needPages = (elemValue + Math.ceil(curData.sizePagination/2)-1)*curData.sizePages;
	//console.log('elemValue = ' + elemValue);
	//console.log('Math.ceil(curData.sizePagination/2) = ' + Math.ceil(curData.sizePagination/2));
	//console.log('curData.sizePages = ' + curData.sizePages);
	let itemsCount = curData.items.length;

	////////
	console.log('                        elemValue = ' + elemValue);
	console.log('curData.sizePages = ' + curData.sizePages);
	console.log('curData.curPagination before = ' + curData.curPagination);
	curData.curPagination = elemValue;
	console.log('curData.curPagination after = ' + curData.curPagination);
	// elem > half
	if(elemPos > halfPosition){
		//totalResults > needful
		if(needPages < curData.totalResults){
			//console.log('needPages < curData.totalResults');
			//console.log('needPages = ' + needPages);
			//console.log('itemsCount = ' + itemsCount);
			if(needPages >= itemsCount){
				//console.log('needPages >= itemsCount');
				search(curData.query, curData);
			}
			let startPage = (elemValue-1)*curData.sizePages+1;
			paintPages(startPage, curData.sizePages, curData);
			
			let startPagination = elemValue - Math.floor(curData.sizePagination/2);
			paintPagination(startPagination, curData.sizePagination, halfPosition);
			
			paintNext();
			paintPrev();
		
		}else if(needPages === curData.totalResults){
			//console.log('needPages === curData.totalResults');
			if(needPages >= itemsCount){
				//console.log('needPages >= itemsCount');
				search(curData.query, curData);
			}
			let startPage = (elemValue-1)*curData.sizePages+1;
			paintPages(startPage, curData.sizePages, curData);
			
			let startPagination = elemValue - Math.floor(curData.sizePagination/2);
			paintPagination(startPagination, curData.sizePagination, halfPosition);
			
			removeNext();
			paintPrev();
		//totalResults < needful
		}else{
			//console.log('needPages > curData.totalResults');
			//console.log('itemsCount = ' + itemsCount);
			if(curData.totalResults > itemsCount){
				search(curData.query, curData);
			}
			let startPage = (elemValue-1)*curData.sizePages+1;
			paintPages(startPage, curData.sizePages, curData);
			paintPagination(elemValue-elemPos+1, curData.sizePagination, elemPos);
			removeNext();
			if((elemValue-elemPos+1) !== 1){
				paintPrev();
			}
			//let newPos = curData.sizePagination-(curData.totalResults/curData.sizePages-elemValue)
		}
	}else{
		needPages = curData.sizePagination*curData.sizePages;
		if(needPages > curData.totalResults){
			//let sizePagination = Math.ceil(curData.totalResults/curData.sizePages);
			curData.sizePagination = Math.ceil(curData.totalResults/curData.sizePages);
		}
		//console.log("checkSize = " + curData.sizePagination);
		// elem <= half
		let diff = halfPosition - elemPos;
		//1 elem - diff
		let firstElem = elemValue-elemPos+1;
		//console.log("firstElem - diff = " + (firstElem - diff));


		if((firstElem - diff) <= 1){
			let startPage = (elemValue-1)*curData.sizePages+1;
			paintPages(startPage, curData.sizePages, curData);
			if(firstElem === 1){
				paintPagination(1, curData.sizePagination, elemPos);
			}else{
				paintPagination(1, curData.sizePagination, elemPos+1);
				removePrev();
			}
			
			//}
		}else{
			let startPage = (elemValue-1)*curData.sizePages+1;
			paintPages(startPage, curData.sizePages, curData);
			paintPagination(firstElem-diff, curData.sizePagination, elemPos+diff);
			paintPrev();
		}

		//????????????
		
		if(needPages < curData.totalResults){
			//console.log("needPages = " + needPages);
			paintNext();
		}
	}
}

function onPageClick(event){
	//alert('click ' + event.type + " на " + event.currentTarget);

	let elem = event.currentTarget;
	if(elem !== selectedElem){
		elem.setAttribute('style','background-color: #b2d320');
		selectedElem.setAttribute('style','background-color: lightblue');
		
		//let numPage = (elem.value-1)*curData.sizePage+1;
		addPagination(elem.value, elem.pos);
		selectedElem = elem;
	}
}

function removePagination(){
	let elems = document.getElementsByClassName('gridpagination');
	if(elems.length){
        elems = Array.prototype.slice.call(elems);
		//console.log("elems = " + elems);
		elems.forEach(function(elem){
			elem.remove();
		});
	}
}

function paintNext(){
	//if(curData.sizePagination<=5){
		let div = document.getElementsByClassName('pagination');
		let a = document.createElement('a');
	    a.setAttribute('href', '#');
	    a.classList.add('next');
	    /*if(curData.sizePagination<=5){
	    	a.innerHTML = 'next';
	    }else{
	    	a.innerHTML = ">";
	    }*/
	    a.innerHTML = 'next';
	    a.addEventListener('click', onNextClick);
	    div[0].appendChild(a);
	//}
}

function removeNext(){
	let elems = document.getElementsByClassName('next');
	if(elems[0])
		elems[0].remove();
}

function onNextClick(){
	//console.log("onNextClick");
	let lastPage = Math.ceil(curData.totalResults/curData.sizePages);
	if(curData.curPagination < lastPage ){
		selectedElem.setAttribute('style','background-color: lightblue');
		addPagination(selectedElem.value+1, selectedElem.pos+1);
		//
		let div = document.getElementsByClassName('pagination');
		let children = div[0].children;
		let selected;
		if(children.length){
	        children = Array.prototype.slice.call(children);
			//console.log("children = " + children);
			
			children.forEach(function(elem){
				if(elem.value === selectedElem.value+1){
					console.log(elem.value);
					selected = elem;
					return elem;
				}
			});
		}
		selectedElem = selected;
	}
}

function paintPrev(){
	//if(curData.sizePagination<=5){
		let div = document.getElementsByClassName('pagination');
		let a = document.createElement('a');
	    a.setAttribute('href', '#');
	    a.classList.add('prev');
	    /*if(curData.sizePagination<=5){
	    	a.innerHTML = 'prev';
	    }else{
	    	a.innerHTML = "<";
	    }*/
	    a.innerHTML = 'prev';
	    //a.setAttribute('width', '25px');
	    a.addEventListener('click', onPrevClick);
	    div[0].insertBefore(a, div[0].children[0]);
	//}
}

function removePrev(){
	let elems = document.getElementsByClassName('prev');
	if(elems[0])
		elems[0].remove();
}

function onPrevClick(){
	//console.log("onPrevClick");
	//selectedElem.setAttribute('style','background-color: lightblue');
	if(curData.curPagination > 1){
		addPagination(selectedElem.value-1, selectedElem.pos-1);
		//
		let div = document.getElementsByClassName('pagination');
		let children = div[0].children;
		let selected;
		if(children.length){
	        children = Array.prototype.slice.call(children);
			//console.log("children = " + children);
			children.forEach(function(elem){
				if(elem.value === selectedElem.value-1){
					console.log(elem.value);
					selected = elem;
					return elem;
				}
			});
		}
		selectedElem = selected;
	}
}

function onResize(){
	//console.log("onResize");
	let width =  document.documentElement.clientWidth;
	//console.log("onResize: " + width);

	if(width >= 1080){
		if(curData.sizePages !== 4){
			console.log(">=1080 " + width);

			curData.sizePages = 4;
			curData.sizePagination = 3;
			resizePages();
			
		}
	} else if(width >= 720){
		if(curData.sizePages !== 3){
			console.log(">=720 " + width);

			curData.sizePages = 3;
			curData.sizePagination = 4;
			resizePages();
			
		}
	} else if(width >= 460){
		if(curData.sizePages !== 2){
			console.log(">=460 " + width);

			curData.sizePages = 2;
			curData.sizePagination = 5;
			resizePages();
			
		}
	} else{
		if(curData.sizePages !== 1){
			console.log("<460 " + width);

			curData.sizePages = 1;
			curData.sizePagination = 7;
			resizePages();
			
		}
	}
		
		//let pos = Math.floor(curData.sizePagination/2)+1;
		//addPagination(curData.curPage, pos);


		//paintPages(curData.curPage, curData.sizePages, curData);
		/*if(curData.sizePagination*curData.sizePages < curData.totalResults){
			paintPagination(1, data.sizePagination);
			paintNext();
		}else{
			paintPagination(1, Math.ceil(data.totalResults/data.sizePages));
		}*/

		/*let div = document.getElementsByClassName('pagination');
		div[0].children[0].setAttribute('style','background-color:#ddd');
    	selectedElem = div[0].children[0];*/
}

function resizePages(){
	let value = Math.ceil(curData.curPage/curData.sizePages);
	let pos = curData.curPage%curData.sizePages;
	addPagination(value, 1);
	console.log("elemValue = " + value);
	console.log("elemPos = " + pos);
}

let startX;
let endX;
//let page = document.getElementsByClassName('page');

function onMouseDown(event){
	console.log("onMouseDown " + event.clientX);
	//console.log("page " + page);
	//console.log("page[0] " + page[0]);
	startX = event.clientX;

	/*page[0].style.position = 'absolute';
  	moveAt(event);
  	// переместим в body, чтобы мяч был точно не внутри position:relative
  	document.body.appendChild(page[0]);

  	page[0].style.zIndex = 1000; // показывать мяч над другими элементами

  	// передвинуть мяч под координаты курсора
  	// и сдвинуть на половину ширины/высоты для центрирования
  	function moveAt(e) {
    	page[0].style.left = e.pageX - page[0].offsetWidth / 2 + 'px';
    	page[0].style.top = e.pageY - page[0].offsetHeight / 2 + 'px';
  	}

  	// 3, перемещать по экрану
  	document.onmousemove = function(e) {
    	moveAt(e);
  	}

  	// 4. отследить окончание переноса
  	page[0].onmouseup = function() {
    	document.onmousemove = null;
    	page[0].onmouseup = null;
  	}

  	page[0].ondragstart = function() {
  		console.log("ondragstart ");
  		return false;
	};*/
}

function onMouseUp(event){
	console.log("onMouseUp " + event.clientX);
	let input = document.getElementById('query');
	//alert(input);
	//alert(event.target);
	if(input !== event.target){
			//alert('equal');
		
		//let selectedTextArea = document.activeElement;
		//alert()
		/*if (window.getSelection) {
			//alert(event.clientX + " " + event.clientY);
	      	window.getSelection().removeAllRanges();
	    } else { // старый IE
	      	document.selection.empty();
	    }*/


		if(event.clientX - startX > 100){
			console.log("++++++++++++++++ : " + (startX - event.clientX));
			onPrevClick();
		}

		if(event.clientX - startX < -100){
			console.log("---------------- : " + (startX - event.clientX));
			onNextClick();
		}
	}
}

function onMouseMove(event){
	//console.log("onMouseMove " + event.clientX);
}

function onTouchStart(event){
	startX = event.clientX;
}

function onTouchEnd(event){
	if(event.clientX - startX > 100){
		console.log("++++++++++++++++ : " + (startX - event.clientX));
		onPrevClick();
	}

	if(event.clientX - startX < -100){
		console.log("---------------- : " + (startX - event.clientX));
		onNextClick();
	}
}
/*function onInputMouseDown(){
	let input = document.getElementById('query');
	input.setAttribute('autofocus', true);
	//alert('input');
}*/

export {displayPages, updateData}