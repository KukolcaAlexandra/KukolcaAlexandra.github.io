function currentEventReducer(state = -1, action){
	switch (action.type) {
		case 'SET_CURRENT_EVENT_ID':
			return action.payload;
		default: return state;
	}
}

export default currentEventReducer;