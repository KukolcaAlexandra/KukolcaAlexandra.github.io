
function addEventsToWeeks(weeks, events, currentYear, currentMonth){
	console.log('from addEventsToWeeks');
	console.log('weeks ' + weeks.length);
	console.log('events ' + events.size);
	console.log('currentYear ' + currentYear);
	console.log('currentMonth ' + currentMonth);
	//alert( toString.call(events) );
	let selectedEvents = [];
	let arrayByDate = [];
	console.log('arrayByDate before' + arrayByDate);
	for(let i=0; i<32; i++){

		arrayByDate.push([]);
	}
	console.log('arrayByDate after');

	/*for(let i=0; i<31; i++){
		console.log(arrayByDate[i]);
	}*/

	events.forEach(function(elem){

		//console.log(elem.get('start'));
		let d = new Date(elem.get('start'));
		if((d.getFullYear() === currentYear) &&
		   (d.getMonth() === currentMonth)){
			//selectedEvents.push(elem);
			arrayByDate[d.getDate()].push(elem);
		}
	});

	console.log('after events.forEach');
	/*for(let i=0; i<31; i++){
		console.log(arrayByDate[i]);
	}*/

	for(let i=0; i<weeks.length; i++){
		console.log("weeks: " + i + ": " + weeks[i]);
		for(let j=0; j<7; j++){
			if(weeks[i][j]){
				//console.log("week: " + i + ": " + weeks[i][j]['date']);
				if(arrayByDate[ weeks[i][j]['date'] ]){
					weeks[i][j]['events'] = arrayByDate[ weeks[i][j]['date']];

				}
			}
		}
	}

	return weeks;

}
export default addEventsToWeeks;