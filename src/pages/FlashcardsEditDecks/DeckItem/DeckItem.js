import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import classes from './DeckItem.module.scss';
import {faPlay, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
const DeckItem = ({deck, setActiveDeckName, deleteDeck}) => {
	let ChoseDeckItemClasses = `${classes.ChoseDeckItem}`;
	if (deck.isActive) {
		ChoseDeckItemClasses = `${classes.ChoseDeckItem} ${classes.ChoseDeckItemActive}`;
	} else {
		ChoseDeckItemClasses = `${classes.ChoseDeckItem}`;
	}
	const location = {pathname: '/flashcards-studying', search: deck.name};
	return (
		<div className={classes.DeckItem} key={deck.name}>
			<span className={classes.DeckName}>{deck.name}</span>

			<div className={classes.DeckStudy}>
				<Link to={location}> STUDY</Link>
			</div>
			<div className={ChoseDeckItemClasses} onClick={setActiveDeckName}>
				<FontAwesomeIcon icon={faPlay} className={classes.default} />
				<FontAwesomeIcon icon={faPlay} className={classes.active} />
			</div>
			<div className={classes.DeleteDeckItem} onClick={deleteDeck}>
				<FontAwesomeIcon icon={faTrashAlt} className={classes.default} />
				<FontAwesomeIcon icon={faTrashAlt} className={classes.active} />
			</div>
		</div>
	);
};

export default DeckItem;
