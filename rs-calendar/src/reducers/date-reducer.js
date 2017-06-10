import Immutable from 'immutable';

//window.Immutable = Immutable;
const date = new Date();

const initialState = Immutable.fromJS({
	currentYear: date.getFullYear(),
	currentMonth: date.getMonth(),
	currentDate: date.getDate()
});

function eventsReducer(state = initialState, action){
	console.log("hello from dateReducer");
	switch (action.type) {
		/*case 'RECEIVE_EVENTS':
			return state
				.set('eventsList', Immutable.fromJS(action.payload))
				.set('eventsById', Immutable.fromJS(action.payload.reduce((map, event) => {
					map[event.id] = event;
					return map;
				}, {})));*/

		
		case 'DATE':
			console.log("state = " + state);
			console.log("hello from DATE");
			console.log("action.payload = " + action.payload);
			console.log("action.payload['currentYear'] = " + action.payload['currentYear']);
			if(!action.payload){
				console.log("UNDEFINED");
				return state;
			}
			//console.log("action.payload = " + action.payload);
			return state
				.set('currentYear', Immutable.fromJS(action.payload.get('currentYear')))
				.set('currentMonth', Immutable.fromJS(action.payload.get('currentMonth')))
				.set('currentDate', Immutable.fromJS(action.payload.get('currentDate')));

		case 'MONTH':
			console.log("state = " + state);
			console.log("hello from MONTH");
			console.log("action.payload = " + action.payload);
			//console.log("action.payload = " + action.payload);
			return state.set('currentMonth', Immutable.fromJS(action.payload));
			//return state.set('currentMonth', Immutable.fromJS(state.get('currentMonth') + action.payload));

		case 'YEAR':
			console.log("state = " + state);
			console.log("hello from YEAR");
			console.log("action.payload = " + action.payload);
			//console.log("action.payload = " + action.payload);
			return state.set('currentYear', Immutable.fromJS(state.get('currentYear') + action.payload));

		default: return state;
	}
	return state;
}

export default eventsReducer;