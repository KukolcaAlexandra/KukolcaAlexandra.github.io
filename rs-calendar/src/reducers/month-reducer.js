import Immutable from 'immutable';

function monthReducer(state = 0, action){
	//console.log('!!!!!!!!!!!!!!!! hello from monthReducer = ' + state);
	switch (action.type) {
		case 'MONTH':
			console.log("state = " + state);
			console.log("hello from MONTH");
			console.log("action.payload = " + action.payload);
			//console.log("action.payload = " + action.payload);
			return state.set('currentMonth', Immutable.fromJS(action.payload));
			//return state;
		default: return state;
	}
}

export default monthReducer;