import axios from 'axios';
import * as actionTypes from './actionTypes';

import {
	signinLink,
	signupLink,
	updateProfileLink,
	flashcardsDecksLink,
	questionsListsLink,
} from '../../shared/endpoints';

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

const retrieveFlashcardsDataThunk = () => async (dispatch, getState) => {
	const state = getState();
	let response;
	try {
		response = await axios.get(`${flashcardsDecksLink}/${state.auth.localId}.json?auth=${state.auth.token}`);
		dispatch({
			type: actionTypes.RETRIEVE_FLASHCARDS_DATA,
			decks: response.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const retrieveFlashcardsData = dispatch => {
	dispatch(retrieveFlashcardsDataThunk());
};

export const saveFlashcardsDataToDB = async (dispatch, getState) => {
	const state = getState();

	axios
		.put(`${flashcardsDecksLink}/${state.auth.localId}.json?auth=${state.auth.token}`, {
			...state.flashcardsDecks,
		})

		.catch(error => console.log(error));

	dispatch({
		type: actionTypes.SAVE_FLASHCARDS_DATA_TO_DB,
	});
};

export const addList = listName => {
	return {
		type: actionTypes.ADD_LIST,
		listName,
	};
};
export const deleteList = listName => {
	return {
		type: actionTypes.DELETE_LIST,
		listName,
	};
};
export const addQuestion = (question, listName) => {
	return {
		type: actionTypes.ADD_QUESTION,
		question,
		listName,
	};
};

export const changeColor = (listName, id, color) => {
	return {
		type: actionTypes.CHANGE_COLOR,
		listName,
		id,
		color,
	};
};

export const deleteQuestion = (listName, id) => {
	return {
		type: actionTypes.DELETE_QUESTION,
		listName,
		id,
	};
};

// INTENTIONALLY creating separate functions and break DRY function, for more control over retrieving and saving different data
const retrieveQuestionsDataThunk = () => async (dispatch, getState) => {
	const state = getState();
	let response;
	try {
		response = await axios.get(`${questionsListsLink}/${state.auth.localId}.json?auth=${state.auth.token}`);
		dispatch({
			type: actionTypes.RETRIEVE_QUESTIONS_DATA,
			lists: response.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const retrieveQuestionsData = dispatch => {
	dispatch(retrieveQuestionsDataThunk());
};

export const saveQuestionsDataToDB = async (dispatch, getState) => {
	const state = getState();

	axios
		.put(`${questionsListsLink}/${state.auth.localId}.json?auth=${state.auth.token}`, {
			...state.questionsLists,
		})

		.catch(error => console.log(error));

	dispatch({
		type: actionTypes.SAVE_QUESTIONS_DATA_TO_DB,
	});
};
