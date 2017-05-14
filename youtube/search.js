'use strict';
//let displayPages = require('./display');
import Data from './data';
import {displayPages, updateData} from './display';
let nextPage;
let totalResults;

//module.exports = function(query, part){
export default function search(query, data=null){
	//debugger;
	//alert('Welcome ' + query);
	console.log("query = " + query);
	//data = null;
	console.log("data = " + data);
	let nextPageToken = '';
	if(data!==null){
		//alert('data!==null ' + data.nextPage);
		if(data.nextPage){
			nextPageToken = 'pageToken=' + data.nextPage + '&';
			//alert(nextPageToken);
		}
	}

	let url = 'https://www.googleapis.com/youtube/v3/search?' + 
			  'key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&' + 
			  'type=video&' + 
			  'part=snippet&' +
			  'maxResults=15&' +
			   nextPageToken +  
			  'q=' + query;
	httpGet(url)
	.then(
	    //response => alert(`Fulfilled: ${response}`),
	    response => {
	    	//alert(response);
	    	let url = createURL(response);
	    	//console.log("response = " + response);
	    	//console.log("url = " + url);
	    	if(url){
	    		return httpGet(url);
	    		console.log("url = " + url);
	    	}
	    	console.log("url = null");
	    	return null;
	    	
	    },
        error => alert(`Rejected: ${error}`)
    )
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
    .then(
    	response => {
    		//console.log("response " + response);
    		console.log("data in then = " + data);
    		handlingResponse(response, query, data);
	    	//parseResult(response);
	    	
	    },
        error => alert(`Rejected: ${error}`)
    )
    ;
};


//AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw
//https://www.googleapis.com/youtube/v3/search?key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&type=video&part=snippet&maxResults=15&q=js
//https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics
//https://www.youtube.com/watch?v=T5ZkSWTdbb4
//'use strict';
function handlingResponse(response, query, data){
	let items = JSON.parse(response);
	//alert(items['kind']);
	//alert(items['pageInfo']['totalResults']);
	//alert(items['nextPageToken']);
	//console.log("data = " + data);
	//console.log("items['nextPageToken'] = " + items['nextPageToken']);
	//console.log("response = " + response);
	if(response){
		if(data === null){
			console.log("data  in handlingResponse = " + data);
			data = new Data(items['items'], nextPage, totalResults, query);
			displayPages(data);
			//data.add(items['items'], nextPage);
		} else{
			data.add(items['items'], nextPage, totalResults);
			updateData(data);	
		}

		//displayPages(data);
	}else{
		console.log("in handlingResponse: response = null");
		displayPages(null);
	}
	
}

function createURL(response){
	//alert(`I'm from parseResult` + response);

	let items = JSON.parse(response);

	//nextPageToken = items['pageInfo']['totalResults'];
	nextPage = items['nextPageToken'];
	totalResults = items['pageInfo']['totalResults'];
	//alert(nextPage);

	if(totalResults > 0){
		let size = items['items'].length;
		//console.log("count items = " + items['items'].length);
		let id = items['items'][0]['id']['videoId'];
		for(let i=1; i<size; i++){
			id += ',' + items['items'][i]['id']['videoId'];
		}

		let url = 'https://www.googleapis.com/youtube/v3/videos?' + 
				  'key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&' + 
				  'id=' + id + '&' +
				  'part=snippet,statistics';

		//console.log("id = " + id);
		//displayPages(items);
		return url;
	}
	return null;
}


function httpGet(url) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}

//export search;






