import React, { Component } from 'react';
//import { Table, Button } from 'react-bootstrap';
//import numToMonth from './functions/numToMonth';
//import addEventsToWeeks from './functions/addEventsToWeeks';
import numToMonth from '../functions/numToMonth';

class EventDetails extends Component{
	/*shouldComponentUpdate(nextProps){
		if (nextProps.user === this.props.user){
			return false;
		}
		return true;
	}*/
	

	render(){
		const d = new Date(this.props.event.get('start'));
		let month = numToMonth(d.getMonth());
		

		return (
			<div>
				<h3>{this.props.event.get('type')} : {this.props.event.get('title')}</h3>
				<div>Time: {d.getDate()} {month} {d.getFullYear()}</div>
				<div>Description: {this.props.event.get('description')}</div>
			</div>
		)
	}
}

export default EventDetails;