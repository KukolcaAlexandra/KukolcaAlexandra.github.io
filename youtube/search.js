'use strict';

import Data from './data';
import {displayPages, updateData} from './display';
let nextPage;
let totalResults;

export default function search(query, data=null){
	
	let nextPageToken = '';
	if(data!==null){
		if(data.nextPage){
			nextPageToken = 'pageToken=' + data.nextPage + '&';
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
	    response => {
	    	let url = createURL(response);
	    	if(url){
	    		return httpGet(url);
	    	}
	    	return null;
	    	
	    },
        error => alert(`Rejected: ${error}`)
    )
    .then(
    	response => {
    		handlingResponse(response, query, data);
	    },
        error => alert(`Rejected: ${error}`)
    )
    ;
};

function handlingResponse(response, query, data){
	let items = JSON.parse(response);
	if(response){
		if(data === null){
			data = new Data(items['items'], nextPage, totalResults, query);
			displayPages(data);
		} else{
			data.add(items['items'], nextPage, totalResults);
			updateData(data);	
		}
	}else{
		displayPages(null);
	}
	
}

function createURL(response){
	
	let items = JSON.parse(response);
	nextPage = items['nextPageToken'];
	totalResults = items['pageInfo']['totalResults'];

	if(totalResults > 0){
		let size = items['items'].length;
		let id = items['items'][0]['id']['videoId'];
		for(let i=1; i<size; i++){
			id += ',' + items['items'][i]['id']['videoId'];
		}

		let url = 'https://www.googleapis.com/youtube/v3/videos?' + 
				  'key=AIzaSyAafHK96EJVPRf0K2ityqqQqMTZxEMOWWw&' + 
				  'id=' + id + '&' +
				  'part=snippet,statistics';
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
