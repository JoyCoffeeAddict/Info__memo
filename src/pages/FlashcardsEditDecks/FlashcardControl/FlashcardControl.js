import React from 'react';
import classes from './FlashcardControl.module.scss';
const FlashcardControl = ({children, clicked}) => (
	<button className={classes.FlashcardControl} onClick={clicked}>
		{children}
	</button>
);

export default FlashcardControl;
