function setMonthReducer(state = 0, action){
	console.log('!!!!!!!!!!!!!!!! hello from setMonthReducer = ' + state);
	switch (action.type) {
		case 'SET_MONTH':
			console.log('!!!!!!!!!!!!!!!!state in setMonthReducer = ' + state);
			return state;
		default: return state;
	}
}

export default setMonthReducer;