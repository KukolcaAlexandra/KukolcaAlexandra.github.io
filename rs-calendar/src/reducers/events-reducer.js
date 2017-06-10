import Immutable from 'immutable';

//window.Immutable = Immutable;

const initialState = Immutable.fromJS({
	eventsList: [],
	eventsById: new Map()
});

function eventsReducer(state = initialState, action){
	//console.log("hello from eventsReducer action = " + action.type);
	switch (action.type) {
		case 'RECEIVE_DATA':
			console.log("I have got the RECEIVE_DATA");
			return state
				.set('eventsList', Immutable.fromJS(action.payload))
				.set('eventsById', Immutable.fromJS(action.payload.reduce((map, event) => {
					map[event.id] = event;
					return map;
				}, {})));

		
		/*case 'MONTH':
			console.log("state = " + state);
			console.log("hello from MONTH");
			console.log("action.payload = " + action.payload);
			//console.log("action.payload = " + action.payload);
			return state.set('currentMonth', Immutable.fromJS(action.payload));*/

		default: return state;
	}
	return state;
}

export default eventsReducer;