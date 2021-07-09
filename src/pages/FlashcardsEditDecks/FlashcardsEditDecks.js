import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';
import Flashcard from '../../components/UI/Flashcard/Flashcard';
import DeckItem from './DeckItem/DeckItem';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './FlashcardsEditDecks.module.scss';
import FlashcardControlsButtons from './FlashcardControlsButtons/FlashcardControlsButtons';

const FlashcardsEditDecks = ({
	flashcardsDecks,
	token,
	localId,
	onAddDeck,
	onDeleteDeck,
	onPushingCards,
	onDeleteCard,
	onSaveFlashcardsDataToDB,
	onRetriveFlashcardsData,
}) => {
	const [deckInputValue, setDeckInputValue] = useState('');
	const [activeDeckName, setActiveDeckName] = useState('');
	const [isAddingCards, setIsAddingCards] = useState(false);
	const [cardInputFront, setCardInputFront] = useState('');
	const [cardInputBack, setCardInputBack] = useState('');
	const [cardsOnList, setCardsOnList] = useState([]);
	const [activeCardFront, setActiveCardFront] = useState('');
	const [activeCardBack, setActiveCardBack] = useState('');
	const [cardNumber, setCardNumber] = useState(0);
	//This array is used for UI representation of decks,
	//The logical content of decks is stored in the Redux store
	const [decksArray, setDecksArray] = useState([]);

	useEffect(() => {
		console.log('FlashcardEditDecks useEffect 1 ');
		if (!flashcardsDecks || Object.keys(flashcardsDecks).length === 0) return;
		let tempDecksArray = [];
		for (let key in flashcardsDecks) {
			tempDecksArray.push({name: key, isActive: false});
		}
		setActiveDeckName(tempDecksArray[0].name);
		setDecksArray(tempDecksArray);

		//TODO: save data somewhere else
		// return () => {
		// 	onSaveFlashcardsDataToDB();
		// };
	}, [flashcardsDecks]);

	//update State, and dependent UI when new Active Deck is chosen
	useEffect(() => {
		if (activeDeckName === '') return;

		setCardInputFront('');
		setCardInputBack('');
		let tempDecksArray = [...decksArray];
		tempDecksArray = tempDecksArray.map(deck => ({
			name: deck.name,
			isActive: false,
		}));
		let activeDeckIndex = tempDecksArray.findIndex(tempDeck => tempDeck.name === activeDeckName);
		tempDecksArray[activeDeckIndex] = {name: activeDeckName, isActive: true};
		setDecksArray(tempDecksArray);
		setCardsOnList([]);
		setCardNumber(0);

		if (!flashcardsDecks[activeDeckName][0]) return;

		setActiveCardFront(flashcardsDecks[activeDeckName][0].front);
		setActiveCardBack(flashcardsDecks[activeDeckName][0].back);
		// eslint-disable-next-line
	}, [activeDeckName]);

	useEffect(() => {
		if (activeDeckName === '' || flashcardsDecks[activeDeckName].length === 0) return;
		setActiveCardFront(flashcardsDecks[activeDeckName][cardNumber].front);
		setActiveCardBack(flashcardsDecks[activeDeckName][cardNumber].back);
		// eslint-disable-next-line
	}, [cardNumber]);

	// HELPERS FOR ADDING AND DELETING A DECK

	const addDeckHelper = () => {
		let tempDecksArray = [...decksArray];
		onAddDeck(deckInputValue);
		tempDecksArray.push({name: deckInputValue, isActive: false});
		setDecksArray(tempDecksArray);
		setDeckInputValue('');
	};

	const AddNewDeckHandler = event => {
		if (deckInputValue.trim() === '' || flashcardsDecks[deckInputValue]) return;
		addDeckHelper();
	};

	const DeleteDeckHandler = deckName => {
		if (!flashcardsDecks[deckName]) return;
		let tempDecksArray = [...decksArray];
		let deckToDeleteIndex = tempDecksArray.findIndex(tempDeck => tempDeck.name === deckName);
		tempDecksArray.splice(deckToDeleteIndex, 1);
		setDecksArray(tempDecksArray);
		onDeleteDeck(deckName);
		if (deckName === activeDeckName) setActiveDeckName('');
	};

	//ADDING CARDS INSIDE THE MODAL

	const AddCardToCardsArrayHandler = () => {
		if (!cardInputFront || !cardInputBack) return;
		let card = {front: cardInputFront, back: cardInputBack};
		let tempActiveCards = [...cardsOnList];
		tempActiveCards.push(card);
		setCardsOnList(tempActiveCards);
		setCardInputFront('');
		setCardInputBack('');
	};

	const PushCardsArrayHandler = () => {
		if (cardsOnList.length === 0) return;
		onPushingCards(activeDeckName, cardsOnList);
		setCardsOnList([]);
		setIsAddingCards(false);
		setActiveCardFront(flashcardsDecks[activeDeckName][0].front);
		setActiveCardBack(flashcardsDecks[activeDeckName][0].back);
	};

	//CONTROL BUTTONS SPECIFIC FUNCTIONS

	const previousCardHandler = () => {
		if (activeDeckName !== '' && flashcardsDecks[activeDeckName].length !== 0) {
			let newCardNumber = cardNumber;
			newCardNumber === 0 ? (newCardNumber = flashcardsDecks[activeDeckName].length - 1) : (newCardNumber -= 1);

			setCardNumber(newCardNumber);
		}
	};
	const nextCardHandler = () => {
		if (activeDeckName !== '' && flashcardsDecks[activeDeckName].length !== 0) {
			let newCardNumber = (cardNumber + 1) % flashcardsDecks[activeDeckName].length;
			setCardNumber(newCardNumber);
		}
	};
	const addCardHandler = () => {
		if (activeDeckName !== '') setIsAddingCards(state => !state);
	};

	const deleteCardHandler = () => {
		if (activeDeckName === '' || flashcardsDecks[activeDeckName].length === 1) return;
		if (cardNumber === flashcardsDecks[activeDeckName].length - 1) {
			onDeleteCard(activeDeckName, cardNumber);
			setActiveCardFront(flashcardsDecks[activeDeckName][cardNumber - 1].front);
			setActiveCardBack(flashcardsDecks[activeDeckName][cardNumber - 1].back);
			setCardNumber(cardNumber - 1);
		} else {
			onDeleteCard(activeDeckName, cardNumber);
			setActiveCardFront(flashcardsDecks[activeDeckName][cardNumber].front);
			setActiveCardBack(flashcardsDecks[activeDeckName][cardNumber].back);
		}
	};
	let decks = decksArray.map(deck => (
		<DeckItem
			key={deck.name}
			deck={deck}
			setActiveDeckName={() => setActiveDeckName(deck.name)}
			deleteDeck={() => DeleteDeckHandler(deck.name)}
		/>
	));

	let cards = cardsOnList.map((card, index) => (
		<div className={classes.CardItem} key={`${card.front} ${card.back} ${index}`}>
			<span className={classes.CardItemText}>{card.front}</span>
			<span className={classes.CardItemText}>{card.back}</span>
		</div>
	));

	return (
		<>
			<div className={`LayoutContent ${classes.FlashcardsEditDecks}`}>
				<div className={classes.Decks}>
					<div className={classes.YourDecks}>Your Decks: </div>
					<div className={classes.DeckList}>
						{flashcardsDecks && flashcardsDecks.length !== 0 ? decks : null}
					</div>
					<label className={classes.AddDeckLabel}>
						<span className={classes.AddDeckText} onClick={event => AddNewDeckHandler(event)}>
							Add a deck
						</span>
						{/* This input is intentionally normal input insted Input component, because of styling, no invalid response and no checking */}
						<input
							className={classes.AddDeckInput}
							type="text"
							value={deckInputValue}
							onChange={e => setDeckInputValue(e.target.value)}
							onKeyPress={event => event.key === 'Enter' && AddNewDeckHandler()}
						/>
					</label>
				</div>

				<span className={classes.FlashcardWrapper}>
					<Flashcard front={activeCardFront} back={activeCardBack} />
				</span>
				<span className={classes.FlashcardControls}>
					<FlashcardControlsButtons
						previousCard={previousCardHandler}
						nextCard={nextCardHandler}
						addCard={addCardHandler}
						deleteCard={deleteCardHandler}
						saveFlashcardsData={() => onSaveFlashcardsDataToDB()}
					/>
				</span>
			</div>

			<Modal
				show={isAddingCards}
				modalClosed={() => {
					setIsAddingCards(state => !state);
					setCardsOnList([]);
				}}>
				<div className={classes.AddCardsModal}>
					<span className={classes.AddCardsTitle}>ADD CARDS</span>
					<div className={classes.AddCardsList}>
						<div className={classes.AddCardsInput}>
							<Input
								inputValue={cardInputFront}
								setValue={event => setCardInputFront(event.target.value)}
								labelDescription="Front"
								inputType="text"
								isInputCorrect={true}
								pressedEnter={event => event.key === 'Enter' && AddCardToCardsArrayHandler()}
							/>
							<Input
								inputValue={cardInputBack}
								setValue={event => setCardInputBack(event.target.value)}
								labelDescription="Back"
								inputType="text"
								isInputCorrect={true}
								pressedEnter={event => event.key === 'Enter' && AddCardToCardsArrayHandler()}
							/>
							<span className={classes.AddCardButton} onClick={AddCardToCardsArrayHandler}>
								<i className="fas fa-plus"></i>
							</span>
						</div>
						{cards}
					</div>
					<span
						className={classes.AddCardsArray}
						onClick={() => {
							PushCardsArrayHandler();
						}}>
						<Button>ADD CARDS</Button>
					</span>
				</div>
			</Modal>
		</>
	);
};

const mapStateToProps = state => {
	return {
		flashcardsDecks: state.flashcardsDecks,
		token: state.auth.token,
		localId: state.auth.localId,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAddDeck: deckName => dispatch(actions.addDeck(deckName)),
		onDeleteDeck: deckName => dispatch(actions.deleteDeck(deckName)),
		onPushingCards: (deckName, cardsArray) => dispatch(actions.pushCards(deckName, cardsArray)),
		onDeleteCard: (deckName, cardNumber) => dispatch(actions.deleteCard(deckName, cardNumber)),
		onSaveFlashcardsDataToDB: () => dispatch(actions.saveFlashcardsDataToDB),
		onRetriveFlashcardsData: () => dispatch(actions.retrieveFlashcardsData),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsEditDecks);
