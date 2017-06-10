function createWeeks(currentYear, currentMonth){
	console.log("currentYear" + currentYear);
	console.log("currentMonth" + currentMonth);
	let d = new Date(currentYear, currentMonth, 1);
	console.log("d=" + d);
	var temp = new Date(currentYear, currentMonth+1, 0);
	var lastDay = temp.getDate();

	let weeks = [];
	let week = [];
	//let day = {};
	//var d = new Date(2017, 5, 1);
	//var b = new Date(2017, 5, 7);
	//alert(d);
	//alert(b);
	console.log("Hi from createWeeks");
	// while(d.getDate() != lastDay){
	let t = d.getDay() - 1;
	if(t < 0) {
		t = 6;
	}
	let a = 0;
	while (d.getMonth() == currentMonth){
		//var tr = document.createElement('tr');
		//first week
		let i = 0;
		week = [];
		while(i < 7){
			//var td = document.createElement('td');
			//weeks.push(week);

			//first day
			if(a == 0){
				if(i < t){
					//td.innerHTML = '';
					//day['date'] = null;
					//week.push(day);
					week.push({'date': null});
					//console.log('day ' + day['date']);
					//console.log('week ' + week);
				}else{
					//td.innerHTML = d.getDate();
					//day['date'] = d.getDate();
					//week.push(day);
					week.push({'date': d.getDate()});
					
					//console.log('day ' + day['date']);
					//console.log('week ' + week);
					d.setDate(d.getDate() + 1);
				}
			}else{
				//td.innerHTML = d.getDate();
				//day['date'] = d.getDate();
				//week.push(day);
				week.push({'date': d.getDate()});
				//console.log('day ' + day['date']);
				//console.log('week ' + week);
				d.setDate(d.getDate() + 1);
			}
			//tr.appendChild(td);
			//console.log('day = ' + day['date']);
			//weeks[a].push(day);
			
			//console.log('week = ' + week[0]['date']);
			i++;

			if(d.getDate() == lastDay){
				//var td = document.createElement('td');
				d.setDate(d.getDate());
				//day = [];
				//day['date'] = d.getDate();
				//week.push(day);
				week.push({'date': d.getDate()});
				//console.log('day ' + day['date']);
				//console.log('week ' + week);
				//td.innerHTML = d.getDate();
				d.setDate(d.getDate() + 1);
				//weeks[a].push(day);
				

				//tr.appendChild(td);
				i++;
				break;
			}
		}

		//document.getElementById('t').appendChild(tr);
		weeks.push(week);
		//console.log(weeks);
		a++;
	}


	/*console.log('in createWeeks: weeks');
	for(let i=0; i<weeks.length; i++){
		console.log("weeks: " + i + ": " + weeks[i]);
		for(let j=0; j<7; j++){
			if(weeks[i][j])
				console.log("week: " + i + ": " + weeks[i][j]['date']);
		}
	}*/
	return weeks;
}

export default createWeeks;