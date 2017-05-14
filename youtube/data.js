'use strict';

export default class Data {
	constructor(items, nextPage, totalResults, query) {
		//console.log("items " + items);
		//console.log("items[0] " + items[0]['id']);
		//console.log("nextPage " + nextPage);
    	this.items = items;
    	//this.totalResult = totalResult;
    	this.nextPage = nextPage;
    	this.totalResults = totalResults;
    	this.query = query;

    	this.curPage=1;
		this.curPagination=1;
		this.sizePages=0;
		this.sizePagination=0;
    	//console.log("this.items['id']: " + this.items['id']);
    	//console.log("this.items: " + this.items);
    	console.log("this.totalResult: " + this.totalResult);
    	//console.log("this.nextPage: " + this.nextPage);
  	}

  	add(items, nextPage, totalResults) {
  		//console.log("items in add: " + items);
  		//this.items += items;
  		let index = this.items.length;
  		let size = items.length;
  		console.log("items.length before: " + items.length);
  		for(let i=0; i<size; i++){
  			if(items[i]){
	  			this.items.push(items[i]);
	  			//this.items[index+i] = items[i];
	  			//console.log("this.items[index+i] = " + this.items[index+i]);
	  			//console.log("i = " + i);
	  		}
  		}
  		console.log("items.length after: " + this.items.length);
  		this.nextPage = nextPage;
  		this.totalResults = totalResults;
  		//console.log("items.length: " + this.items.length);
  		//console.log("items[0]['id']: " + this.items[0]['id']);
  	}

  	
};