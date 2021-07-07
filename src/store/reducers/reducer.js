import * as actionTypes from '../actions/actionTypes';
const initialState = {
	auth: {
		token: null,
		localId: null,
		name: '',
		loading: false,
		error: null,
		redirectPath: '/',
	},
};

const authStart = (state, action) => {
	return {...state, auth: {error: null, loading: true}};
};

const authFail = (state, action) => {
	return {...state, auth: {error: action.error, loading: false}};
};

const authSuccess = (state, action) => {
	return {
		...state,
		auth: {
			error: null,
			loading: false,
			token: action.token,
			localId: action.localId,
			name: action.name,
		},
	};
};

const authLogout = (state, action) => {
	return {...state, auth: {error: null, loading: false, token: null, localId: null, name: ''}};
};

const authSetName = (state, action) => {
	return {...state, auth: {name: action.name}};
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.AUTH_SET_NAME:
			return authSetName(state, action);
		case actionTypes.AUTO_SIGN_IN:
			return state;
		default:
			return state;
	}
};

export default Reducer;
