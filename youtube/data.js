'use strict';

export default class Data {
    constructor(items, nextPage, totalResults, query) {
		this.items = items;
      	this.nextPage = nextPage;
      	this.totalResults = totalResults;
      	this.query = query;

      	this.curPage=1;
  		this.curPagination=1;
  		this.sizePages=0;
  		this.sizePagination=0;
    }

  	add(items, nextPage, totalResults) {
  		let index = this.items.length;
  		let size = items.length;
  		for(let i=0; i<size; i++){
            if(items[i]){
	  		    this.items.push(items[i]);
	  		}
  		}
  		this.nextPage = nextPage;
  		this.totalResults = totalResults;
  	}
};