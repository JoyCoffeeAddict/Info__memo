import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

import Button from '../../components/UI/Button/Button';
import EmptyFlashcard from '../../components/UI/Flashcard/EmptyFlashcard/EmptyFlashcard';
import Modal from '../../components/UI/Modal/Modal';
import ModalList from '../../components/UI/Modal/ModalList/ModalList';

import classes from './Flashcards.module.scss';

const Flashcards = ({onRetrieveFlashcardsData, flashcardsDecks, isAuth}) => {
	const [isChoosingDeck, setIsChoosingDeck] = useState(false);
	const [decksArray, setDecksArray] = useState([]);
	useEffect(() => {
		if (isAuth) {
			onRetrieveFlashcardsData();
		}
	}, [onRetrieveFlashcardsData, isAuth]);

	useEffect(() => {
		const tempDecksArray = [];

		for (let key in flashcardsDecks) {
			tempDecksArray.push(key);
		}
		setDecksArray(tempDecksArray);
	}, [flashcardsDecks]);

	let decks = [];
	if (decksArray.length !== 0) {
		decks = decksArray.map(deck => {
			const location = {pathname: '/flashcards-studying', search: deck};
			return (
				<span key={deck} className={classes.DeckItem}>
					<Link to={location}>{deck}</Link>
				</span>
			);
		});
	} else {
		decks = <span className={classes.DeckItem}>You must create a deck first</span>;
	}

	return (
		<>
			<div className={`LayoutContent ${classes.Flashcards}`}>
				<span className={classes.StudyWrapper}>
					<Button clicked={() => setIsChoosingDeck(state => !state)}>STUDY</Button>
				</span>
				<span className={classes.EditDecksWrapper}>
					<Link to="/flashcards-edit-decks">
						<Button> EDIT DECKS</Button>
					</Link>
				</span>
				<span className={classes.FlashcardWrapper}>
					<EmptyFlashcard whiteText="gato" greyText="cat" />
				</span>
				{/* <div className={classes.FlashcardsLeft}>
				</div>
				<div className={classes.FlashcardsRight}>
				</div> */}
			</div>
			<Modal show={isChoosingDeck} modalClosed={() => setIsChoosingDeck(state => !state)}>
				<ModalList>
					{/* Some fake data */}
					{/* <div> cat </div>
					<div> dog </div>
					<div>aligator</div> */}
					{decks}
				</ModalList>
			</Modal>
		</>
	);
};
const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
		flashcardsDecks: state.flashcardsDecks,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onRetrieveFlashcardsData: () => dispatch(actions.retrieveFlashcardsData),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Flashcards);
