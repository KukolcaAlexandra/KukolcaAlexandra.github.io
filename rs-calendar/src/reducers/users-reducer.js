import Immutable from 'immutable';

window.Immutable = Immutable;

const initialState = Immutable.fromJS({
	usersList: [],
	usersById: new Map()
});

function usersReducer(state = initialState, action){
	switch (action.type) {
		case 'RECEIVE_DATA_TEMP':
			/*return {
				usersList: action.payload, //логика по изменению данных
				usersById: action.payload.reduce((map, user) => {
					map.set(user._id, user);
					return map;
				}, new Map())
			}*/

			return state
				.set('usersList', Immutable.fromJS(action.payload))
				.set('usersById', Immutable.fromJS(action.payload.reduce((map, user) => {
					map[user._id] = user;
					return map;
				}, {})));

			// return state.withMutations(mutable => {
			// 	mutable.set('usersList', Immutable.fromJS(action.payload));
			// 	mutable.set('usersById', Immutable.fromJS(action.payload.reduce((map, user) => {
			// 		map[user._id] = user;
			// 		return map;
			// 	}, {})));

			// 	return mutable;
			// })

		default: return state;
	}
	return state;
}

export default usersReducer;