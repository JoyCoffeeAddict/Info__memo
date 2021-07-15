import * as actionTypes from '../actions/actionTypes';
import * as questionColors from '../../shared/questionColors';
const initialState = {
	auth: {
		token: null,
		localId: null,
		name: '',
		loading: false,
		error: null,
	},

	flashcardsDecks: {
		animals: [
			{front: 'gato', back: 'cat'},
			{front: 'perro', back: 'dog'},
		],
		verbs: [
			{front: 'ser', back: 'to be'},
			{front: 'comer', back: 'eat'},
		],
	},
	questionsLists: {
		physics: [{questionText: 'What is the unit of energy', color: questionColors.WHITE}],
		astronomy: [
			{questionText: 'How far away from Earth is Moon', color: questionColors.WHITE},
			{questionText: 'How far away from Earth is Moon', color: questionColors.WHITE},
			{questionText: ' What is the closest star to the Sun ', color: questionColors.WHITE},
		],
	},
};

const authStart = (state, action) => {
	return {...state, auth: {...initialState.auth, error: null, loading: true}};
};

const authFail = (state, action) => {
	return {...state, auth: {...initialState.auth, error: action.error, loading: false}};
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

const addDeck = (state, action) => {
	const newFlashcardDecks = {...state.flashcardsDecks, [action.newDeck]: []};
	return {...state, flashcardsDecks: newFlashcardDecks};
};

const deleteDeck = (state, action) => {
	let newFlashcardDecks = {...state.flashcardsDecks};
	delete newFlashcardDecks[action.deckToDelete];
	return {...state, flashcardsDecks: newFlashcardDecks};
};

const pushCards = (state, action) => {
	let newFlashcardDecks = {...state.flashcardsDecks};
	let deckToChange = [...newFlashcardDecks[action.deckToModify]];
	deckToChange.push(...action.cardsArray);
	newFlashcardDecks[action.deckToModify] = deckToChange;

	return {
		...state,
		flashcardsDecks: newFlashcardDecks,
	};
};

const deleteCard = (state, action) => {
	let newFlashcardDecks = {...state.flashcardsDecks};
	let deckToChange = newFlashcardDecks[action.deckToModify];
	deckToChange.splice(action.cardToDelete, 1);

	return {
		...state,
		flashcardsDecks: newFlashcardDecks,
	};
};

const retrieveFlashcardsData = (state, action) => {
	if (action.decks) {
		return {...state, flashcardsDecks: action.decks};
	} else {
		return {...state, flashcardsDecks: initialState.flashcardsDecks};
	}
};
const retrieveQuestionsData = (state, action) => {
	if (action.lists) {
		return {...state, questionsLists: action.lists};
	} else {
		return {...state, questionsLists: initialState.questionsLists};
	}
};
const addList = (state, action) => {
	const newQuestionsLists = {
		...state.questionsLists,
		[action.listName]: [{questionText: '', color: questionColors.WHITE}],
	};
	return {...state, questionsLists: newQuestionsLists};
};

const deleteList = (state, action) => {
	let newQuestionsLists = {...state.questionsLists};
	delete newQuestionsLists[action.listName];
	return {...state, questionsLists: newQuestionsLists};
};

const addQuestion = (state, action) => {
	let newQuestionsLists = {...state.questionsLists};
	let listToChange = [...newQuestionsLists[action.listName]];
	listToChange.unshift(action.question);
	newQuestionsLists[action.listName] = listToChange;
	return {
		...state,
		questionsLists: newQuestionsLists,
	};
};

const changeColor = (state, action) => {
	let newQuestionsLists = {...state.questionsLists};
	let tempNewList = [...state.questionsLists[action.listName]];
	tempNewList[action.id].color = action.color;
	newQuestionsLists[action.listName] = tempNewList;
	return {...state, questionsLists: newQuestionsLists};
};

const deleteQuestion = (state, action) => {
	let newQuestionsLists = {...state.questionsLists};
	let tempNewList = [...state.questionsLists[action.listName]];

	tempNewList.splice(action.id, 1);
	newQuestionsLists[action.listName] = tempNewList;
	return {...state, questionsLists: newQuestionsLists};
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
		case actionTypes.SAVE_FLASHCARDS_DATA_TO_DB:
			return state;
		case actionTypes.RETRIEVE_FLASHCARDS_DATA:
			return retrieveFlashcardsData(state, action);
		case actionTypes.ADD_DECK:
			return addDeck(state, action);
		case actionTypes.DELETE_DECK:
			return deleteDeck(state, action);
		case actionTypes.PUSH_CARDS:
			return pushCards(state, action);
		case actionTypes.DELETE_CARD:
			return deleteCard(state, action);
		case actionTypes.ADD_LIST:
			return addList(state, action);
		case actionTypes.DELETE_LIST:
			return deleteList(state, action);
		case actionTypes.ADD_QUESTION:
			return addQuestion(state, action);
		case actionTypes.DELETE_QUESTION:
			return deleteQuestion(state, action);
		case actionTypes.CHANGE_COLOR:
			return changeColor(state, action);
		case actionTypes.SAVE_QUESTIONS_DATA_TO_DB:
			return state;
		case actionTypes.RETRIEVE_QUESTIONS_DATA:
			return retrieveQuestionsData(state, action);
		default:
			return state;
	}
};

export default Reducer;
