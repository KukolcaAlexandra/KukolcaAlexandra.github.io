//import React from 'react';
import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class Td extends Component {
	/*constructor(props) {
	    super(props);

	    //this.onEventClick = (e, event) => {
		//this.props.addTodo(e.target.value);
		//    console.log("Event click " + e);
		//    console.log("Event click " + e.target);
		//    console.log("Event click " + event);
		//}
		console.log('after super = ' + props.eventsList);
	}*/


	render() {
		//console.log("props Td = " + this.props.data['date']);
		//console.log("onEventClick in Td = " + this.props.onEventClick);
		//console.log("props Td = " + this.props.data['events']);
		let bt = [];
		if(this.props.data['events'] !== undefined){
			let length = this.props.data['events'].length;
			if(length !== 0){
				//return (
				for(let i=0; i<length; i++){
					const event = this.props.data['events'][i];
					bt[i] = <Button bsStyle="primary" bsSize="xsmall"  value={event.get('id')}
							onClick={(event) => this.props.onEventClick(event)} >
								{this.props.data['events'][i].get('type')}
							</Button>;
				}
				//const tr = this.props.weeks.map(week => {
				//bt.map(event)
			}
		}
		let index = 0;
		const bts = bt.map(bt => { 
			return(
				<div key={index++}>
					{bt}
				</div>
			)
		}); 
					
		
		/*const tr = this.props.weeks.map(week => {
			return (
				<Tr week = {week}  />
			)
		});*/

			
		return (
			
			<td width="12%" height="100px">
				<div>
					{this.props.data['date']}
				</div>
				{bts}
			</td>
		)
	}
}

class Tr extends Component {
	render() {
		//console.log("props Tr week = " + this.props.week);
		//console.log("props Tr week[0] = " + this.props.week[0]['date']);
		//console.log("onEventClick in Tr = " + this.props.onEventClick);
		/*if(this.props.week[0]['events']){
			console.log("props Tr week[0] = " + this.props.week[0].get('start'));
		}*/
		
		this.props.week.forEach(function(elem){
			console.log('elem ' + elem['date']);
			if(elem['events'] !== undefined){
				if(elem['events'].length !== 0){
					console.log('elem[events] = ' + elem['events'].length);
				}
			}
		});

		let d = new Date('2017-02-13T12:51:24Z');
		console.log("d = " + d.getDate());
		let indexTd = 0;
		const week = this.props.week.map(data => {
			//console.log("//////////////////////////////////////////////");
			return (
				<Td key={indexTd++} data={data} onEventClick={this.props.onEventClick}/>
				
			)
		});

		return (
			<tr>{week}</tr>
			
		)
		
	}
}
/*key={user.get('_id')} onClick={() => this.props.onUserClick(user)}*/
export default class CalendarMonth extends Component{
	/*shouldComponentUpdate(nextProps){
		if (nextProps.user === this.props.user){
			return false;
		}

		return true;
	}*/

	render(){
		console.log("year in CalendarMonth = " + this.props.year);
		console.log("month in CalendarMonth = " + this.props.month);
		console.log("date in CalendarMonth = " + this.props.date);
		console.log("weeks in CalendarMonth = " + this.props.weeks);
		console.log("onEventClick in CalendarMonth = " + this.props.onEventClick);
		//console.log("events in Calendar = " + this.props.events);
		let d = new Date(this.props.year, this.props.month, 1);
		let t = d.getDay() - 1;
		/*let trs = <tr>start</tr>;
		for(let i=0; i<10; i++){
			trs += <tr>i</tr>;
		}*/
		//const dates = [{'date':1, 'event':'event1'},{'date':2, 'event':'event2'},{'date':3, 'event':'event3'}];
		let indexTr = 0;
		const tr = this.props.weeks.map(week => {
			return (
				<Tr key={indexTr++} week = {week} onEventClick={this.props.onEventClick}	/>
				/*<button onClick={() => this.props.onMyClick(week)}>HI</button>*/
			)
		});

		const MonthTable = (
		  	<Table responsive striped bordered condensed hover>
		    	<thead>
		      		<tr>
				        <th>Monday</th>
				        <th>Tuesday</th>
				        <th>Wednesday</th>
				        <th>Thursday</th>
				        <th>Friday</th>
				        <th>Saturday</th>
				        <th>Sunday</th>
		      		</tr>
		    	</thead>
			    <tbody>
			       	{tr}
			    </tbody>
		  	</Table>
		);
		//const MonthTable = (<div>HI</div>);
		return (
			<div>
				{MonthTable}
			</div>

		)
	}
}

//export default Calendar;