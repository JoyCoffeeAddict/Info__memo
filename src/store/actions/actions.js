import axios from 'axios';
import * as actionTypes from './actionTypes';

import {signinLink, signupLink, updateProfileLink, flashcardsDecksLink} from '../../shared/endpoints';

//AUTH
const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (token, localId, name) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		localId: localId,
		name: name,
	};
};

const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expiresOn');
	localStorage.removeItem('localId');
	localStorage.removeItem('name');

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const handleAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

//It's not even an action, but had to put this helper function somewhere
const authChangeUserProfile = (token, name) => {
	axios.post(updateProfileLink, {idToken: token, displayName: name});
};

export const retrieveFlashcardsData = () => async (dispatch, getState) => {
	console.log('retriveData');
	const state = getState();
	let decks = await axios
		.get(`${flashcardsDecksLink}/${state.auth.localId}.json?auth=${state.auth.token}`)
		.then(({data}) => {
			// console.log(data);

			return data;
		})
		.catch(err => console.log(err));

	dispatch({
		type: actionTypes.RETRIEVE_FLASHCARDS_DATA,
		decks: decks,
	});
};

export const auth = (email, password, isSignup, name = '') => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		let url = signinLink;
		if (!isSignup) {
			url = signupLink;
		}
		axios
			.post(url, authData)
			.then(response => {
				const {
					data: {expiresIn, idToken, localId},
				} = response;
				const expiresOn = new Date(new Date().getTime() + expiresIn * 1000);
				localStorage.setItem('token', idToken);
				localStorage.setItem('expiresOn', expiresOn);
				localStorage.setItem('localId', localId);
				localStorage.setItem('name', name);
				dispatch(authSuccess(idToken, localId));
				dispatch(retrieveFlashcardsData());
				dispatch(handleAuthTimeout(expiresIn));
				if (name && name.trim() !== '') {
					authChangeUserProfile(idToken, name);
				}
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const autoSignIn = dispatch => {
	console.log('autoshignin');
	const token = localStorage.getItem('token');
	if (!token) {
		dispatch(logout());
	} else {
		const expiresOn = new Date(localStorage.getItem('expiresOn'));
		if (expiresOn <= new Date()) {
			dispatch(logout());
		} else {
			const localId = localStorage.getItem('localId');
			//here will be sth about user Name
			//const name = localStorage.getItem('name');
			dispatch(authSuccess(token, localId));
			dispatch(retrieveFlashcardsData());
		}
	}
	dispatch({type: actionTypes.AUTO_SIGN_IN});
};

// Flashcards
export const addDeck = deckName => {
	return {
		type: actionTypes.ADD_DECK,
		newDeck: deckName,
	};
};

export const deleteDeck = deckName => {
	return {
		type: actionTypes.DELETE_DECK,
		deckToDelete: deckName,
	};
};

export const pushCards = (deckName, cardsArray) => {
	return {
		type: actionTypes.PUSH_CARDS,
		deckToModify: deckName,
		cardsArray: cardsArray,
	};
};

export const deleteCard = (deckName, cardNumber) => {
	return {
		type: actionTypes.DELETE_CARD,
		deckToModify: deckName,
		cardToDelete: cardNumber,
	};
};

export const saveFlashcardsDataToDB = async (dispatch, getState) => {
	const state = getState();

	axios
		.put(`${flashcardsDecksLink}/${state.auth.localId}.json?auth=${state.auth.token}`, {
			...state.flashcardsDecks,
		})

		.catch(error => console.log(error));

	dispatch({
		type: actionTypes.SAVE_DATA_TO_DB,
	});
};
