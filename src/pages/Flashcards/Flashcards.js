import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import EmptyFlashcard from '../../components/UI/Flashcard/EmptyFlashcard/EmptyFlashcard';
import Modal from '../../components/UI/Modal/Modal';
import ModalList from '../../components/UI/Modal/ModalList/ModalList';

import classes from './Flashcards.module.scss';

const Flashcards = props => {
	const [isChoosingDeck, setIsChoosingDeck] = useState(false);
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
					<div> cat </div>
					<div> dog </div>
					<div>aligator</div>
				</ModalList>
			</Modal>
		</>
	);
};

export default Flashcards;
