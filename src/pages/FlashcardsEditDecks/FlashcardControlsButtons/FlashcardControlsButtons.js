import React from 'react';
import FlashcardControl from '../FlashcardControl/FlashcardControl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faPlus, faSave, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import classes from './FlashcardControlsButtons.module.scss';
const FlashcardControlsButtons = ({previousCard, nextCard, addCard, deleteCard, saveFlashcardsData}) => (
	<span className={classes.FlashcardControls}>
		<FlashcardControl clicked={previousCard}>
			<FontAwesomeIcon icon={faAngleLeft} />
		</FlashcardControl>
		<FlashcardControl clicked={nextCard}>
			<FontAwesomeIcon icon={faAngleRight} />
		</FlashcardControl>
		<FlashcardControl clicked={addCard}>
			<FontAwesomeIcon icon={faPlus} />
		</FlashcardControl>
		<FlashcardControl clicked={deleteCard}>
			<FontAwesomeIcon icon={faTrashAlt} />
		</FlashcardControl>
		<FlashcardControl clicked={saveFlashcardsData}>
			<FontAwesomeIcon icon={faSave} />
		</FlashcardControl>
	</span>
);

export default FlashcardControlsButtons;
