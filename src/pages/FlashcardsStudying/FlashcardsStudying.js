import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPen, faPlus} from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/UI/Button/Button';
import Flashcard from '../../components/UI/Flashcard/Flashcard';
import classes from './FlashcardsStudying.module.scss';
const FlashcardsStudying = ({location, flashcardsDecks}) => {
	const [points, setPoints] = useState(0);
	const [cardNumber, setCardNumber] = useState(0);
	const [deckName, setDeckName] = useState('');
	const [isItLastCard, setIsItLastCard] = useState(false);

	//prep states at component's mounting
	useEffect(() => {
		let tempDeckName = location.search;
		//remove ? question mark from location.search
		tempDeckName = tempDeckName.slice(1);
		setDeckName(tempDeckName);
	}, [location.search]);

	const nextCardHandler = point => {
		if (!isItLastCard && cardNumber === flashcardsDecks[deckName].length - 1) {
			setPoints(points => points + point);
			setIsItLastCard(true);
		} else if (!isItLastCard && cardNumber < flashcardsDecks[deckName].length - 1) {
			setCardNumber(cardNumber => cardNumber + 1);
			setPoints(points => points + point);
		} else {
		}
	};

	return (
		<div className={`LayoutContent ${classes.FlashcardsStudying}`}>
			<div className={`${classes.FlashcardsStudyingLeft}`}>
				<span className={classes.ControlButtonsLarge}>
					<span className={classes.Points}>
						{isItLastCard && <span>This session is over, </span>} POINTS: {points}
					</span>
					<Button
						clicked={() => {
							nextCardHandler(1);
						}}>
						i knew
					</Button>
					<Button clicked={() => nextCardHandler(0)}>repeat later</Button>
					<Link to="/flashcards-edit-decks">
						<Button>edit decks</Button>
					</Link>
				</span>
				<span className={`${classes.Points} ${classes.PointsSmall}`}>POINTS: {points}</span>
				<span className={classes.ControlButtons}>
					<Button
						additionalStyles={classes.SmButton}
						clicked={() => {
							nextCardHandler(1);
						}}>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
					<Button additionalStyles={classes.SmButton} clicked={() => nextCardHandler(0)}>
						<FontAwesomeIcon icon={faMinus} />
					</Button>
					<Link to="/flashcards-edit-decks">
						<Button additionalStyles={classes.SmButton}>
							<FontAwesomeIcon icon={faPen} />
						</Button>
					</Link>
				</span>
			</div>
			<div className={classes.FlashcardsStudyingRight}>
				{deckName !== '' && flashcardsDecks[deckName].length !== 0 ? (
					<Flashcard
						front={flashcardsDecks[deckName][cardNumber].front}
						back={flashcardsDecks[deckName][cardNumber].back}
					/>
				) : (
					<Flashcard front={''} back={''} />
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		flashcardsDecks: state.flashcardsDecks,
	};
};

export default connect(mapStateToProps)(FlashcardsStudying);
