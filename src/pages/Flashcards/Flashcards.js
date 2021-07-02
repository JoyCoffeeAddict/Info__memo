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
				<div className={classes.FlashcardsLeft}>
					<Button clicked={() => setIsChoosingDeck(state => !state)}>STUDY</Button>

					<Link to="/flashcards-edit-decks">
						<Button> EDIT DECKS</Button>
					</Link>
				</div>
				<div className={classes.FlashcardsRight}>
					<EmptyFlashcard whiteText="gato" greyText="cat" />
				</div>
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
