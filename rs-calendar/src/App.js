import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createSelector, createStructuredSelector } from 'reselect';

import CalendarMonth from './components/CalendarMonth';
import EventDetails from './components/EventDetails';
import Header from './components/Header';
import createWeeks from './functions/createWeeks';
import addEventsToWeeks from './functions/addEventsToWeeks';
//import numToMonth from './functions/numToMonth';

class UserDetails extends Component{
	shouldComponentUpdate(nextProps){
		if (nextProps.user === this.props.user){
			return false;
		}

		return true;
	}

	render(){
		return (
			<div>
				<div>Name: {this.props.user.get('name')}</div>
				<div>Balance: {this.props.user.get('balance')}</div>
				<div>Company: {this.props.user.get('company')}</div>
			</div>
		)
	}
}



class UsersList extends Component {
	render() {
		const users = this.props.users.map(user => {
			return (
				<li key={user.get('_id')} onClick={() => this.props.onUserClick(user)}>
					{user.get('name')}
				</li>
			)
		});

		return (
			<ul>{users}</ul>
		)
		/*const users = this.props.users.map(user => {
			return (
				<li key={user._id}>{users.name}</li>
			)
		})

		return (
			<ul>{users}</ul>
		)*/
	}
}

class App extends Component {
  render() {
  	const { users,
  			currentUser, 
  			currentYear, 
  			currentMonth, 
  			currentDate, 
  			weeks, 
  			currentEvent, 
  			setCurrentEvent,
  			setBackMonth,
  			setNextMonth
  		 } = this.props;

  	let UsersComponent;

  	/*if (users.size === 0){
  		UsersComponent = <div>Loading...</div>
  	} else{
  		UsersComponent = (
  			<UsersList users={users} onUserClick={(user) => this.props.setCurrentUser(user)}/>
  		)
  	}*/

    return (
      	<div className="app">
      		<Header year={currentYear}
      				month={currentMonth} 
      				date={currentDate} 
      				onBackClick={setBackMonth}
      				onNextClick={setNextMonth}
      		/>
      		{ UsersComponent }
      		{ currentUser ? <UserDetails user={currentUser} /> : null}
      		<CalendarMonth year={currentYear}
      					   month={currentMonth} 
      					   date={currentDate} 
      					   weeks={weeks} 
      					   onEventClick={setCurrentEvent}
      					   onMyClick={console.log}
      		/>
      		{ currentEvent ? <EventDetails event={currentEvent} /> : null}
      		
       	</div>
    );
  }
}

function userStateRootSelector() {
	return state.users;
}

const usersListSelector = createSelector(
	[userStateRootSelector],
	root => root.get('usersList')
);

const userNameSelector = createSelector(
	[usersListSelector],
	(users) => {
		return users.map(user => user.get('name'));
	}
)

const usersByIdSelector = createSelector(
	[userStateRootSelector],
	root => root.get('usersById')
)

function currentUserIdSelector(state) {
	return state.currentUserId;
}

const currentUserSelector = createSelector(
	[usersByIdSelector, currentUserIdSelector],
	(usersById, currentUserIdSelector) => {
		return usersById.get(currentUserIdSelector);
	}
)

/////////////////////////
function dateStateRootSelector() {
	return state.date;
}

const currentYearSelector = createSelector(
	[dateStateRootSelector],
	root => root.get('currentYear')
);

const currentMonthSelector = createSelector(
	[dateStateRootSelector],
	root => root.get('currentMonth')
);

const currentDateSelector = createSelector(
	[dateStateRootSelector],
	root => root.get('currentDate')
);
///////////////////////
function eventsStateRootSelector() {
	return state.events;
}

const eventsListSelector = createSelector(
	[eventsStateRootSelector],
	root => root.get('eventsList')
);

const eventsByIdSelector = createSelector(
	[eventsStateRootSelector],
	root => root.get('eventsById')
)

function currentEventIdSelector(state) {
	return state.currentEventId;
}

const currentEventSelector = createSelector(
	[eventsByIdSelector, currentEventIdSelector],
	(eventsById, currentEventIdSelector) => {
		return eventsById.get(currentEventIdSelector);
	}
)

/*const weeksSelector = createSelector(
	[currentYearSelector, currentMonthSelector, eventsByIdSelector],
	function(currentYear, currentMonth, eventsById){
		return addEventsToWeeks(createWeeks(currentYear, currentMonth), eventsById);
	}
)*/

const weeksSelector = createSelector(
	[currentYearSelector, currentMonthSelector, eventsListSelector],
	function(currentYear, currentMonth, events){
		return addEventsToWeeks(createWeeks(currentYear, currentMonth), events, currentYear, currentMonth);
	}
)

const mapStateToProps = createStructuredSelector({
	users: usersListSelector,
	currentUser: currentUserSelector,
	currentYear: currentYearSelector,
	currentMonth: currentMonthSelector,
	currentDate: currentDateSelector,
	weeks: weeksSelector,
	events: eventsListSelector,
	eventsById: eventsByIdSelector,
	currentEvent: currentEventSelector,
})

// function mapStateToProps(state) {
// 	return {
// 		users: state.users.get('usersList'),
// 		userName: state.users.get('usersList').map(user => user.get('name')),
// 		currentUser: state.users.get('usersById').get(state.currentUserId)
// 	}
// }

function mapActionsToProps(dispatch) {
	return {
		setCurrentUser(user) {
			console.log("in setCurrentUser user = " + user);
			dispatch({
				type: 'SET_CURRENT_USER_ID',
				payload: user.get('_id')
			})
		},

		setCurrentEvent(e) {
			//console.log("in setCurrentEvent event = " + e.target);
			console.log("in setCurrentEvent event = " + e.target.value);//.value.get('id'));
			dispatch({
				type: 'SET_CURRENT_EVENT_ID',
				payload: e.target.value
			})
		}, 

		setBackMonth(e) {
			console.log('e = ' + e);
			console.log('e.target.value = ' + e.target.value);
			let month = e.target.value - 1;
			if(month < 0){
				dispatch({
					type: 'MONTH',
					//type: 'SET_BACK_MONTH'//,
					payload: 11
				})
				dispatch({
					type: 'YEAR',
					//type: 'SET_BACK_MONTH'//,
					payload: -1
				})
			}else{
				dispatch({
					type: 'MONTH',
					//type: 'SET_BACK_MONTH'//,
					payload: month//e.target.value-1
					//payload: -1
				})
			}

			dispatch({
				type: 'SET_CURRENT_EVENT_ID',
				//type: 'SET_BACK_MONTH'//,
				//payload: e.target.value-1
				payload: -1
			})
			/*const initialState = Immutable.fromJS({
				currentYear: 2016,
				currentMonth: 10,
				currentDate: 1
			});
			dispatch({
				type: 'DATE',
				//type: 'SET_BACK_MONTH'//,
				payload: initialState
			})*/
		},

		setNextMonth(e) {
			console.log('e = ' + e);
			console.log('e.target.value = ' + e.target.value);
			let month = e.target.value;
			if(++month > 11){
				//console.log('> 11 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!month = ' + month);
				dispatch({
					type: 'MONTH',
					//type: 'SET_BACK_MONTH'//,
					payload: 0
				})
				dispatch({
					type: 'YEAR',
					//type: 'SET_BACK_MONTH'//,
					payload: 1
				})
			}else{
				//console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!month = ' + month);
				dispatch({
					type: 'MONTH',
					//type: 'SET_BACK_MONTH'//,
					//payload: e.target.value-1
					payload: month
				})
			}
			
		}

	}
}

export default connect(mapStateToProps, mapActionsToProps)(App);

